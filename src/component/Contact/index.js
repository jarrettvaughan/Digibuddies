import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import "./index.scss";
import { Button } from "react-bootstrap";
import { ToastErrMsg, ToastSuccessMsg, ToastWarnMsg } from "../Toast";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleValidation = () => {
    let tempErrors = {};
    let isValid = true;

    if (name.length <= 0) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (email.length <= 0) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (message.length <= 0) {
      tempErrors["message"] = true;
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let isValidForm = handleValidation();
    if (!isValidForm) {
      ToastWarnMsg("You should fill out all forms.");
      setIsLoading(false);
      return;
    }

    const req_emailData = {
      name: name,
      email: email,
      message: message,
    };

    try {
      const res = await axios.post(SERVER_URL + "sendgrid", req_emailData);
      if (res.data.success) {
        ToastSuccessMsg("Message sent!");
        setIsLoading(false);
      } else {
        ToastErrMsg("Message not sent!");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="contact-content"
      id="contact"
    >
      <div className="container">
        <h2>We’d love to hear from you</h2>
        <p className="subtitle">
          Whether you’re curious about Digibuddies, or even press—we’re ready to
          answer any questions.
        </p>
        <div className="contact-main-content row">
          <div className="col-lg-6">
            <form
              className="d-flex flex-column gap-4 contact-submit"
              onSubmit={handleSubmit}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="inputName1">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    id="inputName1"
                    placeholder="Full Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="inputEmail"
                  placeholder="you@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputrequirement">Message</label>
                <textarea
                  className="form-control"
                  name="message"
                  id="inputrequirement"
                  rows="7"
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
              </div>
              {!isLoading ? (
                <Button
                  type="submit"
                  className="buy-button mt-4"
                  variant="success"
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="buy-button mt-4"
                  variant="success"
                >
                  <div className="spinner-border text-white" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Button>
              )}
            </form>
          </div>
          <div className="col-lg-6">
            <div className="follow-us">
              <div className="follow-content">
                <img
                  className="follow-img"
                  alt="follow"
                  src="/Ash Jarrett Venture Sailor & Wilder - Family Session 2022-91 1.png"
                />
                <div className="follow-main">
                  <h2>Follow Us</h2>
                  <div className="d-flex gap-4">
                    <a
                      href="https://www.instagram.com/digibuddies.xyz/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/instagram-white.png" alt="instagram" />
                    </a>
                    <a
                      href="https://twitter.com/Digibuddiesxyz"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="/twitter-white.png" alt="twitter" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
