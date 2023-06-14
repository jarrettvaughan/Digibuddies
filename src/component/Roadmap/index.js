import React from "react";
import { motion } from "framer-motion";

import "./index.scss";

const Roadmap = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="roadmap-content"
      id="roadmap"
    >
      <div className="container">
        <h1>Roadmap</h1>
        <div className="roadmap-main-content">
          <img
            className="hide"
            src="/rabbit.png"
            alt="rabbit"
          />
          <div className="vertical-stepper">
            <div className="stepper-col">
              <div className="stepper-shape-content">
                <span className="circle-number">1</span>
                <div className="stepper-line"></div>
              </div>
              <div className="stepper-desc">
                <h2>June 2023</h2>
                <p>
                  We're launching the Digibuddies sale! You won't want to miss
                  out on this incredible opportunity to snag some of the coolest
                  digital companions around.
                </p>
              </div>
            </div>
            <div className="stepper-col">
              <div className="stepper-shape-content">
                <span className="circle-number">2</span>
                <div className="stepper-line"></div>
              </div>
              <div className="stepper-desc">
                <h2>Summer 2023</h2>
                <p>
                  We're taking things to the next level with composible features
                  that let you layer wearables from other digital collectible
                  projects onto your Digibuddies. How cool is that?!
                </p>
              </div>
            </div>
            <div className="stepper-col">
              <div className="stepper-shape-content">
                <span className="circle-number">3</span>
                <div className="stepper-line"></div>
              </div>
              <div className="stepper-desc">
                <h2>Fall 2023</h2>
                <p>
                  Is all about community engagement, as we consult with
                  Digibuddies fans on future art development and video game
                  features. We can't wait to hear your ideas and bring them to
                  life!
                </p>
              </div>
            </div>
            <div className="stepper-col">
              <div className="stepper-shape-content justify-content-start">
                <span className="circle-number">4</span>
              </div>
              <div className="stepper-desc">
                <h2>Winter 2024</h2>
                <p>
                  We're launching stage 1 of our amazing video game. Get ready
                  to take your Digibuddies on an adventure like no other,
                  complete with challenging levels, exciting power-ups, and
                  loads of fun.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Roadmap;
