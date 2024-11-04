"use client"
import Lottie from 'lottie-react';
import Savings from '../lotties/saving.json';
import Finplan from '../lotties/finplan.json';
import Games from "../lotties/game.json";
import Course from './Course';
import piggy from "../images/piggy.jpg";
import taxes from "../images/taxes.jpg";
import invest from "../images/invest.jpg"
import loans from "../images/loans.jpg";


export default function Homepage(){
    return(
        <div>
            <div className="lg:text-6xl text-3xl p-10 lg:text-center text-white inter bg-[#301934] lg:py-[200px]">
                <div>Empowering Your Wallet, </div>
                <div className="my-3">One Smart Choice at a Time</div>
                <div className="lg:text-2xl text-xl font-thin lg:my-10">CoinCoach isn't just another financial advice site; it's a learning companion</div>
            </div>
            <div className='grid lg:grid-cols-2 grid-cols-1 lg:p-2 p-5'>
                <div className=' caveat-font text-center inter lg:text-3xl text-xl lg:mt-[250px]'>Save Today, Secure Tomorrow, <br/>Your Future Starts with Small Steps!</div>
                <Lottie animationData={Savings} className='lg:h-[500px] h-[300px] '/>
            </div>

            <div>
                <div className='lg:text-6xl text-4xl p-3 lg:text-center inter'>Why Use CoinCoach</div>
                <div className='grid lg:grid-cols-2 lg:pl-[50px]'>
                    <Lottie animationData={Games} className='lg:w-[500px] lg:h-[500px] mt-[100px]'/>
                    <div className='lg:mt-[80px] pt-[180px] text-5xl text-center inter font-bold px-[30px] bg-orange-400 rounded-ss-[150px] rounded-ee-[150px] py-[80px] '>
                        Gamified Learning <div className='mt-[10px] text-xl font-semibold'>For Fun And Enagagement</div>
                    <div className='text-xl font-thin'>
                        Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn
                    </div>
                    </div>
                </div>
                <div className='grid lg:grid-cols-2'>
                    <div className='lg:mt-[80px] pt-[180px] text-5xl text-center font-bold inter px-[30px] bg-orange-400 rounded-se-[150px] rounded-es-[150px] py-[80px] '>
                    Expert-Crafted Curriculum <div className='mt-[10px] text-xl font-semibold'>for Real Results</div> 
                    <div className='text-xl font-thin'>
                        Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn
                    </div>
                    </div>
                    <Lottie animationData={Finplan} className='lg:w-[500px] lg:h-[500px] mt-[100px] ml-[150px]'/>

                </div>
            </div>

            <div className='lg:my-[150px] my-[100px]'>
                <div className='text-center inter lg:text-6xl text-4xl'>Explore Our Courses</div>
                <div className='grid grid-cols-1 lg:grid-cols-4 lg:mt-[60px] mt-[20px] bg-[#301934] py-10'>
                    <Course name="Future Funds" img={piggy} desc="Discover strategies to build a safety net and grow your wealth through savvy saving habits" addr="/savings"/>
                    <Course name="Tax Tactics" img={taxes} desc="Learn effective ways to manage your taxes and maximize returns with ease and confidence" addr="/savings" />
                    <Course name="Invest IQ" img={invest} desc="Boost your investment knowledge and learn how to make your money work harder for you." addr="/savings"/>
                    <Course name="Borrow Smart" img={loans} desc="Navigate the world of loans and credit with clarity, ensuring you borrow only when it’s wise." addr="/savings" />
                </div>
            </div>

        <div className='bg-gradient-to-r from-[rgba(169,61,225,1)]  to-[rgba(255,113,77,1)] mx-[40px] lg:h-[500px] lg:rounded-full rounded-lg inter'>
            <div className='lg:text-7xl text-3xl text-center pt-[100px] lg:pt-[200px] font-bold '>Sign Up to CoinCoach</div>
            <div className='text-center lg:text-3xl lg:mt-[20px]'>For Free Now</div>
            <div className='flex justify-center'>
                <button className='bg-black hover:bg-white text-white hover:text-black my-[100px] py-2 px-6 mt-[20px] text-xl rounded-lg'>Go Ahead</button>
            </div>
        </div>

        <div className='bg-[#301934] lg:mt-[100px] rounded-ss-full rounded-se-full inter'>
            <div className='grid lg:grid-cols-4 lg:pt-[100px] pl-[150px] font-thin pb-[80px]'>
                <div className='text-white'>
                    <div className='lg:text-5xl'>Coincoach</div>
                    <div>@2023 CoinCoach</div>
                    <div>All rights are reserved</div>
                </div>
                <div className='text-xl text-white'>
                    <div className='font-bold text-3xl'>Courses</div>
                    <div >Savings</div>
                    <div>Investment</div>
                    <div>Retirement Planning</div>
                    <div>Tax Management</div>
                </div>
                <div className='text-xl text-white'>
                    <div className='font-bold text-3xl'>Support</div>
                    <div>Help Center</div>
                    <div>Terms Of Use</div>
                    <div>Privacy Policy</div>
                </div>
                <div className='text-xl text-white'>
                    <div className='font-bold text-3xl'>Connect</div>
                    <div>Instagram</div>
                    <div>Facebook</div>
                    <div>LinkedIn</div>
                </div>
            </div>
        </div>

        </div>
    )
}