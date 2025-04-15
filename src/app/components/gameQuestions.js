// src/app/components/gameQuestions.js
export const financialQuestions = {
  // Questions for users under 18
  under18: [
    {
      title: "Your friend invites you to a movie but you're saving for a new bike",
      options: [
        {
          text: "Skip the movie to save money",
          changes: { debt: 0, focus: 10, happiness: -5 }
        },
        {
          text: "Go to the movie and delay your bike savings",
          changes: { debt: 500, focus: -5, happiness: 15 }
        }
      ]
    },
    {
      title: "You received ₹2000 as a birthday gift",
      options: [
        {
          text: "Save it in your piggy bank",
          changes: { debt: -1000, focus: 15, happiness: 5 }
        },
        {
          text: "Spend it all on games or toys",
          changes: { debt: 0, focus: -5, happiness: 20 }
        }
      ]
    },
    {
      title: "Your school project requires materials",
      options: [
        {
          text: "Use what you have at home",
          changes: { debt: 0, focus: 5, happiness: -5 }
        },
        {
          text: "Ask your parents to buy new supplies",
          changes: { debt: 300, focus: 10, happiness: 10 }
        }
      ]
    },
    {
      title: "You found ₹100 on the street",
      options: [
        {
          text: "Turn it in to lost and found",
          changes: { debt: 0, focus: 15, happiness: 5 }
        },
        {
          text: "Keep it and buy snacks",
          changes: { debt: -100, focus: -5, happiness: 10 }
        }
      ]
    },
    {
      title: "Your weekly allowance day is here",
      options: [
        {
          text: "Save half, spend half",
          changes: { debt: -200, focus: 10, happiness: 5 }
        },
        {
          text: "Spend it all immediately",
          changes: { debt: 0, focus: -5, happiness: 15 }
        }
      ]
    }
  ],
  
  // Questions for users 18-35
  adult: [
    {
      title: "Your friends want to go to an expensive restaurant",
      options: [
        {
          text: "Suggest a more affordable option",
          changes: { debt: 1000, focus: 5, happiness: -5 }
        },
        {
          text: "Go and spend beyond your budget",
          changes: { debt: 3000, focus: -10, happiness: 15 }
        }
      ]
    },
    {
      title: "Your smartphone is two years old",
      options: [
        {
          text: "Keep using it until it breaks",
          changes: { debt: 0, focus: 5, happiness: -10 }
        },
        {
          text: "Buy the latest model on EMI",
          changes: { debt: 12000, focus: -5, happiness: 20 }
        }
      ]
    },
    {
      title: "You have an unexpected medical expense",
      options: [
        {
          text: "Use your emergency fund",
          changes: { debt: 2000, focus: 5, happiness: -5 }
        },
        {
          text: "Pay with a credit card",
          changes: { debt: 5000, focus: -10, happiness: 0 }
        }
      ]
    },
    {
      title: "Your company offers investment matching",
      options: [
        {
          text: "Contribute the maximum amount",
          changes: { debt: -1000, focus: 15, happiness: -5 }
        },
        {
          text: "Skip it and keep more take-home pay",
          changes: { debt: 0, focus: -5, happiness: 10 }
        }
      ]
    },
    {
      title: "You received a salary bonus",
      options: [
        {
          text: "Pay off existing debts",
          changes: { debt: -5000, focus: 20, happiness: 5 }
        },
        {
          text: "Plan a vacation",
          changes: { debt: 2000, focus: -10, happiness: 25 }
        }
      ]
    }
  ],
  
  // Questions for users over 35
  senior: [
    {
      title: "Your child needs money for higher education",
      options: [
        {
          text: "Use your retirement savings",
          changes: { debt: -2000, focus: -15, happiness: 10 }
        },
        {
          text: "Help them apply for education loans",
          changes: { debt: 8000, focus: 5, happiness: -5 }
        }
      ]
    },
    {
      title: "Your parents need financial support",
      options: [
        {
          text: "Set up a monthly support system",
          changes: { debt: 3000, focus: 5, happiness: 10 }
        },
        {
          text: "Help occasionally when they ask",
          changes: { debt: 1000, focus: -5, happiness: -10 }
        }
      ]
    },
    {
      title: "Time to review your retirement portfolio",
      options: [
        {
          text: "Adjust for lower risk as you age",
          changes: { debt: -1000, focus: 15, happiness: 5 }
        },
        {
          text: "Keep high-risk investments for better returns",
          changes: { debt: 0, focus: -10, happiness: -5 }
        }
      ]
    },
    {
      title: "You have an opportunity to buy a vacation home",
      options: [
        {
          text: "Take a loan and purchase it",
          changes: { debt: 20000, focus: -10, happiness: 20 }
        },
        {
          text: "Invest the money instead",
          changes: { debt: -5000, focus: 15, happiness: -5 }
        }
      ]
    },
    {
      title: "Your insurance premiums have increased",
      options: [
        {
          text: "Shop around for better rates",
          changes: { debt: -2000, focus: 10, happiness: 5 }
        },
        {
          text: "Reduce coverage to keep costs down",
          changes: { debt: -1000, focus: -15, happiness: -5 }
        }
      ]
    }
  ]
};