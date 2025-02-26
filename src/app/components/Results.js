"use client";

import {useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import confettiData from "../lotties/confetti.json";
import "./Results.css";

const Results = ({ score }) => {

  const location = useLocation();
  const { debt, focus, happiness } = location.state || {}; 

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  return (
    <div className="results-container">
      <div className="confetti-background">
        <Lottie 
          animationData={confettiData} 
          loop={true} 
          className="lottie-confetti" 
          style={{ position: "absolute", width: "100%", height: "100%" }}
        />
      </div>

      <motion.div
        className="content-container"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <Typography variant="h2" className="title">
          Game Over!
        </Typography>

        <Typography variant="h4" className="score-text">
          Your Score: <span className="score">Debt: {debt}, Focus: {focus}, Happiness: {happiness} </span>
        </Typography>

        <Typography variant="h5" className="message">
          {score > 50 ? "Amazing job! You're a finance guru!" : "Keep practicing! You'll get better!"}
        </Typography>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/game")}
            className="restart-btn"
          >
            Play Again
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;
