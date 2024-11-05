'use client';
import Button from '@/component/common/button';
import Input from '@/component/common/input';
import React, { useState } from 'react';

const ConfirmEmail = () => {
  // Add state to hold the phone number
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value); // Update the state with the input value
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h1 className='text-center text-[30px] font-bold'>Confirm Email</h1>
        <p className='text-[#333333] mt-3 text-[13px] text-center'>
          Check your inbox
        </p>
        <Input
          name='phone number'
          type='text'
          placeholder='Enter Email'
          value={email} // Use the state variable here
          onChange={handleChange} // Update the state when input changes
        />
        <Button
          title='Reset Password'
          className={'bg-[#FC7A1E] w-full hover:bg-[#485696]'}
          type={'submit'}
        />
        <div>
          <p className='text-[#333333] mt-3 text-[13px] text-center'>
            Dont receive the email,
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
