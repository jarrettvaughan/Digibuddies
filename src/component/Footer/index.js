import React from "react";
import { HashLink } from "react-router-hash-link";

import "./index.scss";

const Footer = () => {
  return (
    <div className="footer-content">
      <div className="d-flex align-items-center justify-content-center footer-main">
        <p>© 2023 Digibuddies</p>
        <HashLink to="/privacy">Privacy Policy</HashLink>
        <HashLink to="/#faq">FAQ</HashLink>
        <HashLink to="/legal">Legal</HashLink>
      </div>
    </div>
  );
};

export default Footer;
