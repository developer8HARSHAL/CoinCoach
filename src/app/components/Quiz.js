"use client"
import { useState } from 'react';
import Image from 'next/image';
import coffee from "../images/coffee.jpg";

const QuizComponent = () => {
  const questions = [
    {
      type: "fillInTheBlanks",
      question: "____ is known as the father of computers.",
      options: ["Charles Babbage", "Albert Einstein", "Isaac Newton", "Alan Turing"],
      answer: "Charles Babbage",
    },
    {
      type: "imageSelection",
      question: "You have a budget of $100. Choose items to add to your list without exceeding the budget.",
      budget: 100,
      options: [
        { text: "Coffee Machine - $40", price: 40, image: "/images/coffee.jpg" },
        { text: "Headphones - $60", price: 60, image: "/images/coffee.jpg" },
        { text: "Book - $15", price: 15, image: "/images/coffee.jpg" },
        { text: "Fitness Tracker - $55", price: 55, image: "/images/coffee.jpg" },
      ],
      answer: 100, 
    },
    {
      type: "definition",
      question: "A financial instrument that derives its value from the value of an underlying asset.",
      options: ["Stock", "Bond", "Derivative", "Commodity"],
      answer: "Derivative",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Handle user selection
  const handleOptionClick = (selectedOption) => {
    if (currentQuestion.type === "fillInTheBlanks" || currentQuestion.type === "definition") {
      if (selectedOption === currentQuestion.answer) {
        setScore(score + 1);
      }
      nextQuestion();
    } else if (currentQuestion.type === "imageSelection") {
      if (currentSpend + selectedOption.price <= currentQuestion.budget) {
        setSelectedItems([...selectedItems, selectedOption.text]);
        setCurrentSpend(currentSpend + selectedOption.price);
      } else {
        alert("You cannot exceed the budget!");
      }
      if (currentSpend + selectedOption.price === currentQuestion.budget) {
        setScore(score + 1);
        nextQuestion();
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedItems([]);
      setCurrentSpend(0);
    } else {
      setIsQuizComplete(true);
    }
  };

  return (
    <div className="quiz-container flex items-center justify-center min-h-screen bg-gray-100">
      {!isQuizComplete ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Question {currentQuestionIndex + 1}
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            {currentQuestion.question}
          </p>
          {currentQuestion.type === "fillInTheBlanks" && (
            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-gray-200 rounded-md p-2 hover:bg-blue-100 transition duration-150"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
          {currentQuestion.type === "imageSelection" && (
            <div className="grid gap-4 grid-cols-1">
              <p className="text-gray-500 text-md mb-4">
                Current Spend: ${currentSpend} / ${currentQuestion.budget}
              </p>
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-gray-200 rounded-md p-2 flex items-center justify-center hover:bg-blue-100 transition duration-150"
                >
                  <Image
                    src={coffee}
                    alt={option.text}
                    width={50}
                    height={50}
                    className=" rounded-md"
                  />
                  <p className="text-gray-700 mt-2">{option.text}</p>
                </button>
              ))}
            </div>
          )}
          {currentQuestion.type === "definition" && (
            <div className="grid gap-4">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-gray-200 rounded-md p-2 hover:bg-blue-100 transition duration-150"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Quiz Complete!</h2>
          <p className="text-gray-700 text-lg">Your score: {score} / {questions.length}</p>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
