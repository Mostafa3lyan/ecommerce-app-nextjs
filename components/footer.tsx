import { Button } from '@heroui/button';
import React from 'react';

const Footer = () => {
    return (
        <>
            <div className='w-full flex flex-col items-start mb-5 p-5 '>
                <h3 className='capitalize text-xl font-semibold'>get the fresh cart app</h3>
                <p>we will send you a link , open it </p>
                <div className='flex justify-between w-full mt-4'>
                    <input type='email' placeholder='your email address' className='border w-[80%] border-gray-300 rounded-l-md p-2 focus:outline-none focus:border-green-600 ' />
                    <Button className='bg-green-600 text-white w-[15%] rounded-sm px-8 py-5 hover:bg-green-500'>Send Link</Button>
                </div>
                <div>
                    <p className='text-sm text-gray-500 mt-4'>&copy; 2025 Fresh Cart. All rights reserved.</p>
                </div>
            </div>
        </>
    );
}

export default Footer;
