import NonFungibleToken from 0x631e88ae7f1d7c20
import DigiBuddies from 0xbe50d04ad87007f1

transaction (id: UInt64){
  let userCap: &DigiBuddies.Collection

  prepare(user: AuthAccount) {
    self.userCap = user.borrow<&DigiBuddies.Collection>(from: DigiBuddies.CollectionStoragePath)!
    let nft <- self.userCap.withdraw(withdrawID: id) as! @DigiBuddies.NFT
    
    nft.revealThumbnail()
    self.userCap.deposit(token: <-nft)
  }
}
