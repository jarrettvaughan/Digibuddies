import React, { useState, useEffect } from "react";
// import * as fcl from "@onflow/fcl";
// import axios from "axios";

import { Button, Typography } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

import "./index.scss";
import Slider from "react-slick";
import "../../flow/config";
// import { ToastErrMsg, ToastSuccessMsg } from "../Toast";

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

  const handleMint = () => {

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
