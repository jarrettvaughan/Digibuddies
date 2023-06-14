import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "./index.scss";

const About = () => {
  var settings = {
    className: "",
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrows: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          centerMode: false,
        },
      },
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

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="about-content"
      id="about"
    >
      <div className="container">
        <div className="row flex-wrap-reverse">
          <div className="col-lg-6">
            <div className="about-desc-content">
              <h2>Overcoming Barriers, Celebrating Success</h2>
              <p>
                Digibuddies strives to raise awareness of the often- overlooked
                limitations that individuals face. Through our collectibles, we
                aim to empower and educate users, and we believe that every
                child has the potential for greatness, regardless of any
                disabilities or limitations they may have.
              </p>
              <p>
                We know that a person's disability does not define them and that
                with dedication and perseverance, anyone can conquer the world.
              </p>
              <p>
                We're committed to creating a welcoming community that
                celebrates each other's successes and fosters a positive digital
                experience.
              </p>
            </div>
          </div>
          <div className="col-lg-6">
            <Slider {...settings}>
              <div className="slider-item">
                <img
                  className="slider-item-bg"
                  src="/Home1.png"
                  alt="sailor"
                />
              </div>
              <div className="slider-item">
                <img
                  className="slider-item-bg"
                  src="/Home2.png"
                  alt="tiger"
                />
              </div>
              <div className="slider-item">
                <img
                  className="slider-item-bg"
                  src="/Home3.png"
                  alt="sailor"
                />
              </div>
              <div className="slider-item">
                <img
                  className="slider-item-bg"
                  src="/Home4.png"
                  alt="sailor"
                />
              </div>
              <div className="slider-item">
                <img
                  className="slider-item-bg"
                  src="/Home5.png"
                  alt="sailor"
                />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
