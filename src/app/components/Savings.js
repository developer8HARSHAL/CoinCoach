
import Level from "./Level";

export default function Savings(){
    const cont1=(
        <>
        <div>For example, instead of saying, “I want to save more,” try, “I will save $500 over the next three months for an emergency fund.” This goal is:</div>
                    <ol>
                        <li>- Specific: Save $500</li>
                        <li>- Measurable: You can track your progress each month</li>
                        <li>- Achievable: It’s a realistic amount</li>
                        <li>- Relevant: Supports your financial security</li>
                        <li>- Time-bound: To be completed in three months</li>
                    </ol>
        </>
    )

    const cont2=(    <>
        <div>Consider the 50/30/20 rule as a budgeting framework:</div>
                    <ul className=" list-disc">
                        <li>50% of income for needs (rent, bills)</li>
                        <li>30% for wants (hobbies, entertainment)</li>
                        <li>20% for savings and debt payments</li>
                    </ul>
        </>
    )

    const cont3=(    <>
        <div>Consider the 50/30/20 rule as a budgeting framework:</div>
                    <ul className=" list-disc">
                        <li>Record Every Expense: Write down all expenses, big or small, to capture a full picture of your spending patterns. You can use budgeting apps or a simple spreadsheet.</li>
                        <li>Categorize Your Spending: Organize expenses into categories such as food, transportation, bills, entertainment, etc. This helps you identify which areas might be over-consuming your budget.</li>
                        <li>Analyze Patterns: Review your expenses weekly or monthly to spot spending trends, identify any impulse buys, and find areas where you could cut back.</li>
                    </ul>
        </>
    )
    
    return(
        <div>
            <Level 
                num="Level 1: Intro To Savings" 
                obj="Learn the basics of saving, why it matters, and how to set up a simple plan to grow your financial security." 
                c1="Saving is essential for building financial stability and reaching personal goals. Starting with even a small amount each month can create a strong foundation. Aim to set aside 5–10% of your income to begin with, gradually increasing as your financial confidence grows."
                c2="Saving also provides peace of mind through an emergency fund—a reserve that covers unexpected expenses. To build this fund, set a target of 3–6 months’ worth of essential expenses, so you’re prepared for anything from job changes to urgent repairs."
                example="Imagine you earn $2,000 per month. Setting aside 10%, or $200, allows you to build both a savings and emergency fund without drastically changing your lifestyle."
                activity1="Write down a realistic monthly savings amount based on your income."
                activity2="Set one short-term goal (e.g., save for a gadget) and one long-term goal (e.g., save for a trip or emergency fund)."
            />
            <Level 
                num="Level 2: Setting SMART Savings Goals"
                obj="Learn to set clear, actionable savings goals using the SMART framework to ensure your financial objectives are specific and achievable."
                c1="Goals give purpose to your savings and help you stay motivated. Using the SMART criteria—Specific, Measurable, Achievable, Relevant, and Time-bound—you can set goals that are clear and actionable."
                c2={cont1}
                example="Let’s say you want to save for a new laptop. Instead of “Save for a laptop,” a SMART goal could be, “Save $600 in six months by setting aside $100 per month.”"
                activity1="Choose one short-term goal and one long-term goal, then make them SMART."
                activity2="Write down a specific amount and timeframe for each goal, and plan how you’ll achieve them (e.g., cutting down on extra spending or setting up a dedicated savings account)."
            />
            <Level num="Level 3: Building a Budget for Savings"
            obj="Learn how to create a budget that prioritizes saving, helping you allocate money effectively while staying financially on track."
            c1="Budgeting is essential for identifying how much you can save each month. Start by categorizing your expenses and setting priorities for each spending area. Common categories include essentials (like rent, groceries, and utilities), non-essentials (like dining out and entertainment), and, most importantly, savings."
            c2={cont2}
            example="If you earn $2,500 monthly, you could allocate $1,250 for needs, $750 for wants, and $500 for savings. Tracking your spending helps you stay aligned with your budget, making it easier to adjust if necessary."
            activity1="Write down all your monthly expenses and divide them into needs, wants, and savings."
            activity2="Calculate how much you can save each month by following the 50/30/20 rule, or create a custom allocation that suits your goals."
            />
            <Level num="Level 4: Tracking Spending"
            obj="Learn to monitor and understand your spending habits to improve financial control and identify areas for potential savings."
            c1="Tracking your spending is an essential step toward financial awareness and achieving savings goals. By regularly monitoring your purchases, you’ll start noticing where your money goes, which helps in making mindful spending choices and avoiding unnecessary expenses."
            c2={cont3}
            example="Imagine you spend $200 monthly on dining out, but your budget goal is $100. Tracking reveals this, allowing you to adjust by cooking at home more often or choosing lower-cost options."
            activity1="Track your expenses for a week and categorize them."
            activity2="Identify one area where you could reduce spending to increase your savings"
            />
            <Level num="5"/>
            <Level num="6"/>
        </div>
    );
}