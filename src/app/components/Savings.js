import Image from 'next/image'
import Link from 'next/link'
import budget from '../../../public/Budgeting.jpg'
import fund from '../../../public/Fund.jpg'
import Investment from '../../../public/Investment.jpg'
import depts from '../../../public/depts.jpg'
import saving from '../../../public/saving.png'



export default function SavingsPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <Image
              src={saving}
              alt="Savings Hero Image"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            <h1 className="text-4xl font-bold text-gray-800">Master Your Savings</h1>
            <p className="text-lg text-gray-600">
              Learn effective strategies to grow your wealth and secure your financial future.
              Our comprehensive courses will guide you through smart saving techniques and investment principles.
            </p>
           
          </div>
        </div>
      </section>

      {/* Courses Section */}
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
                  <p className="text-gray-600">{course.description}</p>
                  <Link 
                    href="#"
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More
                    
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
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
