"use client";
import Lottie from 'lottie-react';
import Savings from '../lotties/saving.json';
import Finplan from '../lotties/finplan.json';
import Games from "../lotties/game.json";
import Course from './Course';
import piggy from "../../../public/images/piggy.jpg";
import taxes from "../../../public/images/taxes.jpg";
import invest from "../../../public/images/invest.jpg"
import loans from "../../../public/images/loans.jpg";
import money from "../lotties/Money.json";
import Navbar from './Navbar';
import HomeImg from "../lotties/home_img.json"
import Footer from './Footer';
import CoinCoachLearning from './CoinCoachLearning';




export default function Homepage(){
    return(
    
            <div>
            <div className=" flex text-center lg:text-7xl text-3xl p-10 lg:text-center lg:py-[20px] lg:mt-[10px] lg:mb-[10px]">
                <div className='mt-[150px]'>
                    <div className='flex justify-center lg:text-center'><b>Empowering Your Wallet, </b></div>
                    <div className="flex justify-center mt-[20px] lg:text-5xl">
                        <div>One Smart Choice at a Time</div>
                    </div>
                </div>

                <div className='flex justify-center mt-[40px]'>
                    <Lottie animationData={HomeImg} className='h-[400px] lg:h-[650px] mt-[-60px]'/>
                </div>
                
            </div>
            <div className="lg:text-4xl text-xl mb-[45px] text-center"><b>CoinCoach isn't just another financial advice site; it's a learning companion</b></div>
              <div className='flex justify-center '> 
                <a href="#crs" className='bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-400 hover:text-black text-white text-4xl mt-[-10px] mr-[20px] px-7 py-3 lg:rounded-full rounded-lg'>Explore our Courses!</a>
              </div> 
            <div className='grid justify-center lg:grid-cols-2 grid-cols-1 lg:mt-[150px] h-[600px] lg:ml-[100px] lg:mr-[100px] bg-[#301934] rounded-3xl border-[1px]'>
                <div className=' caveat-font text-center text-white inter lg:text-5xl text-xl lg:mt-[205px] lg:ml-[155px]'>Save Today, Secure Tomorrow, <br/>Your Future Starts with Small Steps!</div>
                <Lottie animationData={Savings} className='lg:h-[900px] mt-[-150px] h-[300px] lg:mr-[145px] lg:ml-[50px]'/>
            </div>
            

            <div>
                <br></br><br></br>
                <div className='lg:text-6xl text-4xl p-3 lg:text-center inter lg:mt-[120px]'><b>Why Use CoinCoach?</b></div>
                <div className='grid grid-cols-2 lg:pl-[0px]'>
                    <Lottie animationData={Games} className='lg:w-[500px] lg:h-[500px] mt-[100px] mb-[20px] ml-[110px]'/>
                    <div className='lg:mt-[80px] pt-[180px] text-5xl text-center inter font-bold px-[30px] bg-yellow-400 rounded-ss-[150px] rounded-ee-[150px] py-[80px] '>
                        Gamified Learning <div className='mt-[10px] text-xl font-semibold'>For Fun And Enagagement</div>
                    <div className='text-xl font-thin'>
                        Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn
                    </div>
                    </div>
                </div>
                <div className='grid grid-cols-2'>
                    <div className='lg:mt-[0px] pt-[180px] text-5xl text-center font-bold inter px-[30px] bg-yellow-400 rounded-ss-[150px] rounded-ee-[150px] py-[80px] '>
                    Expert-Crafted Curriculum <div className='mt-[10px] text-xl font-semibold'>for Real Results</div> 
                    <div className='text-xl font-thin'>
                        Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn
                    </div>
                    </div>
                    <Lottie animationData={Finplan} className='lg:w-[500px] lg:h-[500px] mt-[50px] ml-[150px]'/>

                </div>
            </div>

            <div id="crs" className='lg:my-[150px] my-[100px]'>
                <div className='text-center inter lg:text-6xl text-4xl'><b>Explore Our Courses!</b></div>
                {/* <div className='grid grid-cols-1 lg:grid-cols-4 lg:mt-[60px] mt-[20px] py-10 px-[10px]'>
                    <Course name="Future Funds" img={piggy} desc="Discover strategies to build a safety net and grow your wealth through savvy saving habits" addr="/savings"/>
                    <Course name="Tax Tactics" img={taxes} desc="Learn effective ways to manage your taxes and maximize returns with ease and confidence" addr="/savings" />
                    <Course name="Invest IQ" img={invest} desc="Boost your investment knowledge and learn how to make your money work harder for you." addr="/savings"/>
                    <Course name="Borrow Smart" img={loans} desc="Navigate the world of loans and credit with clarity, ensuring you borrow only when it’s wise." addr="/savings" />
                </div> */}
                <CoinCoachLearning/>
            </div>

        {/* <div className='bg-gradient-to-r from-[rgba(169,61,225,1)]  to-[rgba(255,113,77,1)] mx-[50px] lg:h-[500px] lg:rounded-full rounded-lg inter lg:mt-[-20px]'>
            <div className='lg:text-7xl text-3xl text-center pt-[100px] lg:pt-[200px] font-bold '>Sign Up to CoinCoach</div>
            <div className='text-center lg:text-3xl lg:mt-[20px]'></div>
            <div className='flex justify-center'>
                <button className='bg-black hover:bg-white text-white hover:text-black my-[100px] py-3 px-10 mt-[20px] text-2xl rounded-xl'> Try For FREE!</button>
            </div>
        </div> */}

    
        </div>
    )
}