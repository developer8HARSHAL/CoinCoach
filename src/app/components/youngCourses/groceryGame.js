"use client";
import { useState, useEffect } from "react";
import { Button, Card, Typography, Chip, Paper } from "@mui/material";
import { Search, Timer, Check, RotateCw } from "@mui/icons-material";

const SimpleStatementGame = () => {
  // Game data
  const transactions = [
    { id: 1, item: "Pizza", correctAmount: 500, shownAmount: 500 }, // Correct
    { id: 2, item: "Groceries", correctAmount: 2300, shownAmount: 2500 }, // Error (₹200 extra)
    { id: 3, item: "Movie", correctAmount: 300, shownAmount: 300 }, // Correct
    { id: 4, item: "Uber", correctAmount: 150, shownAmount: 350 }, // Error (₹200 extra)
  ];

  // Game state
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [foundErrors, setFoundErrors] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // Timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (!gameOver) {
      endGame();
    }
  }, [timeLeft, gameOver]);

  const markAsError = (id) => {
    if (!foundErrors.includes(id)) {
      setFoundErrors([...foundErrors, id]);
    }
  };

  const endGame = () => {
    setGameOver(true);
    // Calculate score (1 point per correct error found)
    const errorsFound = transactions.filter(
      txn => txn.correctAmount !== txn.shownAmount && foundErrors.includes(txn.id)
    ).length;
    setScore(errorsFound);
  };

  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setFoundErrors([]);
    setGameOver(false);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', p: 3 }}>
      <Typography variant="h5" gutterBottom>
        <Search sx={{ verticalAlign: 'middle', mr: 1 }} />
        Find the Billing Mistakes
      </Typography>

      <Chip 
        icon={<Timer />} 
        label={`Time: ${timeLeft}s`} 
        color="primary" 
        sx={{ mb: 2 }}
      />

      {!gameOver ? (
        <div>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Click on transactions with WRONG amounts:
          </Typography>

          {transactions.map((txn) => (
            <Paper 
              key={txn.id}
              elevation={2}
              sx={{ 
                p: 2,
                mb: 1,
                cursor: 'pointer',
                border: foundErrors.includes(txn.id) ? '2px solid red' : '2px solid transparent'
              }}
              onClick={() => markAsError(txn.id)}
            >
              <Typography>
                {txn.item}: <b>₹{txn.shownAmount}</b>
                {foundErrors.includes(txn.id) && " ❌"}
              </Typography>
            </Paper>
          ))}

          <Button 
            variant="contained" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={endGame}
          >
            Submit Answers
          </Button>
        </div>
      ) : (
        <div>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Your Score: {score}/2
          </Typography>

          <Typography sx={{ mb: 2 }}>
            {score === 2 ? "Perfect! 🎉" : score === 1 ? "Good try!" : "Let's practice more!"}
          </Typography>

          <div style={{ background: '#f5f5f5', p: 2, borderRadius: 1 }}>
            <Typography><b>Mistakes to find:</b></Typography>
            <ul>
              <li>Groceries: Should be ₹2,300 (not ₹2,500)</li>
              <li>Uber: Should be ₹150 (not ₹350)</li>
            </ul>
          </div>

          <Button 
            variant="outlined" 
            fullWidth 
            sx={{ mt: 2 }}
            onClick={resetGame}
          >
            Play Again
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SimpleStatementGame;