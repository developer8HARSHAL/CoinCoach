import React from 'react';

function Footer() {
    return (
        <div className='bg-[#301934] lg:mt-[100px] rounded-ss-full rounded-se-full inter'>
        <div className='grid lg:grid-cols-4 lg:pt-[80px] ml-[20px] pl-[160px] font-thin pb-[80px]'>
            <div className='text-white'>
                <div className='lg:text-5xl'>Coincoach</div>
                <div>@2023 CoinCoach</div>
                <div>All rights are reserved</div>
            </div>
            <div className='text-xl text-white'>
                <div className='font-bold text-3xl lg:py-[10px]'>Courses</div>
                <div >Savings</div>
                <div >Investment</div>
                <div >Retirement Planning</div>
                <div >Tax Management</div>
            </div>
            <div className='text-xl text-white'>
                <div className='font-bold text-3xl lg:py-[10px]'>Support</div>
                <div >Help Center</div>
                <div >Terms Of Use</div>
                <div >Privacy Policy</div>
            </div>
            <div className='text-xl text-white'>
                <div className='font-bold text-3xl lg:py-[10px]'>Connect</div>
                <div>Instagram</div>
                <div>Facebook</div>
                <div>LinkedIn</div>
            </div>
        </div>
    </div>
    );
}

export default Footer;