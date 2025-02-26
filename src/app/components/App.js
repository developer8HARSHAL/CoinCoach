"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gamehome from "../components/Gamehome";
import Game from "../components/Game";
import Results from "../components/Results";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gamehome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
