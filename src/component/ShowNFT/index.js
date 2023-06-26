import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from '@mui/material';
import "./index.scss";
import "../../flow/config";
// import { ToastErrMsg, ToastSuccessMsg } from "../Toast";


const ShowNFT = () => {
  const [nfts, setNfts] = useState([]);
  const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  const navigate = useNavigate();
  useEffect(() => {
    fcl.currentUser.subscribe(setUser);
  }, []);
  useEffect(() => {
    // if (!user.addr) {navigate("/whitelist"); return;}
    console.log("address---->", typeof user.addr)
    getNFTs(user.addr)
  }, [user.addr]);

  async function getNFTs(addr) {
    try {
      const result = await fcl.query({
        cadence: `
        import DigiBuddies from 0x08f72a6ac4045df8
        import MetadataViews from 0x631e88ae7f1d7c20
        
        pub fun main(address: Address): [DigiBuddies.DigiBuddiesMetadata] {
          let collection = getAccount(address).getCapability(DigiBuddies.CollectionPublicPath)
                            .borrow<&{MetadataViews.ResolverCollection}>()
                            ?? panic("Could not borrow a reference to the nft collection")
        
          let ids = collection.getIDs()
        
          let answer: [DigiBuddies.DigiBuddiesMetadata] = []
        
          for id in ids {
            
            let nft = collection.borrowViewResolver(id: id)
            let view = nft.resolveView(Type<DigiBuddies.DigiBuddiesMetadata>())!
        
            let display = view as! DigiBuddies.DigiBuddiesMetadata
            answer.append(display)
          }
            
          return answer
        }
                `,
        args: (arg, t) => [arg(addr, t.Address)],
      });
      setNfts(result);
    } catch (error) {
      console.log("err", error);
    }
  }
  console.log(nfts);
  return (
    <div className="mint-content">
      <div className="container">
        {user.addr ? 
        <>
        <h2>NFTs You Own</h2>
        <div className="nft-div">
          {nfts.map((nft, index) => {
            return (

              <div key={index} className="nft-card">
                <img src={nft.image} alt="nft" className="slider-item-bg" />
                <p>Name: {nft.name}</p>
                <p>Description: {nft.Description}</p>
              </div>
            );
          })}
        </div></> : <h2>Please join wait list!</h2> } 
      </div>
    </div>
  );
};

export default ShowNFT;
