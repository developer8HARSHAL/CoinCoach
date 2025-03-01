import Image from 'next/image'
import Link from 'next/link'
import budget from '../../../public/Budgeting.jpg'
import fund from '../../../public/Fund.jpg'
import Investment from '../../../public/Investment.jpg'
import depts from '../../../public/depts.jpg'
import saving from '../../../public/saving.png'
import QuizComponent from './Quiz'
import LearningModule from './LearningModule'



export default function SavingsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      {/* <section className="mx-auto px-4 py-12 md:py-24 bg-yellow-400 ">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={saving}
              alt="Savings Hero Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg ml-[80px]"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold ">Master Your Savings</h1>
            <p className="text-lg ">
              Learn effective strategies to grow your wealth and secure your financial future.
              Our comprehensive courses will guide you through smart saving techniques and investment principles.
            </p>
           
          </div>
        </div>
      </section>

      <section id="courses" className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Topics Covered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow-md overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{course.title}</h3>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="grid lg:grid-cols-2  px-[30px]">
          <div className=" mt-[80px] w-[550px] ml-[80px]">
            <div className="card shadow-2xl rounded-lg p-6 ml-[50px] bg-white transform transition-all hover:scale-105 hover:shadow-xl border border-gray-300 flex justify-center">
              <Image src={budget} alt="Investment" height={500} width={500} />
            </div>
          </div>
          <div className="lg:mt-[80px] pt-[80px] text-5xl text-center inter font-bold text-gray-800">
            Bugetting Basics
            <div className="mt-[10px] text-xl font-semibold">
              For Fun And Engagement
            </div>
            <div className="text-xl font-thin mt-[10px] px-6 text-gray-600">
              Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn.
            </div>
          </div>
        </div>


        <div className="grid lg:grid-cols-2 gap-12 px-[30px] mt-[80px]">
          <div className="lg:mt-[80px] ml-[100px] pt-[80px] text-5xl text-center inter font-bold text-gray-800">
            Emergency Fund Strategies
            <div className="mt-[10px] text-xl font-semibold">
              for Real Results
            </div>
            <div className="text-xl font-thin mt-[10px] px-6 text-gray-600">
              Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn.
            </div>
          </div>
          <div className="lg:w-[500px] lg:h-[500px] mt-[100px] ml-[150px]">
            <div className="card shadow-2xl rounded-lg p-6 bg-white transform transition-all hover:scale-105 hover:shadow-xl border border-gray-300">
            <Image src={Investment} alt="Investment" height={500} width={500} />

            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2  px-[30px]">
          <div className=" mt-[80px] w-[550px] ml-[80px]">
            <div className="card shadow-2xl rounded-lg p-6 ml-[50px] bg-white transform transition-all hover:scale-105 hover:shadow-xl border border-gray-300 flex justify-center">
              <Image src={Investment} alt="Investment" height={500} width={500} />
            </div>
          </div>
          <div className="lg:mt-[80px] pt-[80px] text-5xl text-center inter font-bold text-gray-800">
            Investment Fundamentals
            <div className="mt-[10px] text-xl font-semibold">
              For Fun And Engagement
            </div>
            <div className="text-xl font-thin mt-[10px] px-6 text-gray-600">
              Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn.
            </div>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 px-[30px] mt-[80px]">
          <div className="lg:mt-[80px] pt-[80px] ml-[100px] text-5xl text-center inter font-bold text-gray-800">
            Debt Management
            <div className="mt-[10px] text-xl font-semibold">
              for Real Results
            </div>
            <div className="text-xl font-thin mt-[10px] px-6 text-gray-600">
              Learning about finances doesn’t have to be boring! CoinCoach turns complex topics into interactive games, quizzes, and challenges, so you can stay motivated and retain what you learn.
            </div>
          </div>
          <div className="lg:w-[500px] lg:h-[500px] mt-[100px] ml-[150px]">
            <div className="card shadow-2xl rounded-lg p-6 bg-white transform transition-all hover:scale-105 hover:shadow-xl border border-gray-300">
            <Image src={depts} alt="Investment" height={500} width={500} />

            </div>
          </div>
        </div>

  
        <div className="flex justify-center mt-8 mb-8">
          <button className="px-10 py-4 bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-400 text-white font-bold rounded-3xl text-2xl shadow-lg hover:scale-105 transform transition-all duration-300">
            <Link href="/quiz">
            Take Quiz
            </Link>
          </button>
        </div> */}
      <LearningModule/>
    </main>
  )
}

const courses = [
  {
    title: "Budgeting Basics",
    description: "Learn how to create and stick to a budget that works for your lifestyle.",
    image: budget,
  },
  {
    title: "Emergency Fund Strategies",
    description: "Discover the importance of emergency funds and how to build one effectively.",
    image: fund,
  },
  {
    title: "Investment Fundamentals",
    description: "Understand the basics of investing and how to grow your wealth over time.",
    image: Investment,
  },
  {
    title: "Debt Management",
    description: "Master techniques to manage and eliminate debt for a stronger future.",
    image: depts,
  },
  
]

