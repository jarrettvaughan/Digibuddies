import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

import "./index.scss";

const Team = () => {
  var settings = {
    className: "",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 5000,
    adaptiveHeight: true,
    arrow: false,
    centerMode: true,
    appendDots: (dots) => <ul>{dots}</ul>,
    customPaging: (i) => (
      <div className="ft-slick__dots--custom">
        <div className="loading" />
      </div>
    ),
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 500 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="team-content"
      id="team"
    >
      <div className="container">
        <h2>The Limitless League</h2>
        <div className="team-main-content shown">
          <div className="d-flex flex-column team-col">
            <img
              className="img-team"
              src="/venture.png"
              alt="Venture"
            />
            <div className="h-50">
              <h4>Venture, Sailor & Wilder</h4>
              <p>Inspiration Infusers</p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://www.instagram.com/digibuddies.xyz/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/instagram.png"
                  alt="instagram"
                />
              </a>
            </div>
          </div>
          <div className="d-flex flex-column team-col">
            <img
              className="img-team"
              src="/Jarrett.png"
              alt="Jarrett"
            />
            <div className="h-50">
              <h4>Jarrett & Ashley</h4>
              <p>Co Founders</p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://www.instagram.com/ashvau/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/instagram.png"
                  alt="instagram"
                />
              </a>
              <a
                href="https://twitter.com/JarrettVaughan"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/twitter.png"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
          <div className="d-flex flex-column team-col">
            <img
              className="img-team"
              src="/Alana.png"
              alt="Alana"
            />
            <div className="h-50">
              <h4>Alana Simone</h4>
              <p>Inspiration Infusers</p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://www.instagram.com/alanasxmone/"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/instagram.png"
                  alt="instagram"
                />
              </a>
              <a
                href="https://twitter.com/alanasxmone"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/twitter.png"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
          <div className="d-flex flex-column team-col">
            <img
              className="img-team"
              src="/Carly.png"
              alt="Carly"
            />
            <div className="h-50">
              <h4>Carly Coughlin</h4>
              <p>Marketing Maven</p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/carly-coughlin/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="icon-linkedin" />
              </a>
              <a
                href="https://twitter.com/CarlyCoughlin"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/twitter.png"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
          <div className="d-flex flex-column team-col">
            <img
              className="img-team"
              src="/Layne.png"
              alt="Layne"
            />
            <div className="h-50">
              <h4>Layne Lafrance</h4>
              <p>Advisor, CoFounder Flow Blockchain</p>
            </div>
            <div className="d-flex gap-3">
              <a
                href="https://www.linkedin.com/in/laynelafrance/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin className="icon-linkedin" />
              </a>
              <a
                href="https://twitter.com/laynelafrance"
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className="social-icon"
                  src="/twitter.png"
                  alt="twitter"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="team-main-slider hiden">
          <Slider {...settings}>
            <div className="d-flex flex-column team-slider-col">
              <img
                className="img-team"
                src="/venture.png"
                alt="Venture"
              />
              <div className="h-50">
                <h4>Venture, Sailor & Wilder</h4>
                <p>Inspiration Infusers</p>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://www.instagram.com/digibuddies.xyz/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/instagram.png"
                    alt="instagram"
                  />
                </a>
              </div>
            </div>
            <div className="d-flex flex-column team-slider-col">
              <img
                className="img-team"
                src="/Jarrett.png"
                alt="Jarrett"
              />
              <div className="h-50">
                <h4>Jarrett & Ashley</h4>
                <p>Co Founders</p>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://www.instagram.com/ashvau/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/instagram.png"
                    alt="instagram"
                  />
                </a>
                <a
                  href="https://twitter.com/JarrettVaughan"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/twitter.png"
                    alt="twitter"
                  />
                </a>
              </div>
            </div>
            <div className="d-flex flex-column team-slider-col">
              <img
                className="img-team"
                src="/Alana.png"
                alt="Alana"
              />
              <div className="h-50">
                <h4>Alana Simone</h4>
                <p>Inspiration Infusers</p>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://www.instagram.com/alanasxmone/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/instagram.png"
                    alt="instagram"
                  />
                </a>
                <a
                  href="https://twitter.com/alanasxmone"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/twitter.png"
                    alt="twitter"
                  />
                </a>
              </div>
            </div>
            <div className="d-flex flex-column team-slider-col">
              <img
                className="img-team"
                src="/Carly.png"
                alt="Carly"
              />
              <div className="h-50">
                <h4>Carly Coughlin</h4>
                <p>Marketing Maven</p>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://www.linkedin.com/in/carly-coughlin/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="icon-linkedin" />
                </a>
                <a
                  href="https://twitter.com/CarlyCoughlin"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/twitter.png"
                    alt="twitter"
                  />
                </a>
              </div>
            </div>
            <div className="d-flex flex-column team-slider-col">
              <img
                className="img-team"
                src="/Layne.png"
                alt="Layne"
              />
              <div className="h-50">
                <h4>Layne Lafrance</h4>
                <p>Advisor, CoFounder Flow Blockchain</p>
              </div>
              <div className="d-flex gap-3">
                <a
                  href="https://www.linkedin.com/in/laynelafrance/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="icon-linkedin" />
                </a>
                <a
                  href="https://twitter.com/laynelafrance"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    className="social-icon"
                    src="/twitter.png"
                    alt="twitter"
                  />
                </a>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
