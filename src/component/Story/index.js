import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "./index.scss";

const Story = () => {
  var settings = {
    className: "",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrow: false,
    centerMode: false,
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
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 1.0 }}
      viewport={{ once: true, amount: 0 }}
      className="story-content container py-4"
      id="story"
    >
      <div className="row">
        <div className="col-lg-6">
          <Slider {...settings}>
            <div className="slider-item">
              <img
                className="slider-item-bg"
                src="/image1.jpg"
                alt="sailor"
              />
            </div>
            <div className="slider-item">
              <img
                className="slider-item-bg"
                src="/image2.jpg"
                alt="sailor"
              />
            </div>
            <div className="slider-item">
              <img
                className="slider-item-bg"
                src="/image3.jpg"
                alt="sailor"
              />
            </div>
          </Slider>
        </div>
        <div className="col-lg-6">
          <div className="desc-content">
            <h2>Art, Empowerment, and Community: Sailor’s Story</h2>
            <p className="font-color">
              Despite being born with multiple physical disabilities, 8-year-old
              Sailor has shown remarkable determination and strength. She has
              undergone 18 surgeries but always bounces back even stronger. She
              enjoys spending time outdoors and participating in activities such
              as parahockey, sit skiing, and hiking in the forest with her power
              chair. Creating art brings her joy and healing, which led to the
              idea of turning her artwork into digital trading cards. These
              cards have been used to create an online community that encourages
              kids to believe in themselves and their abilities. Through this
              initiative, children can see that with determination and a
              positive mindset, they can accomplish anything.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Story;
