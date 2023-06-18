import NonFungibleToken from 0x631e88ae7f1d7c20
import MetadataViews from 0x631e88ae7f1d7c20
import DigiBuddies from 0x807c1898085b54aa

transaction(){
  prepare(signer: AuthAccount){
    let DigiBuddiesCap = signer.getCapability<&{NonFungibleToken.CollectionPublic, DigiBuddies.CollectionPublic}>(DigiBuddies.CollectionPublicPath)

    if !DigiBuddiesCap.check(){
        signer.save(<- DigiBuddies.createEmptyCollection(), to: DigiBuddies.CollectionStoragePath)
        signer.link<&DigiBuddies.Collection{DigiBuddies.CollectionPublic, NonFungibleToken.CollectionPublic, NonFungibleToken.Receiver, MetadataViews.ResolverCollection}>(DigiBuddies.CollectionPublicPath, target: DigiBuddies.CollectionStoragePath)
    } else{
        panic("Account already has a DigiBuddies Collection")
    }
  }
}