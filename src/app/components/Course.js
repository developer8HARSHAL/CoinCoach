import Image from "next/image";
import Link from 'next/link';

export default function Course({name,img,desc,addr}){
    return(
        <div className="mx-4 mt-4 shadow-xl shadow-black rounded-md border-[1px] border-black bg-white">
            <div>
               <Image src={img} alt="piggy" height={300} width={300} className="w-[500px] rounded-ss-md rounded-se-md "/>
            </div>
            <div>
                <div className="text-center text-2xl inter font-semibold my-2">
                    {name}
                </div>
                <div className="mx-3">
                    {desc}
                </div>
                <div className="flex justify-center my-3">
                   <Link href={addr}><button className="py-1 bg-[#533359] px-3 text-white rounded-md">Learn More </button></Link> 
                </div>
            </div>
        </div>
    )
}