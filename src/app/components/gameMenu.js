import Course from "./Course";
import GameCard from "./gameCard";
export default function GameMenu(){
    return(
        <div className="flex justify-center my-10">
            
            <div>
            <div className="text-center text-3xl mb-4 font-bold">Explore the Games</div>
            <div className="grid grid-cols-2 gap-6">
            <GameCard name="Drag and Drop" description="Play D&D while making smart choices"/>
            <GameCard name="Find Billing Mistakes" description="Play D&D while making smart choices"/>
            </div>
            <div className="grid grid-cols-2 mt-10 gap-6">
            <GameCard name="Time For Payback" description="Play D&D while making smart choices"/>
            <GameCard name="Crossword For Credit and Debt" description="Play D&D while making smart choices"/>
            </div>
            <div className="grid grid-cols-2 mt-10 gap-6">
            <GameCard name="Time For Payback" description="Play D&D while making smart choices"/>
            <GameCard name="Crossword For Credit and Debt" description="Play D&D while making smart choices"/>
            </div>
            <div className="grid grid-cols-2 mt-10 gap-6">
            <GameCard name="Time For Payback" description="Play D&D while making smart choices"/>
            <GameCard name="Crossword For Credit and Debt" description="Play D&D while making smart choices"/>
            </div>
            </div>
        </div>
    )
}