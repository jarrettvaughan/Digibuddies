import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import "./index.scss";
import { Button } from "react-bootstrap";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/whitelist");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="signup-content"
    >
      <div className="container">
        <div className="signup-main-content">
          <img
            className="signup-hide"
            src="/RudiDigibuddies 2.png"
            alt="Rabbit-2"
          />
          <div className="signup-desc-content">
            <h2>What are you waiting for?</h2>
            <p>
              Join us on this incredible journey and experience all the thrills
              and excitement that Digibuddies has to offer!
            </p>
            <Button
              className="buy-button"
              variant="success"
              onClick={handleSignUp}
            >
              Join Waitlist
            </Button>
          </div>
          <img
            className="signup-hide"
            src="/tiger-2.png"
            alt="tiger-2"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
