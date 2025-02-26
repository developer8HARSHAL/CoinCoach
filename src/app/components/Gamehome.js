"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Typography } from "@mui/material";
import "./gamehome.css";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../lotties/game_background.json";

const Gamehome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <motion.div 
        className="animation-container"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Lottie animationData={animationData} loop={true} className="lottie-animation" />
      </motion.div>

      <motion.div 
        className="content-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" className="title">
          Time for Payback!
        </Typography>
        <Typography variant="h5" className="subtitle">
          Learn financial literacy while playing!
        </Typography>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate("/game")}
            className="start-btn"
          >
            Start Playing
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Gamehome;
