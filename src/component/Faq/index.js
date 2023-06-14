import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "../AccordionIcon/ExpandMoreIcon";
import { HashLink } from "react-router-hash-link";
import { motion } from "framer-motion";

import "./index.scss";
import { FaqData } from "../constant";

const Faq = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ type: "tween", stiffness: 30, duration: 0.5, delay: 0.5 }}
      viewport={{ once: true, amount: 0 }}
      className="faq-content"
      id="faq"
    >
      <div className="container">
        <h2>FAQ</h2>
        <div className="faq-main-content">
          {FaqData.items.map((item, index) => (
            index === 6 ? <div>
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div>You can show off your Digibuddi to your friends, share it on social media, and use it as your avatar for the upcoming Digibuddies video game.
                      Check out our <HashLink to="/#roadmap">roadmap</HashLink> for more details.</div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div> :
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Faq;
