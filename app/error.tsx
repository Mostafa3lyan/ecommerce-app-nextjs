"use client";
import React from 'react';
import Image from 'next/image';
import errorImg from '../assets/images/error.svg';

const Error = () => {
  return (
    <>
    <div className="flex justify-center items-center">
      <Image src={errorImg} alt="Error" />
      </div>
      </>
  );
}

export default Error;
