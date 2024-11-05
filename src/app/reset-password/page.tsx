'use client';
import Button from '@/component/common/button';
import Input from '@/component/common/input';
import Link from 'next/link';
import React, { useState } from 'react';

const ResetPassword = () => {
  // Add state to hold the phone number
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value); // Update the state with the input value
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h1 className='text-center text-[30px] font-bold'>Reset Password</h1>
        <Input
          name='phone number'
          type='number'
          placeholder='Enter Phone Number'
          value={phoneNumber} // Use the state variable here
          onChange={handleChange} // Update the state when input changes
        />
        <Button
          title='Reset Password'
          className={'bg-[#FC7A1E] w-full hover:bg-[#485696]'}
        />
        <div>
          <p className='text-[#333333] mt-3 text-[13px] text-center'>
            Remember password ?{' '}
            <Link href='/login'>
              <span
                style={{
                  color: '#485696',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Login here
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
