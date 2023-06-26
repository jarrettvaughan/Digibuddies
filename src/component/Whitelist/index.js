import React, { useState, useEffect } from "react";
import * as fcl from "@onflow/fcl";
import axios from "axios";

import "./index.scss";
import Slider from "react-slick";
import { Button } from "react-bootstrap";
import "../../flow/config";
import { ToastErrMsg, ToastSuccessMsg } from "../Toast";

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

const Whitelist = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [user, setUser] = useState({
    loggedIn: false,
    addr: undefined,
  });
  const [userEmail, setUserEmail] = useState("");
  const [registered, setRegistered] =useState(false);

  useEffect(() => {
    fcl.currentUser.subscribe((user) => {
      console.log("user: ", user);
      const signedEmail = user.services[0]?.scoped?.email;
      setUserEmail(signedEmail);
      setUser(user);
    });
    // if (user.addr !== "") {
    // getFlow(user.addr);
    // }
  }, [user.addr]);
  useEffect(() => {
    fcl.currentUser.subscribe((user) => {
      console.log("user: ", user);
      const signedEmail = user.services[0]?.scoped?.email;
      setUserEmail(signedEmail);
      setUser(user);
    });
  }, []);

  const checkWhiteList = async () =>{
    try {
      if (user.addr) {
        const req_userData = {
          address: user.addr,
        };
        try {
          const res_whitelist = await axios.post(
            SERVER_URL + "/api/checkUser",
            req_userData
          );
          if (res_whitelist.data.success) {
            ToastSuccessMsg("Success joining whitelist!");
            setRegistered(true);
          } else {
            ToastErrMsg(res_whitelist.data.msg);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }
  const logIn = async () => {
    try {
      const res_auth = await fcl.authenticate();
      if (res_auth.loggedIn) {
        // const userEmail = res_auth.services[0]?.scoped?.email;

        const req_userData = {
          email: userEmail,
          address: res_auth.addr,
        };
        try {
          const res_whitelist = await axios.post(
            SERVER_URL + "signupwhitelist",
            req_userData
          );
          if (res_whitelist.data.success) {
            ToastSuccessMsg("Success joining whitelist!");
          } else {
            ToastErrMsg(res_whitelist.data.msg);
          }
        } catch (err) {
          console.log(err);
        }
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // async function getFlow(address) {
  //   try {
  //     const res = await fcl.query({
  //       cadence: `
  //                 import FlowToken from 0x7e60df042a9c0868
  //                 import FungibleToken from 0x9a0766d93b6608b7

  //                 pub fun main(address: Address): UFix64{
  //                   let balanceVault =  getAccount(address).getCapability(/public/flowTokenBalance).borrow<&FlowToken.Vault{FungibleToken.Balance}>()!
  //                   return balanceVault.balance
  //                 }`,
  //       args: (arg, t) => [arg(address, t.Address)],
  //     });
  //     setFlow(res);
  //   } catch (error) {
  //     console.log("err:", error);
  //   }
  // }

  return (
    <div className="mint-content">
      <div className="container">
        <h2>Are you ready to be a part of the Digibuddi craze?</h2>
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
                Join our exclusive 'allow list' today and be the first to know
                when the Digibuddies go on sale in mid-June!
              </h4>
              <p>
                Trust us, you don't want to miss out on the chance to snag one
                of our limited 750 one-of-a-kind characters. To gain priority
                access to purchase your very own Digibuddi, all you need to do
                is create a Dapper Wallet through the provided link. It's quick,
                easy, and oh-so-rewarding!
              </p>
              <p>
                Once you've got your Digibuddi in hand, spread the word to all
                your friends and followers on social media. And the best part?
                With each purchase, 20% of the price goes towards supporting BC
                Children's Hospital and kids like Sailor. Now that's what we
                call a win-win! So, what are you waiting for?
              </p>
              <p>
                Let's have some fun and make a difference in the lives of
                children in need.
              </p>
              <h4>Join the Digibuddi hype!</h4>
              {registered ? (
                <div>
                  <Button
                    className="buy-button"
                    variant="success"

                  >
                    Whitelisted
                  </Button>
                </div>
              ) : (
                <Button
                  className="buy-button"
                  variant="success"
                  onClick={() => logIn()}
                >
                  Join Waitlist
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whitelist;
