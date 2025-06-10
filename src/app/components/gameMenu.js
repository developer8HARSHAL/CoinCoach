import Course from "./Course";
import GameCard from "./gameCard";

export default function GameMenu() {
  return (
    <div className="flex justify-center my-12 px-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">
            🎮 Explore Financial Literacy Games
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            Learn while you play — make smart money moves through fun interactive games!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <GameCard
            name="Drag and Drop"
            description="Learn budgeting through an interactive drag-and-drop activity."
            link="/games/draganddrop"
          />
          <GameCard
            name="Find Billing Mistakes"
            description="Spot the errors in fake bills and sharpen your attention to detail."
            link="/games/find-billing-mistakes"
          />
          <GameCard
            name="Time For Payback"
            description="Understand debt management by simulating real-life choices."
            link="/games/gamehome"
          />
          <GameCard
            name="Crossword: Credit & Debt"
            description="Crack clues and learn essential finance vocabulary."
            link="/games/crossword"
          />
          <GameCard
            name="Spot the Scam"
            description="Test your instincts by identifying phishing messages and scams."
            link="/games/spotthescam"
          />
          <GameCard
            name="UPI Safety Quiz"
            description="Play a quick quiz to check your UPI transaction safety awareness."
            link="/games/upi-safety-quiz"
          />
        </div>
      </div>
    </div>
  );
}
