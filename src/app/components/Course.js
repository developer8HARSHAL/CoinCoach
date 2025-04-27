import Image from "next/image";
import Link from 'next/link';

export default function Course({name,img,desc,addr}){
    return(
        <div className="lg:py-[50px] lg:mt-[-20px] mx-5 shadow-lg shadow-gray-600 rounded-3xl bg-white">
            <div>
            <Image
  src="/images/piggy.jpg"
  alt="Piggy"
  width={400} // adjust based on your image size
  height={300}
/>

            </div>
            <div>
                <div className="lg:mt-[20px] text-center text-2xl inter font-semibold my-2">
                    {name}
                </div>
                <div className="mx-3 text-center">
                    {desc}
                </div>
                <div className="flex justify-center my-3 lg:mt-[20px] lg:mb-[-10px]">
                   <Link href={addr}><button className="py-2 bg-yellow-400 px-3 text-black rounded-md"><b>Learn More </b></button></Link> 
                </div>
            </div>
        </div>
    )
}