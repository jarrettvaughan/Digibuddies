import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
// import axios from "axios";

import { Button, Typography } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import "./index.scss";
import Slider from "react-slick";
import "../../flow/config";
// import { ToastErrMsg, ToastSuccessMsg } from "../Toast";
import mintCadence from "./mint.cdc"
import initCadence from "./init.cdc"

var settings = {
  className: "",
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 5000,
  adaptiveHeight: true,
  arrows: false,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        centerMode: false,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: false,
      },
    },
  ],
};

const Mint = () => {
  const [mintCount, setMintCount] = useState(0);
  const handlePrev = () => {
    if (mintCount <= 0) {
      return;
    }

    setMintCount(mintCount - 1);
  }

  const handleNext = () => {
    setMintCount(mintCount + 1);
  }

  const handleMint = async () => {
    console.log("mintCount---", mintCount);
    try {
      const res = await fcl.mutate({
        cadence: `import DigiBuddies from 0x08f72a6ac4045df8
        import NonFungibleToken from 0x631e88ae7f1d7c20
        import MetadataViews from 0x631e88ae7f1d7c20
        import FungibleToken from 0x9a0766d93b6608b7
        import FlowUtilityToken from 0x82ec283f88a62e65
        
        transaction(count: UInt64){
            let recipientCollection: &DigiBuddies.Collection{NonFungibleToken.CollectionPublic}
            let transferValut: @FungibleToken.Vault
            let flowBalance: UFix64

            prepare(signer: AuthAccount){
                
            if signer.borrow<&DigiBuddies.Collection>(from: DigiBuddies.CollectionStoragePath) == nil {
            signer.save(<- DigiBuddies.createEmptyCollection(), to: DigiBuddies.CollectionStoragePath)
            signer.link<&DigiBuddies.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(DigiBuddies.CollectionPublicPath, target: DigiBuddies.CollectionStoragePath)
            }
        
            self.recipientCollection = signer.getCapability(DigiBuddies.CollectionPublicPath)
                                        .borrow<&DigiBuddies.Collection{NonFungibleToken.CollectionPublic}>()!
            let vaultRef = signer.borrow<&FungibleToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")
            
            self.flowBalance = vaultRef.balance
            if self.flowBalance >= UFix64(count) * 50.0 {
              self.transferValut <- vaultRef.withdraw(amount: UFix64(count) * 50.0)
            }
            else {
              let futVaultRef = signer.borrow<&FungibleToken.Vault>(from: /storage/flowUtilityTokenVault)
              ?? panic("Could not borrow reference to the owner's Vault!")
              self.transferValut <- futVaultRef.withdraw(amount: UFix64(count) * 50.0)
            }            
            
            }
            execute{
              if self.flowBalance >= UFix64(count) * 50.0 {
                DigiBuddies.mintWithFlow(recipient: self.recipientCollection, count: count, vault: <- self.transferValut)
              } else {
                DigiBuddies.mintWithFut(recipient: self.recipientCollection, count: count, vault: <- self.transferValut)
              }
            }
        }`,
        args: (arg, t) => [arg(mintCount, t.UInt64)],
        limit: 9999,
      });
      fcl.tx(res).subscribe((res) => {
        if (res.status === 4 && res.errorMessage === "") {
            window.alert("NFT Minted!")
            window.location.reload(false);
        }
      });

      console.log("txid", res);
      console.log("error:---", res.errorMessage);
    } catch (error) {
      console.log("err", error);
    }
  }

  return (
    <div className="mint-content">
      <div className="container">
        <h2>How Many Digibuddies Would you Like to Purchase?</h2>
        <div className="row">
          <div className="col-lg-6">
            <Slider {...settings}>
              <div className="slider-item">
                <img className="slider-item-bg" src="Mint1.png" alt="sailor" />
              </div>
              <div className="slider-item">
                <img className="slider-item-bg" src="Mint2.png" alt="tiger" />
              </div>
              <div className="slider-item">
                <img className="slider-item-bg" src="Mint3.png" alt="sailor" />
              </div>
              <div className="slider-item">
                <img className="slider-item-bg" src="Mint4.png" alt="sailor" />
              </div>
              <div className="slider-item">
                <img className="slider-item-bg" src="Mint5.png" alt="sailor" />
              </div>
            </Slider>
          </div>
          <div className="col-lg-6">
            <div className="mint-desc-content">
              <h4>
                Price: $50.00 USD each
              </h4>
              <p>

              </p>
              <p>
                Remember, 20% of ever purchase will be donated to BC Children's Hospital
              </p>
              <p>
                PS..... after you make your purchase, you will be able to see the random Digibuddi that you have have purchase including its traits, superpowers and levels of rarity!
              </p>
              <h4>Join the Digibuddi hype!</h4>
              <div className="row mt-5">
                <div className="col-3">
                  <h4>Step1</h4>
                </div>
                <div className="col-9">
                  <div className="d-flex">
                    <Button onClick={handlePrev}><ArrowBackIosNewOutlinedIcon /></Button>
                    <Button color="success" variant="contained">{mintCount}</Button>
                    <Button onClick={handleNext}><ArrowForwardIosOutlinedIcon /></Button>
                  </div>
                  <div className="d-flex mt-3 justify-content-between align-items-center">
                    <Button variant="contained" color="success">${parseFloat(50 * mintCount).toFixed(2)}</Button>
                    <Typography variant="h4" className="my-auto">TotalCost</Typography>
                  </div>
                </div>
              </div>

              <div className="row mt-5">
                <div className="col-3">
                  <h4>Step2</h4>
                </div>
                <div className="col-9 d-flex justify-content-center">
                  <Button onClick={handleMint} variant="contained" color="success">Mint</Button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Mint;
