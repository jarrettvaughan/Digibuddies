import FungibleToken from 0x9a0766d93b6608b7
import DapperUtilityCoin from 0x82ec283f88a62e65
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import DigiBuddies from 0xbe50d04ad87007f1
import DigiBuddiesStorefront from 0xbe50d04ad87007f1

// This transaction purchases an NFT on a peer-to-peer marketplace (i.e. **not** directly from a dapp). This transaction
// will also initialize the buyer's NFT collection on their account if it has not already been initialized.
// FIRST ARGUMENT OF A P2P PURCHASE TRANSACTION SHOULD ALWAYS BE THE SELLER'S ADDRESS
transaction(merchantAccountAddress: Address, storefrontAddress: Address, listingResourceID: UInt64,  expectedPrice: UFix64) {
    let paymentVault: @FungibleToken.Vault
    let nftCollection: &NonFungibleToken.Collection{NonFungibleToken.Receiver}
    let storefront: &DigiBuddiesStorefront.Storefront{DigiBuddiesStorefront.StorefrontPublic}
    let listing: &DigiBuddiesStorefront.Listing{DigiBuddiesStorefront.ListingPublic}
    let salePrice: UFix64
    let balanceBeforeTransfer: UFix64
    let mainDapperUtilityCoinVault: &DapperUtilityCoin.Vault

    prepare(dapper: AuthAccount, buyer: AuthAccount) {
        // Initialize the buyer's collection if they do not already have one
        if buyer.borrow<&DigiBuddies.Collection>(from: DigiBuddies.CollectionStoragePath) == nil {
            let collection <- DigiBuddies.createEmptyCollection() as! @DigiBuddies.Collection
            buyer.save(<-collection, to: DigiBuddies.CollectionStoragePath)
            
            buyer.link<&DigiBuddies.Collection{NonFungibleToken.CollectionPublic, DigiBuddies.CollectionPublic}>(
                DigiBuddies.CollectionPublicPath,
                target: DigiBuddies.CollectionStoragePath
            )
             ?? panic("Could not link collection Pub Path");
        }

        // Get the storefront reference from the seller
        self.storefront = getAccount(storefrontAddress)
            .getCapability<&DigiBuddiesStorefront.Storefront{DigiBuddiesStorefront.StorefrontPublic}>(
                DigiBuddiesStorefront.StorefrontPublicPath
            )!
            .borrow()
            ?? panic("Could not borrow Storefront from provided address")

        // Get the listing by ID from the storefront
        self.listing = self.storefront.borrowListing(listingResourceID: listingResourceID)
            ?? panic("No Offer with that ID in Storefront")
        self.salePrice = self.listing.getDetails().salePrice

        // Get a DUC vault from Dapper's account
        self.mainDapperUtilityCoinVault = dapper.borrow<&DapperUtilityCoin.Vault>(from: /storage/dapperUtilityCoinVault)
            ?? panic("Cannot borrow DapperUtilityCoin vault from account storage")
        self.balanceBeforeTransfer = self.mainDapperUtilityCoinVault.balance
        self.paymentVault <- self.mainDapperUtilityCoinVault.withdraw(amount: expectedPrice)

        // Get the collection from the buyer so the NFT can be deposited into it
        self.nftCollection = buyer.borrow<&NonFungibleToken.Collection{NonFungibleToken.Receiver}>(
            from: DigiBuddies.CollectionStoragePath
        ) ?? panic("Cannot borrow NFT collection receiver from account")
    }

    // // Check that the price is right
    pre {
        self.salePrice == expectedPrice || self.salePrice - 20.0 == expectedPrice : "unexpected price"
    }

    execute {
        self.listing.purchase(
            payment: <-self.paymentVault, 
            collection: self.nftCollection
        )

        // Remove listing-related information from the storefront since the listing has been purchased.
        self.storefront.cleanup(listingResourceID: listingResourceID)
    }

    // Check that all dapperUtilityCoin was routed back to Dapper
    post {
        self.mainDapperUtilityCoinVault.balance == self.balanceBeforeTransfer: "DapperUtilityCoin leakage"
    }
}