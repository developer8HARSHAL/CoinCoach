"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  HelpCircle, 
  DollarSign, 
  Shield, 
  Award, 
  TrendingUp,
  AlertCircle
} from "lucide-react";

// Simplified game data
const gameData = {
  playerStartCash: 100000,
  rounds: 6,
  scenarios: [
    {
      id: 1,
      title: "Business Purchase",
      description: "You need to buy equipment worth ₹50,000",
      options: [
        {
          text: "Pay with business income (GST applies)",
          impact: { cash: -59000, compliance: 5, knowledge: 2 },
          explanation: "You paid ₹50,000 + ₹9,000 GST. You can claim this tax credit later."
        },
        {
          text: "Take a loan and pay over time",
          impact: { cash: -5000, compliance: 0, knowledge: 1 },
          explanation: "You avoid immediate GST payment but will pay interest."
        },
        {
          text: "Skip the purchase for now",
          impact: { cash: 0, compliance: -2, knowledge: 0 },
          explanation: "You saved money but missed a business opportunity."
        }
      ]
    },
    {
      id: 2,
      title: "Tax Planning",
      description: "Choose your tax regime for the year",
      options: [
        {
          text: "New Tax Regime (simpler, fewer deductions)",
          impact: { cash: 3000, compliance: 5, knowledge: 3 },
          explanation: "With lower income, you benefit from the rebate under the new regime."
        },
        {
          text: "Old Tax Regime (more deductions)",
          impact: { cash: -5000, compliance: 3, knowledge: 4 },
          explanation: "More planning needed but you can claim Section 80C benefits."
        },
        {
          text: "Delay the decision",
          impact: { cash: -2000, compliance: -5, knowledge: 1 },
          explanation: "Indecision leads to penalties and fees."
        }
      ]
    },
    {
      id: 3,
      title: "Export Opportunity",
      description: "You can export products worth ₹1,00,000",
      options: [
        {
          text: "Export under GST zero-rated supply",
          impact: { cash: 20000, compliance: 5, knowledge: 5 },
          explanation: "Exports don't have GST. You earn profit without tax burden."
        },
        {
          text: "Sell in local market",
          impact: { cash: 5000, compliance: 1, knowledge: 1 },
          explanation: "Easier but less profitable and you miss learning about exports."
        },
        {
          text: "Partner with another exporter",
          impact: { cash: 10000, compliance: 3, knowledge: 3 },
          explanation: "You share profits and compliance responsibilities."
        }
      ]
    },
    {
      id: 4,
      title: "GST Filing",
      description: "Your monthly GST return is due soon",
      options: [
        {
          text: "File it yourself on time",
          impact: { cash: -1000, compliance: 7, knowledge: 6 },
          explanation: "You spent time but gained experience and stayed compliant."
        },
        {
          text: "Hire an expert to file",
          impact: { cash: -3000, compliance: 8, knowledge: 2 },
          explanation: "Professional filing ensures compliance but costs more."
        },
        {
          text: "File late this month",
          impact: { cash: -5000, compliance: -5, knowledge: 3 },
          explanation: "Late filing incurs penalties of ₹100 per day!"
        }
      ]
    },
    {
      id: 5,
      title: "Business Expenses",
      description: "You have business travel expenses of ₹30,000",
      options: [
        {
          text: "Keep all GST invoices for tax credit",
          impact: { cash: -27000, compliance: 5, knowledge: 3 },
          explanation: "Good record-keeping allows you to claim GST credit on expenses."
        },
        {
          text: "Use flat per diem without receipts",
          impact: { cash: -30000, compliance: 1, knowledge: 1 },
          explanation: "Simpler but you miss out on potential GST credits."
        },
        {
          text: "Cancel trip, do virtual meetings",
          impact: { cash: -5000, compliance: 0, knowledge: 2 },
          explanation: "Saves money but might impact business relationships."
        }
      ]
    },
    {
      id: 6,
      title: "Year-End Planning",
      description: "The financial year ends in 15 days",
      options: [
        {
          text: "Review all transactions and optimize taxes",
          impact: { cash: -3000, compliance: 10, knowledge: 8 },
          explanation: "Time investment pays off in proper tax optimization."
        },
        {
          text: "Make last-minute tax-saving investments",
          impact: { cash: -50000, compliance: 3, knowledge: 2 },
          explanation: "Rushed investments may save some tax but aren't strategic."
        },
        {
          text: "Deal with it after year-end",
          impact: { cash: 0, compliance: -8, knowledge: -2 },
          explanation: "Too late for tax planning once the financial year ends."
        }
      ]
    }
  ]
};

// Main Game Component
const TaxGame2 = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [playerStats, setPlayerStats] = useState({
    cash: gameData.playerStartCash,
    compliance: 50, // out of 100
    knowledge: 30, // out of 100
  });
  const [scenario, setScenario] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [showRules, setShowRules] = useState(false);

  // Start Game
  const startGame = () => {
    setGameStarted(true);
    setCurrentRound(1);
    setScenario(gameData.scenarios[0]);
    setPlayerStats({
      cash: gameData.playerStartCash,
      compliance: 50,
      knowledge: 30,
    });
    setHistory([]);
  };

  // Handle option selection
  const selectOption = (option) => {
    setSelectedOption(option);
    setShowResult(true);

    // Update player stats
    const newStats = {
      cash: Math.max(0, playerStats.cash + option.impact.cash),
      compliance: Math.min(100, Math.max(0, playerStats.compliance + option.impact.compliance)),
      knowledge: Math.min(100, Math.max(0, playerStats.knowledge + option.impact.knowledge)),
    };

    setPlayerStats(newStats);

    // Add to history
    setHistory([
      ...history, 
      {
        round: currentRound,
        scenario: scenario.title,
        decision: option.text,
        impact: option.impact
      }
    ]);
  };

  // Next round or end game
  const nextRound = () => {
    setShowResult(false);
    setSelectedOption(null);

    if (currentRound >= gameData.rounds) {
      endGame();
      return;
    }

    setCurrentRound(currentRound + 1);
    setScenario(gameData.scenarios[currentRound]);
  };

  // End game and calculate result
  const endGame = () => {
    setGameOver(true);
    
    // Calculate final score and outcome
    const finalScore = playerStats.cash / 1000 + playerStats.compliance * 5 + playerStats.knowledge * 8;
    
    let result;
    if (finalScore > 1200) {
      result = {
        title: "Tax Master!",
        description: "You've become a tax expert with a thriving business!",
        icon: "🏆"
      };
    } else if (finalScore > 800) {
      result = {
        title: "Tax Professional",
        description: "Your tax knowledge has helped your business succeed.",
        icon: "🥈"
      };
    } else if (finalScore > 500) {
      result = {
        title: "Tax Savvy",
        description: "You're getting the hang of tax management.",
        icon: "👍"
      };
    } else {
      result = {
        title: "Tax Novice",
        description: "There's room for improvement in your tax strategy.",
        icon: "📚"
      };
    }
    
    setGameResult(result);
  };

  // Restart game
  const restartGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setCurrentRound(0);
    setShowResult(false);
    setSelectedOption(null);
    setGameResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {!gameStarted && !gameOver ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-4 inline-block"
            >
              💰
            </motion.div>
            <h1 className="text-4xl font-bold mb-6 text-yellow-300">Tax Tycoon</h1>
            <p className="text-xl mb-8">
              Run your business while making smart tax decisions. 
              Balance your cash, compliance, and knowledge!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="bg-white/5 rounded-lg p-4 flex-1">
                <div className="text-3xl mb-2">💸</div>
                <h3 className="text-xl font-semibold mb-2">Manage Cash</h3>
                <p>Balance expenses while handling taxes</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 flex-1">
                <div className="text-3xl mb-2">📊</div>
                <h3 className="text-xl font-semibold mb-2">Stay Compliant</h3>
                <p>Follow tax rules and file on time</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 flex-1">
                <div className="text-3xl mb-2">🧠</div>
                <h3 className="text-xl font-semibold mb-2">Build Knowledge</h3>
                <p>Learn key tax concepts and strategies</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-full text-lg shadow-lg"
                onClick={startGame}
              >
                Start Game
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 border border-white/30 py-3 px-6 rounded-full text-lg shadow-lg"
                onClick={() => setShowRules(!showRules)}
              >
                {showRules ? "Hide Rules" : "Game Rules"}
              </motion.button>
            </div>
            
            {showRules && (
              <motion.div 
                className="mt-6 bg-black/20 p-4 rounded-lg text-left"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <h3 className="text-xl font-bold mb-2">How to Play:</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>You'll face 6 business scenarios with tax decisions</li>
                  <li>Each choice affects your Cash, Compliance, and Knowledge</li>
                  <li>Balance all three metrics to succeed</li>
                  <li>Learn why each decision has its impact</li>
                  <li>Receive your final Tax Tycoon rating</li>
                </ol>
              </motion.div>
            )}
          </motion.div>
        ) : gameOver ? (
          <motion.div 
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-7xl mb-6 inline-block"
              >
                {gameResult.icon}
              </motion.div>
              <h1 className="text-4xl font-bold mb-2 text-yellow-300">{gameResult.title}</h1>
              <p className="text-xl">{gameResult.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/5 rounded-lg p-4">
                <DollarSign className="mb-2 text-green-400" size={28} />
                <h3 className="text-lg font-semibold mb-1">Final Cash</h3>
                <p className="text-2xl font-bold">₹{playerStats.cash.toLocaleString()}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <Shield className="mb-2 text-blue-400" size={28} />
                <h3 className="text-lg font-semibold mb-1">Compliance</h3>
                <p className="text-2xl font-bold">{playerStats.compliance}/100</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <Award className="mb-2 text-purple-400" size={28} />
                <h3 className="text-lg font-semibold mb-1">Knowledge</h3>
                <p className="text-2xl font-bold">{playerStats.knowledge}/100</p>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <TrendingUp size={24} className="mr-2" /> Your Journey
              </h3>
              <div className="bg-black/20 rounded-lg p-4 max-h-60 overflow-y-auto">
                {history.map((event, index) => (
                  <div key={index} className="border-b border-white/10 py-2 last:border-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Round {event.round}: {event.scenario}</span>
                      <span className="text-sm bg-white/10 px-2 py-1 rounded">{event.impact.cash >= 0 ? `+₹${event.impact.cash}` : `-₹${Math.abs(event.impact.cash)}`}</span>
                    </div>
                    <p className="text-white/70 text-sm mt-1">{event.decision}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-full text-lg shadow-lg"
                onClick={restartGame}
              >
                Play Again
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div>
            {/* Game header with stats */}
            <div className="flex justify-between items-center mb-6">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2">
                <span className="font-bold">Round {currentRound}/{gameData.rounds}</span>
              </div>
              
              <div className="flex gap-3">
                <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                  <DollarSign size={16} className="text-green-400 mr-1" />
                  <span>₹{playerStats.cash.toLocaleString()}</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                  <Shield size={16} className="text-blue-400 mr-1" />
                  <span>{playerStats.compliance}</span>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                  <Award size={16} className="text-purple-400 mr-1" />
                  <span>{playerStats.knowledge}</span>
                </div>
              </div>
            </div>
            
            {/* Scenario card */}
            <motion.div 
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-3">{scenario?.title}</h2>
              <p className="text-lg mb-6">{scenario?.description}</p>
              
              {!showResult ? (
                <div className="grid grid-cols-1 gap-4">
                  {scenario?.options.map((option, index) => (
                    <motion.button
                      key={index}
                      className="text-left bg-white/5 hover:bg-white/15 border border-white/20 rounded-xl p-4 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectOption(option)}
                    >
                      <div className="flex items-start">
                        <div className="bg-white/10 rounded-full p-2 mr-3 mt-1">
                          <ArrowRight size={16} />
                        </div>
                        <div>
                          <p className="font-medium text-lg">{option.text}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-black/30 rounded-xl p-5 mb-6">
                    <h3 className="font-bold text-xl mb-2 flex items-center">
                      <AlertCircle size={20} className="mr-2 text-yellow-400" />
                      Your Decision
                    </h3>
                    <p className="mb-4">{selectedOption?.text}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      <div className={`rounded-lg p-3 ${selectedOption?.impact.cash >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                        <div className="flex items-center justify-between">
                          <span>Cash</span>
                          <span className="font-bold">{selectedOption?.impact.cash >= 0 ? `+₹${selectedOption?.impact.cash}` : `-₹${Math.abs(selectedOption?.impact.cash)}`}</span>
                        </div>
                      </div>
                      
                      <div className={`rounded-lg p-3 ${selectedOption?.impact.compliance >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                        <div className="flex items-center justify-between">
                          <span>Compliance</span>
                          <span className="font-bold">{selectedOption?.impact.compliance >= 0 ? `+${selectedOption?.impact.compliance}` : selectedOption?.impact.compliance}</span>
                        </div>
                      </div>
                      
                      <div className={`rounded-lg p-3 ${selectedOption?.impact.knowledge >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                        <div className="flex items-center justify-between">
                          <span>Knowledge</span>
                          <span className="font-bold">{selectedOption?.impact.knowledge >= 0 ? `+${selectedOption?.impact.knowledge}` : selectedOption?.impact.knowledge}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/20 pt-4">
                      <h4 className="font-semibold mb-2 flex items-center">
                        <HelpCircle size={16} className="mr-2" />
                        Tax Insight
                      </h4>
                      <p>{selectedOption?.explanation}</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-2 px-6 rounded-full text-lg shadow-lg"
                      onClick={nextRound}
                    >
                      {currentRound >= gameData.rounds ? "See Final Results" : "Next Scenario"}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxGame2;