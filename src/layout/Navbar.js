import React, { useState, useEffect } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import * as fcl from "@onflow/fcl";

export default function Header() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    loggedIn: false,
    addr: undefined,
  });

  const handleWhitelist = () => {
    setExpanded(false);
    navigate("/whitelist");
  };

  
  useEffect(() => {
    fcl.currentUser.subscribe((user) => {
      setUser(user);
    });
    // if (user.addr !== "") {
    // getFlow(user.addr);
    // }
  }, [user.addr]);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
  };

  const logIn = async () => {
      const res_auth = await fcl.authenticate();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="px-4"
      expanded={expanded}
    >
      <Navbar.Brand>
        <HashLink to="/">
          <img
            id="logo-desktop"
            alt=""
            src="/Logo.svg"
          />
        </HashLink>
      </Navbar.Brand>
      <Navbar.Toggle
        onClick={() => setExpanded(expanded ? false : "expanded")}
        aria-controls="responsive-navbar-nav"
      >
        <FaBars />
      </Navbar.Toggle>

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="w-100 justify-content-between">
          <div className="w-100 d-flex flex-wrap justify-content-center">
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/#story"
              onClick={() => setExpanded(false)}
            >
              Our Story
            </HashLink>
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/#about"
              onClick={() => setExpanded(false)}
            >
              Why Digibuddies
            </HashLink>
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/#roadmap"
              onClick={() => setExpanded(false)}
            >
              Roadmap
            </HashLink>
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/mint"
              onClick={() => {setExpanded(false);
                // navigate("/mint");
              }}
            >
              Mint
            </HashLink>
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/#faq"
              onClick={() => setExpanded(false)}
            >
              FAQ
            </HashLink>
            <HashLink
              className="font-color m-2 text-decoration-none"
              to="/#contact"
              onClick={() => setExpanded(false)}
            >
              Contact Us
            </HashLink>
          </div>

          <div className="d-flex align-items-center justify-content-center btn-content">
            <HashLink
              to="https://www.instagram.com/digibuddies.xyz/"
              target="_blank"
              onClick={() => setExpanded(false)}
            >
              <img
                className="me-3"
                src="/instagram.png"
                alt=""
              />
            </HashLink>
            <HashLink
              to="https://twitter.com/Digibuddiesxyz"
              target="_blank"
              onClick={() => setExpanded(false)}
            >
              <img
                className="me-4"
                src="/twitter.png"
                alt=""
              />
            </HashLink>
            {user.loggedIn ? (
                <div style={{"display": "flex"}}>
                  <Button
                    className="buy-button"
                    variant="success"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Disconnect
                  </Button>
                  <Button
                    className="buy-button"
                    variant="success"
                    style={{"margin-left": "5px"}}
                    onClick={() => {
                      navigate("/showNfts")
                    }}
                  >
                    ShowNFTs
                  </Button>
                </div>
              ) : (
                <Button
                  className="buy-button"
                  variant="success"
                  onClick={() => logIn()}
                >
                  Connect Wallet
                </Button>
              )}
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
