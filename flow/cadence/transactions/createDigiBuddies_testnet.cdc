import FungibleToken from 0x9a0766d93b6608b7
import NonFungibleToken from 0x631e88ae7f1d7c20
import DapperUtilityCoin from 0x82ec283f88a62e65
import DigiBuddiesStorefront from 0xbe50d04ad87007f1
import DigiBuddies from 0xbe50d04ad87007f1

// This transcation can be used to place and NFT for sale on a marketplace such that a specified percentage of the proceeds of the sale
// go to the dapp as a royalty.
transaction(saleItemID: [UInt64], saleItemPrice: UFix64, royaltyPercent: UFix64) {
    let sellerPaymentReceiver: Capability<&{FungibleToken.Receiver}>
    let nftProvider: Capability<&DigiBuddies.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>
    let storefront: &DigiBuddiesStorefront.Storefront

    // It's important that the dapp account authorize this transaction so the dapp has the ability
    // to validate and approve the royalty included in the sale.
    // "dapp" as authorizer is not needed if you hardcode royalty/royaltyRecipient in the transaction
    prepare(seller: AuthAccount) {

        // If the account doesn't already have a storefront, create one and add it to the account
        if seller.borrow<&DigiBuddiesStorefront.Storefront>(from: DigiBuddiesStorefront.StorefrontStoragePath) == nil {
            let newstorefront <- DigiBuddiesStorefront.createStorefront() as! @DigiBuddiesStorefront.Storefront
            seller.save(<-newstorefront, to: DigiBuddiesStorefront.StorefrontStoragePath)
            seller.link<&DigiBuddiesStorefront.Storefront{DigiBuddiesStorefront.StorefrontPublic}>(
                DigiBuddiesStorefront.StorefrontPublicPath,
                target: DigiBuddiesStorefront.StorefrontStoragePath
            )
        }

        // Get a reference to the receiver that will receive the fungible tokens if the sale executes.
        // Note that the sales receiver aka MerchantAddress should be an account owned by Dapper or an end-user Dapper Wallet account address.
        self.sellerPaymentReceiver = getAccount(0x1b962f52ea209d13).getCapability<&{FungibleToken.Receiver}>(/public/dapperUtilityCoinReceiver)
        assert(self.sellerPaymentReceiver.borrow() != nil, message: "Missing or mis-typed DapperUtilityCoin receiver")

        // If the user does not have their collection linked to their account, link it.
        let nftProviderPrivatePath = /private/DigiBuddiesCollectionProviderForDigiBuddiesStorefront
        let hasLinkedCollection = seller.getCapability<&DigiBuddies.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(
                nftProviderPrivatePath
            )!.check()
        if !hasLinkedCollection {
            seller.link<&DigiBuddies.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(
                nftProviderPrivatePath,
                target: DigiBuddies.CollectionStoragePath
            )
        }

        // Get a capability to access the user's NFT collection.
        self.nftProvider = seller.getCapability<&DigiBuddies.Collection{NonFungibleToken.Provider, NonFungibleToken.CollectionPublic}>(
                nftProviderPrivatePath
            )!
        assert(self.nftProvider.borrow() != nil, message: "Missing or mis-typed collection provider")

        // Get a reference to the user's NFT storefront
        self.storefront = seller.borrow<&DigiBuddiesStorefront.Storefront>(from: DigiBuddiesStorefront.StorefrontStoragePath)
            ?? panic("Missing or mis-typed DigiBuddiesStorefront Storefront")
    }

    execute {

        let length: UInt64 = UInt64(saleItemID.length)
        var index: UInt64 = 0
        while index < length {

            self.storefront.createListing(
                nftProviderCapability: self.nftProvider,
                nftType: Type<@DigiBuddies.NFT>(),
                nftID: saleItemID[index],
                receiver: self.sellerPaymentReceiver,
                salePaymentVaultType: Type<@DapperUtilityCoin.Vault>(),
                salePrice: saleItemPrice,
                discount: 0.0
            )
            index = index + 1
        }
    }
}

// flow transactions send --signer=testnet-account -n=testnet transactions/createDigiBuddies_testnet.cdc '[IDS]' '50.0' '0.0' --gas-limit 9999

// flow transactions send --signer=mainnet-account -n=mainnet transactions/createDigiBuddies_testnet.cdc '[IDS]' '50.0' '0.0' --gas-limit 9999