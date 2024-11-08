'use client';

import Input from '@/component/common/input';
import React, { useState, useEffect } from 'react';

const ConfirmEmail = () => {
  // Add state to hold the email
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Retrieve the email from localStorage when the component mounts
    const savedEmail = localStorage.getItem('userEmail'); // Replace 'userEmail' with the actual key used in localStorage
    if (savedEmail) {
      setEmail(savedEmail); // Set the state with the value from localStorage
    }
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[90%] md:w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h2 className='text-[12px] font-bold text-center  mb-5 lg:mt-0 block md:hidden'>
          <span style={{ color: 'green', fontWeight: 700 }}>E-Recharge</span>
        </h2>
        <h1 className='text-center text-[30px] font-bold'>Confirm Email</h1>
        <p className='text-[#333333] mt-3 text-[13px] text-center'>
          We sent you a verification link to the email address you provided.
          Click on the link to confirm that your email is real.
        </p>
        <Input
          name=''
          type='text'
          placeholder='Enter Email'
          value={email} // Use the state variable here
          readOnly={true}
        />

        <div>
          <p className='text-[#333333] mt-3 text-[13px] text-center'>
            Didnt receive the email?
            <span
              style={{
                color: '#485696',
                cursor: 'pointer',
                fontWeight: 'bold',
              }}
            >
              Click here to resend
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConfirmEmail;
