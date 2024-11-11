'use client';

import React, { useState, useEffect } from 'react';

const ConfirmEmail = () => {
  const [email, setEmail] = useState<string>('');

  // Retrieve the email from localStorage when the component mounts
  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    setEmail(storedEmail ?? '');
  }, []);

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[90%] md:w-[50%] lg:w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h2 className='text-[12px] font-bold text-center  mb-5 lg:mt-0 block md:hidden'>
          <span style={{ color: 'green', fontWeight: 700 }}>E-Recharge</span>
        </h2>
        <h1 className='text-center text-[30px] font-bold '>Confirm Email</h1>
        <p className='text-[#333333] mt-3 text-[13px] text-center'>
          Verification link has been sent to the email address you provided.
        </p>
        <h1 className='font-bold text-center text-[20px] border rounded-lg py-3 my-5'>
          {email}
        </h1>
        Click on the link to confirm that your email is real.
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
