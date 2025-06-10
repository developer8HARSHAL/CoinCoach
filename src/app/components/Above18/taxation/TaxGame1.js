"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Landmark, BadgePercent, Banknote, Check, X, ChevronRight, HelpCircle, Star, AlertTriangle } from 'lucide-react';

export default function TaxGame1() {
  const [gameState, setGameState] = useState("start"); // start, playing, completed
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [coins, setCoins] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const questions = [
    {
      question: "Which of the following is a direct tax in India?",
      options: ["GST", "Income Tax", "Customs Duty", "Excise Duty"],
      correctAnswer: 1,
      explanation: "Income Tax is a direct tax paid directly by individuals to the government based on their income. GST, Customs Duty, and Excise Duty are all indirect taxes.",
      hint: "Direct taxes are paid directly to the government by the person or organization on whom it is imposed.",
      category: "direct-indirect"
    },
    {
      question: "Which tax is considered regressive in nature?",
      options: ["Corporate Tax", "Capital Gains Tax", "GST (Goods and Services Tax)", "Income Tax"],
      correctAnswer: 2,
      explanation: "GST is considered regressive because everyone pays the same rate regardless of income level. This means it takes a higher percentage of income from low-income earners compared to high-income earners.",
      hint: "Regressive taxes affect lower-income groups more than higher-income groups proportionally.",
      category: "direct-indirect"
    },
    {
      question: "Tax rebate under Section 87A is available to taxpayers with income up to:",
      options: ["₹5,00,000", "₹7,00,000", "₹10,00,000", "₹3,00,000"],
      correctAnswer: 1,
      explanation: "Section 87A provides a tax rebate that effectively makes income up to ₹7,00,000 tax-free (when combined with standard deduction and basic exemption).",
      hint: "It's the 'tax magic' that helps middle-income earners pay zero tax.",
      category: "income-tax"
    },
    {
      question: "What is the tax rate for income between ₹6,00,001 and ₹9,00,000 under the new tax regime?",
      options: ["5%", "10%", "15%", "20%"],
      correctAnswer: 1,
      explanation: "Under the new tax regime, income between ₹6,00,001 and ₹9,00,000 is taxed at 10%.",
      hint: "Think of tax slabs as tiers in a game - this is the middle-lower tier.",
      category: "income-tax"
    },
    {
      question: "Which age group qualifies as 'Super Senior Citizens' for tax purposes?",
      options: ["Above 60 years", "Above 65 years", "Above 75 years", "Above 80 years"],
      correctAnswer: 3,
      explanation: "Super Senior Citizens are individuals who are 80 years of age or older. They get special tax treatment with higher exemption limits.",
      hint: "They're the tax 'heroes' with the most beneficial tax treatment.",
      category: "income-tax"
    },
    {
      question: "Which of these is collected by sellers and passed on to the government?",
      options: ["Income Tax", "Wealth Tax", "Corporate Tax", "GST"],
      correctAnswer: 3,
      explanation: "GST is collected by sellers when consumers purchase goods or services, and then passed on to the government. This makes it an indirect tax.",
      hint: "This tax is added to the price of goods and services you buy.",
      category: "direct-indirect"
    },
    {
      question: "What is the standard deduction available for salaried employees under the new tax regime?",
      options: ["₹40,000", "₹50,000", "₹75,000", "₹1,00,000"],
      correctAnswer: 1,
      explanation: "A standard deduction of ₹50,000 is available for individuals with salary or pension income under the new tax regime.",
      hint: "This is a flat deduction that every salaried person gets without having to show any proof of expenses.",
      category: "income-tax"
    },
    {
      question: "Which of these promotes equity in taxation?",
      options: ["Indirect Taxes", "GST", "Direct Taxes", "Customs Duty"],
      correctAnswer: 2,
      explanation: "Direct Taxes promote equity as they are based on the 'ability to pay' principle, where higher earners pay more tax, proportionate to their income.",
      hint: "These taxes are directly proportional to a person's wealth or income.",
      category: "direct-indirect"
    }
  ];

  const handleStartGame = () => {
    setGameState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setCoins(0);
  };

  const handleAnswer = (index) => {
    if (!isAnswerChecked) {
      setSelectedAnswer(index);
      setIsAnswerChecked(true);
      
      if (index === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
        setCoins(coins + 10);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowHint(false);
    setShowExplanation(false);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setGameState("completed");
    }
  };

  const useHint = () => {
    if (coins >= 5 && !showHint) {
      setCoins(coins - 5);
      setShowHint(true);
    }
  };

  const getScoreMessage = () => {
    if (score === questions.length) return "Perfect! You're a Tax Titan!";
    if (score >= questions.length * 0.75) return "Great job! You're almost a Tax Expert!";
    if (score >= questions.length * 0.5) return "Good effort! You're getting there!";
    return "Keep learning about taxes. You'll improve!";
  };
  
  const getCategoryIcon = (category) => {
    switch(category) {
      case "direct-indirect":
        return <Landmark className="w-6 h-6 text-yellow-600" />;
      case "income-tax":
        return <User className="w-6 h-6 text-indigo-600" />;
      default:
        return <BadgePercent className="w-6 h-6 text-green-600" />;
    }
  };

  const restart = () => {
    setGameState("start");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerChecked(false);
    setShowHint(false);
    setCoins(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-yellow-50 to-emerald-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {gameState === "start" && (
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-emerald-700 mb-6">Tax Titans: India's Taxation Adventure</h1>
            <p className="text-lg text-gray-700 mb-8">Test your knowledge about India's taxation system! Learn about direct taxes, indirect taxes, income tax slabs, and more in this interactive game.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-yellow-100 p-4 rounded-xl">
                <h3 className="font-semibold text-yellow-800 flex items-center gap-2 mb-2">
                  <Landmark className="w-5 h-5" /> Direct vs Indirect Taxes
                </h3>
                <p className="text-gray-700 text-sm">Learn the difference between taxes paid directly to the government and those collected through goods and services.</p>
              </div>
              
              <div className="bg-indigo-100 p-4 rounded-xl">
                <h3 className="font-semibold text-indigo-800 flex items-center gap-2 mb-2">
                  <User className="w-5 h-5" /> Income Tax Slabs
                </h3>
                <p className="text-gray-700 text-sm">Understand how different income levels are taxed and special provisions for different age groups.</p>
              </div>
              
              <div className="bg-green-100 p-4 rounded-xl">
                <h3 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
                  <BadgePercent className="w-5 h-5" /> Tax Rebates & Benefits
                </h3>
                <p className="text-gray-700 text-sm">Discover how Section 87A and other provisions can help reduce your tax burden.</p>
              </div>
              
              <div className="bg-pink-100 p-4 rounded-xl">
                <h3 className="font-semibold text-pink-800 flex items-center gap-2 mb-2">
                  <Banknote className="w-5 h-5" /> Tax Facts
                </h3>
                <p className="text-gray-700 text-sm">Learn important facts about standard deductions, HRA, and choosing between tax regimes.</p>
              </div>
            </div>
            
            <button 
              onClick={handleStartGame}
              className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-lg transition-all shadow-md hover:shadow-lg"
            >
              Start Game
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="bg-emerald-100 px-4 py-2 rounded-full text-emerald-800 font-semibold">
                Question {currentQuestion + 1}/{questions.length}
              </div>
              <div className="bg-yellow-100 px-4 py-2 rounded-full text-yellow-800 font-semibold flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" /> {coins} coins
              </div>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              {getCategoryIcon(questions[currentQuestion].category)}
              <h2 className="text-2xl font-bold text-gray-800">{questions[currentQuestion].question}</h2>
            </div>
            
            <div className="space-y-3 mb-6">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.div
                  key={index}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedAnswer === index
                      ? isAnswerChecked
                        ? index === questions[currentQuestion].correctAnswer
                          ? "bg-green-100 border-green-500"
                          : "bg-red-100 border-red-500"
                        : "bg-blue-100 border-blue-500"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                  onClick={() => handleAnswer(index)}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {isAnswerChecked && index === selectedAnswer && (
                      index === questions[currentQuestion].correctAnswer 
                        ? <Check className="w-5 h-5 text-green-600" />
                        : <X className="w-5 h-5 text-red-600" />
                    )}
                    {isAnswerChecked && index === questions[currentQuestion].correctAnswer && selectedAnswer !== index && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {isAnswerChecked && !showExplanation && (
              <button
                onClick={() => setShowExplanation(true)}
                className="mb-4 text-blue-600 underline flex items-center gap-1"
              >
                <HelpCircle className="w-4 h-4" /> Why is this the answer?
              </button>
            )}
            
            {showExplanation && (
              <motion.div 
                className="mb-4 bg-blue-50 border border-blue-200 p-4 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="text-gray-700">{questions[currentQuestion].explanation}</p>
              </motion.div>
            )}
            
            <div className="flex justify-between items-center">
              <button
                onClick={useHint}
                disabled={showHint || coins < 5}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg ${
                  showHint || coins < 5 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                }`}
              >
                <AlertTriangle className="w-4 h-4" /> Hint (5 coins)
              </button>
              
              {isAnswerChecked && (
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1 px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all"
                >
                  {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {showHint && (
              <motion.div 
                className="mt-4 bg-yellow-50 border border-yellow-200 p-4 rounded-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="text-gray-700">💡 <span className="italic">{questions[currentQuestion].hint}</span></p>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === "completed" && (
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-emerald-700 mb-2">Game Completed!</h1>
            <div className="mb-6">
              <p className="text-2xl font-bold">Your Score: {score}/{questions.length}</p>
              <p className="text-lg text-gray-600">{getScoreMessage()}</p>
            </div>
            
            <div className="mb-8">
              <h3 className="font-semibold text-lg mb-2">What you've learned:</h3>
              <ul className="text-left space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>The difference between direct taxes (like Income Tax) and indirect taxes (like GST)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Income tax slabs and rates under the new tax regime</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Special provisions like Section 87A that can reduce your tax burden</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span>Different tax categories based on age and entity type</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restart}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all"
              >
                Start Over
              </button>
              <button
                onClick={handleStartGame}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all"
              >
                Play Again
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}