"use client"
import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Level(props){
    const [isOpen, setIsOpen] = useState(false);
    const [complete,setComplete] = useState(false);
    let count=0;
    const toggleComplete = ()=>{
        setComplete(true)
        count+=1
    }

    const toggleOpen = () => {
      setIsOpen(!isOpen);
    };
    return(
        <div className="inter">
            <div></div>
            
            <div className="w-[90%] lg:mx-[30px] ml-[10px] mt-5" onClick={toggleOpen}>
                    <div
                        className={`${complete?"bg-green-500":"bg-blue-500"} text-white text-center py-4 px-6  rounded flex justify-between` } 
                    >
                       {props.num}<IoMdArrowDropdown className="h-[30px] w-[30px]" />
                    </div>

                
                    <div
                        className={`overflow-hidden transition-all duration-1500 ease-in-out ml-[30px] transform-gpu ${
                        isOpen ? "lg:max-h-[100%]" : "max-h-0"
                        }`}
                    >
                        <div className="text-3xl font-bold my-[10px]">Objective:</div>
                        <div>
                            {props.obj}
                        </div>
                        <div className="text-3xl font-bold my-[10px]">Let's Dive in!</div>
                        <div>
                            {props.c1}
                        </div>
                        <div>
                            {props.c2}
                        </div>
                        <div className="text-3xl font-bold my-[10px]">Example:</div>
                        <div>
                            {props.example}
                        </div>
                        <div className="text-3xl font-bold my-[10px]">Activity</div>
                        <div className="flex">
                          <FaArrowRightLong className="w-[20px] h-[20px] mr-[10px]"/>  {props.activity1}
                        </div>
                        <div className="flex">
                        <FaArrowRightLong className="w-[20px] h-[20px] mr-[10px]"/> {props.activity2}
                        </div>

                        <button onClick={()=>{toggleComplete(); toggleOpen();}} className="bg-green-500 px-3 py-1 text-lg rounded-md mt-[15px]">Complete</button>
                    </div>
            </div>
        </div>
        
    )
}