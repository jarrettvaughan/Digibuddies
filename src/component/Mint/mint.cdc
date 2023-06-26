import DigiBuddies from 0x08f72a6ac4045df8
import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7

transaction(count: UInt64){
    let recipientCollection: &DigiBuddies.Collection{NonFungibleToken.CollectionPublic}
    let transferVault: @FungibleToken.Vault

    prepare(signer: AuthAccount){
        
    if signer.borrow<&DigiBuddies.Collection>(from: DigiBuddies.CollectionStoragePath) == nil {
    signer.save(<- DigiBuddies.createEmptyCollection(), to: DigiBuddies.CollectionStoragePath)
    signer.link<&DigiBuddies.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(DigiBuddies.CollectionPublicPath, target: DigiBuddies.CollectionStoragePath)
    }

    self.recipientCollection = signer.getCapability(DigiBuddies.CollectionPublicPath)
                                .borrow<&DigiBuddies.Collection{NonFungibleToken.CollectionPublic}>()!
    let vaultRef = signer.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault)
    ?? panic("Could not borrow reference to the owner's Vault!")
    self.transferVault <- vaultRef.withdraw(amount: UFix64(count) * 50.0)
    
    }
    execute{
        DigiBuddies.batchMintNFT(recipient: self.recipientCollection, count: count, vault: <- self.transferVault)
    }
}