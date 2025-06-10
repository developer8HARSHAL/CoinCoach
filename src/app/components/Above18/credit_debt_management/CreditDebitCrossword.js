"use client";
import React, { useState, useEffect } from "react";

const CreditDebitCrossword = () => {
  const [grid, setGrid] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [solved, setSolved] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completedWords, setCompletedWords] = useState([]);
  const [theme, setTheme] = useState("light");
  const [showHint, setShowHint] = useState(false);
  const [currentClue, setCurrentClue] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);
  const [direction, setDirection] = useState("across");

  // Crossword puzzle data
  const puzzleData = {
    across: {
      "2": { clue: "Result of multiple credit applications", answer: "INQUIRY", row: 1, col: 0 },
      "4": { clue: "Most important factor in credit score", answer: "PAYMENTS", row: 3, col: 2 },
      "6": { clue: "Loans for beneficial investments", answer: "GOOD", row: 5, col: 8 },
      "9": { clue: "High-interest debt payoff method", answer: "AVALANCHE", row: 9, col: 6 }
    },
    down: {
      "1": { clue: "Different types of credit accounts", answer: "MIX", row: 0, col: 0 },
      "3": { clue: "Amount of credit being used", answer: "USAGE", row: 1, col: 3 },
      "5": { clue: "Smallest debt payoff method", answer: "SNOWBALL", row: 3, col: 9 },
      "7": { clue: "Represents creditworthiness", answer: "CREDIT", row: 2, col: 11 },
      "8": { clue: "Debt for non-essential expenses", answer: "BAD", row: 8, col: 6 },
      "10": { clue: "Yearly credit card charge", answer: "FEE", row: 7, col: 14 }
    }
  };

  const hints = {
    "1": "Consider both revolving and installment accounts",
    "2": "Hard _______ can lower your score temporarily",
    "3": "Keeping this below 30% is recommended",
    "4": "Payment ______ is critical to maintain good credit",
    "5": "Named after its growing effect as you pay off small debts first",
    "6": "Examples include student loans and mortgages",
    "7": "Your _____ score ranges from 300-850",
    "8": "Examples include high-interest consumer debt",
    "9": "Focuses on paying highest interest rates first",
    "10": "Annual _____ charged by card issuers"
  };

  // Initialize the grid
  useEffect(() => {
    // Find grid dimensions
    let maxRow = 0;
    let maxCol = 0;

    // Process across words
    Object.values(puzzleData.across).forEach(word => {
      const endCol = word.col + word.answer.length - 1;
      const endRow = word.row;
      maxRow = Math.max(maxRow, endRow);
      maxCol = Math.max(maxCol, endCol);
    });

    // Process down words
    Object.values(puzzleData.down).forEach(word => {
      const endRow = word.row + word.answer.length - 1;
      const endCol = word.col;
      maxRow = Math.max(maxRow, endRow);
      maxCol = Math.max(maxCol, endCol);
    });

    // Create empty grid
    const emptyGrid = Array(maxRow + 1).fill().map(() => 
      Array(maxCol + 1).fill().map(() => ({ 
        value: "", 
        isBlack: true, 
        number: null, 
        across: null, 
        down: null 
      }))
    );

    // Fill in the grid with word data
    const numberedGrid = fillGridWithWords(emptyGrid, puzzleData);
    setGrid(numberedGrid);

    // Initialize user input state
    const initialInput = {};
    for (let r = 0; r <= maxRow; r++) {
      for (let c = 0; c <= maxCol; c++) {
        if (!numberedGrid[r][c].isBlack) {
          initialInput[`${r}-${c}`] = "";
        }
      }
    }
    setUserInput(initialInput);
  }, []);

  // Fill grid with words and assign numbers
  const fillGridWithWords = (emptyGrid, puzzleData) => {
    // First pass: mark all cells that need numbers
    // Process across words
    Object.entries(puzzleData.across).forEach(([num, word]) => {
      const { row, col, answer } = word;
      
      // Mark all cells in the word as not black
      for (let i = 0; i < answer.length; i++) {
        emptyGrid[row][col + i].isBlack = false;
        emptyGrid[row][col + i].across = num;
      }
      
      // Assign the clue number to the first cell
      emptyGrid[row][col].number = num;
    });

    // Process down words
    Object.entries(puzzleData.down).forEach(([num, word]) => {
      const { row, col, answer } = word;
      
      // Mark all cells in the word as not black
      for (let i = 0; i < answer.length; i++) {
        emptyGrid[row + i][col].isBlack = false;
        emptyGrid[row + i][col].down = num;
      }
      
      // Assign the clue number to the first cell
      emptyGrid[row][col].number = num;
    });

    return emptyGrid;
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning && !solved) {
      interval = setInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, solved]);

  // Format time as mm:ss
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle input change
  const handleInputChange = (row, col, value) => {
    const cellKey = `${row}-${col}`;
    
    // Only accept letters
    if (!/^[a-zA-Z]?$/.test(value)) {
      return;
    }
    
    // Update user input
    const newUserInput = { ...userInput, [cellKey]: value.toUpperCase() };
    setUserInput(newUserInput);
    
    // Check if any words are completed
    checkCompletedWords(newUserInput);
    
    // Auto-advance to next cell
    if (value && direction === "across") {
      // Find next cell in across direction
      const nextCol = col + 1;
      if (nextCol < grid[0].length && !grid[row][nextCol].isBlack) {
        setSelectedCell({ row, col: nextCol });
      }
    } else if (value && direction === "down") {
      // Find next cell in down direction
      const nextRow = row + 1;
      if (nextRow < grid.length && !grid[nextRow][col].isBlack) {
        setSelectedCell({ row: nextRow, col });
      }
    }
  };

  // Check if words are completed
  const checkCompletedWords = (currentInput) => {
    const newCompletedWords = [];
    
    // Check across words
    Object.entries(puzzleData.across).forEach(([num, word]) => {
      const { row, col, answer } = word;
      let isComplete = true;
      
      for (let i = 0; i < answer.length; i++) {
        const cellKey = `${row}-${col + i}`;
        if (currentInput[cellKey] !== answer[i]) {
          isComplete = false;
          break;
        }
      }
      
      if (isComplete) {
        newCompletedWords.push(`across-${num}`);
      }
    });
    
    // Check down words
    Object.entries(puzzleData.down).forEach(([num, word]) => {
      const { row, col, answer } = word;
      let isComplete = true;
      
      for (let i = 0; i < answer.length; i++) {
        const cellKey = `${row + i}-${col}`;
        if (currentInput[cellKey] !== answer[i]) {
          isComplete = false;
          break;
        }
      }
      
      if (isComplete) {
        newCompletedWords.push(`down-${num}`);
      }
    });
    
    setCompletedWords(newCompletedWords);
    
    // Calculate progress
    const totalWords = Object.keys(puzzleData.across).length + Object.keys(puzzleData.down).length;
    const newProgress = Math.round((newCompletedWords.length / totalWords) * 100);
    setProgress(newProgress);
    
    // Check if puzzle is solved
    if (newProgress === 100) {
      setSolved(true);
      setIsRunning(false);
    }
  };

  // Handle cell click
  const handleCellClick = (row, col) => {
    if (grid[row][col].isBlack) return;
    
    // Toggle direction if clicking on same cell
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
      setDirection(direction === "across" ? "down" : "across");
    } else {
      setSelectedCell({ row, col });
    }
    
    // Set current clue
    const cell = grid[row][col];
    const dirClue = direction === "across" ? cell.across : cell.down;
    if (dirClue) {
      setCurrentClue({ number: dirClue, direction });
    } else {
      // If no clue in current direction, try the other direction
      const otherDir = direction === "across" ? "down" : "across";
      const otherClue = otherDir === "across" ? cell.across : cell.down;
      if (otherClue) {
        setDirection(otherDir);
        setCurrentClue({ number: otherClue, direction: otherDir });
      }
    }
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Toggle hint
  const toggleHint = () => {
    setShowHint(!showHint);
  };

  // Get current hint
  const getCurrentHint = () => {
    if (!currentClue) return "Select a clue to see a hint";
    return hints[currentClue.number] || "No hint available";
  };
  
  // Get cell class based on state
  const getCellClass = (row, col) => {
    const cell = grid[row][col];
    const isSelected = selectedCell && selectedCell.row === row && selectedCell.col === col;
    const isInActiveWord = selectedCell && (
      (direction === "across" && row === selectedCell.row && cell.across === grid[selectedCell.row][selectedCell.col].across && !cell.isBlack) ||
      (direction === "down" && col === selectedCell.col && cell.down === grid[selectedCell.row][selectedCell.col].down && !cell.isBlack)
    );

    if (cell.isBlack) return `bg-black border border-gray-700`;
    
    let classes = `border border-gray-500 cursor-pointer flex items-center justify-center relative`;
    
    // Color based on theme
    if (theme === "dark") {
      classes += " text-white";
      if (isSelected) classes += " bg-blue-700";
      else if (isInActiveWord) classes += " bg-blue-900";
      else classes += " bg-gray-700";
    } else {
      classes += " text-black";
      if (isSelected) classes += " bg-blue-200";
      else if (isInActiveWord) classes += " bg-blue-50";
      else classes += " bg-white";
    }
    
    return classes;
  };

  // Get letter cell style
  const getLetterCellStyle = () => {
    return { width: "36px", height: "36px" };
  };

  return (
    <div className={`p-6 min-h-screen flex flex-col items-center ${theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800"}`}>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Credit & Debt Management Crossword</h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <div className={`text-lg font-mono ${theme === "dark" ? "text-green-300" : "text-green-600"}`}>
              {formatTime(timer)}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Crossword Container */}
          <div className={`flex-1 ${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow-lg`}>
            <div className="flex justify-center">
              <div className="inline-block">
                {grid.map((row, rowIndex) => (
                  <div key={`row-${rowIndex}`} className="flex">
                    {row.map((cell, colIndex) => (
                      <div 
                        key={`cell-${rowIndex}-${colIndex}`} 
                        className={getCellClass(rowIndex, colIndex)}
                        style={getLetterCellStyle()}
                        onClick={() => !cell.isBlack && handleCellClick(rowIndex, colIndex)}
                      >
                        {!cell.isBlack && (
                          <>
                            {cell.number && (
                              <span className="absolute text-xs top-0 left-0.5">
                                {cell.number}
                              </span>
                            )}
                            {selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex ? (
                              <input
                                type="text"
                                value={userInput[`${rowIndex}-${colIndex}`] || ""}
                                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                className="w-full h-full text-center bg-transparent border-none focus:outline-none uppercase"
                                maxLength={1}
                                autoFocus
                              />
                            ) : (
                              <span className="text-lg font-bold">
                                {userInput[`${rowIndex}-${colIndex}`] || ""}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center">
                <button 
                  onClick={toggleHint} 
                  className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-indigo-600 hover:bg-indigo-500" : "bg-indigo-500 hover:bg-indigo-600"} text-white`}
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                {showHint && (
                  <div className={`ml-4 p-2 rounded-lg ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"}`}>
                    <p>{getCurrentHint()}</p>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => setIsRunning(!isRunning)} 
                className={`px-4 py-2 rounded-lg ${theme === "dark" ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-300 hover:bg-gray-400"}`}
              >
                {isRunning ? "Pause" : "Resume"}
              </button>
            </div>
          </div>
          
          {/* Clues and Progress Panel */}
          <div className={`w-full md:w-96 ${theme === "dark" ? "bg-gray-700" : "bg-white"} p-6 rounded-xl shadow-lg`}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Progress</h2>
              <div className="w-full bg-gray-300 rounded-full h-4 mb-2">
                <div 
                  className={`h-4 rounded-full ${theme === "dark" ? "bg-green-500" : "bg-green-600"}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-right">{progress}% complete</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Across</h3>
                <ul className="space-y-2">
                  {Object.entries(puzzleData.across).map(([key, clue]) => (
                    <li 
                      key={`across-${key}`} 
                      className={`p-2 rounded cursor-pointer ${
                        currentClue && currentClue.direction === "across" && currentClue.number === key 
                          ? (theme === "dark" ? "bg-blue-900" : "bg-blue-100") 
                          : ""
                      } ${
                        completedWords.includes(`across-${key}`) 
                          ? (theme === "dark" ? "bg-green-800" : "bg-green-100") 
                          : ""
                      }`}
                      onClick={() => {
                        setDirection("across");
                        setCurrentClue({ number: key, direction: "across" });
                        // Find first cell of this clue
                        setSelectedCell({ row: clue.row, col: clue.col });
                      }}
                    >
                      <span className="font-bold">{key}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Down</h3>
                <ul className="space-y-2">
                  {Object.entries(puzzleData.down).map(([key, clue]) => (
                    <li 
                      key={`down-${key}`} 
                      className={`p-2 rounded cursor-pointer ${
                        currentClue && currentClue.direction === "down" && currentClue.number === key 
                          ? (theme === "dark" ? "bg-blue-900" : "bg-blue-100") 
                          : ""
                      } ${
                        completedWords.includes(`down-${key}`) 
                          ? (theme === "dark" ? "bg-green-800" : "bg-green-100") 
                          : ""
                      }`}
                      onClick={() => {
                        setDirection("down");
                        setCurrentClue({ number: key, direction: "down" });
                        // Find first cell of this clue
                        setSelectedCell({ row: clue.row, col: clue.col });
                      }}
                    >
                      <span className="font-bold">{key}.</span> {clue.clue}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {solved && (
          <div className={`mt-6 p-4 rounded-lg text-center ${theme === "dark" ? "bg-green-700" : "bg-green-100 border border-green-500"}`}>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg">You solved the crossword in {formatTime(timer)}!</p>
            <div className="mt-4">
              <p className="font-medium">Financial literacy is key to smart money management!</p>
            </div>
          </div>
        )}
        
        <div className="mt-8 text-center text-sm opacity-75">
          <p>© 2025 Financial Literacy Puzzles - Learn while you play!</p>
        </div>
      </div>
    </div>
  );
};

export default CreditDebitCrossword;