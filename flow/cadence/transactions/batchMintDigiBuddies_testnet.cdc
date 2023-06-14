import NonFungibleToken from 0x631e88ae7f1d7c20
import DigiBuddies from 0xbe50d04ad87007f1

transaction (data: [AnyStruct]){
    let adminCap: &DigiBuddies.Admin
    let recipient: &{NonFungibleToken.CollectionPublic}

  prepare(admin: AuthAccount) {
      self.adminCap = admin.borrow<&DigiBuddies.Admin>(from: DigiBuddies.AdminStoragePath)!
      self.recipient = getAccount(admin.address)
                                .getCapability<&{NonFungibleToken.CollectionPublic, DigiBuddies.CollectionPublic}>(DigiBuddies.CollectionPublicPath)
                                .borrow() ?? panic("Cannot borrow Tires NFT collection receiver from account")
  }
  
  execute {
    let nfts = data.length
    var index = 0

    while index < nfts {

      let name = data[index + 1]! as! String
      let description = data[index + 2]! as! String
      let image = data[index + 3]! as! String
      let traits = data[index + 4]! as! {String: String}

      self.adminCap.mintNFT(recipient: self.recipient, name: name, description: description, image: image, traits: traits)
      
      index = index + 5
    }
  }
}
