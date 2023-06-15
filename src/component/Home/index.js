import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

import "./index.scss";

export default function Home() {
  const navigate = useNavigate();

  const handleMint = () => {
    navigate("/whitelist");
  };

  return (
    <div className="main-pad">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
        viewport={{ once: true, amount: 0 }}
        className="container"
      >
        <h1 className="text-white text-center font-bold">
          Advocacy through Digital Collectibles
        </h1>
        <h4 className="text-white text-center">
          Join us on a journey of inclusivity and accessibility
        </h4>

        <div className="mt-5 justify-content-center d-flex align-items-center">
          <img
            className="hide"
            src="/panda.png"
            alt=""
            width="100%"
            height="auto"
          />
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ncl5p_L_sZM&t=2s?autoplay=1&mute=1"
            className="video-content"
            controls
            loop
          />
          <img
            className="hide"
            src="/tiger-1.png"
            alt=""
            width="100%"
            height="auto"
          />
        </div>

        <h5 className="font-color text-center font-bold mt-3">
          Inspired by 8 year old Sailor's love for art and her courageous spirit
        </h5>

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="buy-button"
            variant="success"
            onClick={() => {
              handleMint();
            }}
          >
            Join Waitlist
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
