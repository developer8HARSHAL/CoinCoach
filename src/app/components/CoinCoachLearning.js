'use client'
import { useState } from 'react'
import { Search, CreditCard } from 'lucide-react'

const financeCards = [
  {
    title: "Bitcoin Investment",
    description: "Smart Bitcoin investment strategies",
    tips: [
      "Consider dollar-cost averaging",
      "Keep private keys offline",
      "Understand market cycles"
    ],
    color: "from-orange-500 to-orange-700"
  },

  {
    title: "Risk Management",
    description: "Financial risk control strategies",
    tips: [
      "Diversify across asset classes",
      "Use stop-loss orders wisely",
      "Monitor market volatility"
    ],
    color: "from-red-500 to-red-700"
  },
  {
    title: "Real Estate Investment",
    description: "Property investment fundamentals",
    tips: [
      "Research location dynamics",
      "Calculate ROI carefully",
      "Consider maintenance costs"
    ],
    color: "from-green-600 to-green-800"
  },
  {
    title: "Tax Planning",
    description: "Smart tax strategy basics",
    tips: [
      "Track all transactions",
      "Understand tax implications",
      "Consider tax-loss harvesting"
    ],
    color: "from-yellow-600 to-yellow-800"
  },
  {
    title: "Retirement Planning",
    description: "Long-term financial security",
    tips: [
      "Start saving early",
      "Maximize employer matches",
      "Diversify retirement accounts"
    ],
    color: "from-teal-600 to-teal-800"
  },
  {
    title: "Emergency Fund",
    description: "Building financial safety nets",
    tips: [
      "Save 3-6 months expenses",
      "Keep funds accessible",
      "Use high-yield savings"
    ],
    color: "from-indigo-600 to-indigo-800"
  },
  {
    title: "Debt Management",
    description: "Smart debt handling strategies",
    tips: [
      "Prioritize high-interest debt",
      "Avoid unnecessary borrowing",
      "Consider consolidation"
    ],
    color: "from-pink-600 to-pink-800"
  },
  {
    title: "Stock Market Basics",
    description: "Equity investment essentials",
    tips: [
      "Understand market indices",
      "Research companies thoroughly",
      "Consider dividend stocks"
    ],
    color: "from-cyan-600 to-cyan-800"
  },
  {
    title: "Budget Planning",
    description: "Personal budget management",
    tips: [
      "Track all expenses",
      "Use 50/30/20 rule",
      "Review monthly spending"
    ],
    color: "from-amber-600 to-amber-800"
  },
  {
    title: "Insurance Planning",
    description: "Protection strategy basics",
    tips: [
      "Review coverage annually",
      "Compare policy options",
      "Understand exclusions"
    ],
    color: "from-lime-600 to-lime-800"
  },
  {
    title: "Estate Planning",
    description: "Legacy protection basics",
    tips: [
      "Create a living will",
      "Update beneficiaries",
      "Consider trust options"
    ],
    color: "from-rose-600 to-rose-800"
  },
  {
    title: "Credit Management",
    description: "Building credit health",
    tips: [
      "Pay bills on time",
      "Monitor credit score",
      "Keep utilization low"
    ],
    color: "from-violet-600 to-violet-800"
  },
  
]

function Card({ title, description, tips, color }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div 
      className="w-[342px] h-[216px] perspective-1000 group my-4 mx-3 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative w-full h-full duration-500 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        <div className={`absolute w-full h-full rounded-xl p-6 shadow-lg bg-gradient-to-br ${color}
          backface-hidden border border-white/20 backdrop-blur-sm`}>
          <div className="flex flex-col justify-between h-full text-white">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="w-6 h-6" />
                <h2 className="text-2xl font-bold">{title}</h2>
              </div>
              <p className="text-base text-white/90">{description}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/80">Flip for tips →</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>

        <div className={`absolute w-full h-full rounded-xl p-6 bg-gradient-to-br ${color}
          rotate-y-180 backface-hidden border border-white/20 backdrop-blur-sm`}>
          <div className="flex flex-col h-full text-white">
            <h3 className="text-xl font-bold mb-4">Quick Tips:</h3>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-white/80 mt-2" />
                  <span className="text-sm leading-tight">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoinCoachLearning() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCards = financeCards.filter(card => 
    card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-black pb-10">CoinCoach Tips</h1>
          </div>
          <div className="relative w-1/2 mx-auto pb-10">
            <input
              type="text"
              placeholder="Search topics..."
              className="w-full bg-black/10 text-black px-4 py-2 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-4">
          {filteredCards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </main>
  )
}