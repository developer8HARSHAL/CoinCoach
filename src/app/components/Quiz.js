"use client"
import { useState } from 'react';
import coffee from "../images/coffee.jpg"
import Image from 'next/image';
import Link from 'next/link';

const QuizComponent = () => {
  const questions = [
    {
      type: "fillInTheBlanks",
      question: "A key part of financial planning is building an emergency fund, where you save ____ months' worth of living expenses.",
      options: ["3-6", "1-2", "12-15", "6-9"],
      correctAnswer: "3-6",
    },
    {
      type: "imageOptions",
      question: "You have a budget of $100 for essential items this month. Select items to add to your list without exceeding the budget.",
      budget: 100,
      options: [
        { name: "Groceries", price: 40, img:"/images/coffee.jpg" },
        { name: "Electricity Bill", price: 30, img: "/images/taxes.jpg" },
        { name: "Transportation", price: 20, img: "/images/coffee.jpg" },
        { name: "Entertainment", price: 25, img: "/images/coffee.jpg" },
      ],
      correctAnswer: ["Groceries", "Electricity Bill", "Transportation"], // Suggested correct items
    },
    {
      type: "termDefinition",
      question: "A financial instrument that derives its value from the value of an underlying asset.",
      options: ["Stock", "Bond", "Derivative", "Commodity"],
      correctAnswer: "Derivative",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [currentSpend, setCurrentSpend] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionClick = (selectedOption) => {
    if (currentQuestion.type === "fillInTheBlanks" || currentQuestion.type === "termDefinition") {
      if (selectedOption === currentQuestion.correctAnswer) {
        setScore(score + 1);
      }
      nextQuestion();
    } else if (currentQuestion.type === "imageOptions") {
      const itemPrice = selectedOption.price;
      if (currentSpend + itemPrice <= currentQuestion.budget) {
        setCurrentSpend(currentSpend + itemPrice);
        setSelectedItems([...selectedItems, selectedOption.name]);
      }
    }
  };

  const checkImageOptionsAnswer = () => {
    const isCorrect = currentQuestion.correctAnswer.every(item =>
      selectedItems.includes(item)
    ) && selectedItems.length === currentQuestion.correctAnswer.length;
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion.type === "imageOptions") {
      checkImageOptionsAnswer();
    }

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

          {currentQuestion.type === "fillInTheBlanks" || currentQuestion.type === "termDefinition" ? (
            <div className="options grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  {option}
                </button>
              ))}
             
            </div>
          ) : currentQuestion.type === "imageOptions" ? (
            <div>
              <p className="text-gray-500 mb-4">Current spend: ${currentSpend} / ${currentQuestion.budget}</p>
              <div className="grid grid-cols-2 gap-3">
                {currentQuestion.options.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(item)}
                    className="bg-white rounded shadow-lg p-2 transition hover:shadow-xl border"
                  >
                    <Image src={item.img} alt={item.name} width={50} height={50} className="w-full h-24 object-cover rounded mb-2" />
                    <p className="text-gray-700">{item.name}</p>
                    <p className="text-gray-500">${item.price}</p>
                  </button>
                ))}
              </div>
              <button
                onClick={nextQuestion}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Next Question
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">Quiz Complete!</h2>
          <p className="text-gray-700 text-lg mb-4">Your score: {score} / {questions.length}</p>
          <Link href="/">
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition inline-block">
              Go to Next Course
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
