"use client";

import React, { useState } from "react";
import { Button, Container, Typography, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const game = () => {
  const navigate = useNavigate();

  const [debt, setDebt] = useState(0);
  const [focus, setFocus] = useState(100);
  const [happiness, setHappiness] = useState(100);

  const makeChoice = (debtChange, focusChange, happinessChange) => {
    setDebt(debt + debtChange);
    setFocus(focus + focusChange);
    setHappiness(happiness + happinessChange);
  };

  return (
    <Container style={{ textAlign: "center", marginTop: "30px" }}>
      <Typography variant="h3" style={{padding:"30px"}}>Make Your Financial Choices!</Typography>
      <Card className="padding-[25px] border-[2px]">
      <CardContent style={{border:"2px"}}>
        <Typography variant="h4"> Current Status<br></br>
        <div style={{display:"flex", color:"green", textAlign:"center", width:"100%", fontSize:"23px", marginTop:"10px"}}>
          <div style={{width:"100%"}}>Debt: ${debt}</div>
          <div style={{width:"100%"}}>Focus: {focus}</div>
          <div style={{width:"100%"}}> Happiness: {happiness}</div>
        </div>
        </Typography>
      </CardContent>
      </Card>
      <Card style={{ marginTop: "30px" }} className="padding-[25px] border-[2px]">
        <CardContent style={{border:"2px"}}>
          <Typography variant="h4" >Choose your housing option:</Typography>
          <Button variant="contained" color="primary" onClick={() => makeChoice(10000, -10, 10)} style={{ margin: "10px", padding: "20px", fontSize:"17px"}}>
            Stay in a Dorm (Debt +10K, Focus -10, Happiness +10)
          </Button>
          <Button variant="contained" color="secondary" onClick={() => makeChoice(5000, -5, 5)} style={{ margin: "10px", padding: "20px",  fontSize:"17px"}}>
            Live at Home (Debt +5K, Focus -5, Happiness +5)
          </Button>
        </CardContent>
      </Card>

      <Card style={{ marginTop: "30px" }} className="padding-[25px] border-[2px]">
        <CardContent style={{border:"2px"}}>
          <Typography variant="h4">Choose your meal plan:</Typography>
          <Button variant="contained" color="primary" onClick={() => makeChoice(4000, 0, 5)} style={{ margin: "10px", padding: "20px",  fontSize:"17px"}}>
            Full Meal Plan (Debt +4K, Happiness +5)
          </Button>
          <Button variant="contained" color="secondary" onClick={() => makeChoice(2000, 0, 0)} style={{ margin: "10px", padding: "20px",  fontSize:"17px"}}>
            Basic Plan (Debt +2K)
          </Button>
        </CardContent>
      </Card>

      <Card style={{ marginTop: "30px" }} className="padding-[25px] border-[2px]">
        <CardContent style={{border:"2px"}}>
          <Typography variant="h4">Choose your part-time job:</Typography>
          <Button variant="contained" color="primary" onClick={() => makeChoice(-5000, -20, -5)} style={{ margin: "10px", padding: "20px",  fontSize:"17px"}}>
            Work 20 hrs/week (Debt -5K, Focus -20, Happiness -5)
          </Button>
          <Button variant="contained" color="secondary" onClick={() => makeChoice(-2000, -10, 0)} style={{ margin: "10px", padding: "20px",  fontSize:"17px"}}>
            Work 10 hrs/week (Debt -2K, Focus -10)
          </Button>
        </CardContent>
      </Card>

      <Button variant="contained" color="success" style={{ marginTop: "20px", marginBottom: "20px" }} onClick={() => navigate("/results", { state: { debt, focus, happiness } })}>
        See Results
      </Button>
    </Container>
  );
};

export default game;
