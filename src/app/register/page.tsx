'use client';
import Input from '@/component/common/input';
import React, { useEffect, useState } from 'react';
import Create from '../../assets/registerIcon.svg';
import Button from '@/component/common/button';
import Link from 'next/link';

import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  phoneNumber: z.string().min(11, 'Phone number should not be longer than 11'),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const [data, setData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate data
    const result = formSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      // Process form data
      console.log('Valid data:', result.data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center w-full'>
        <img src={Create.src} alt='create' className='m-auto hidden md:block' />
        <div className='w-[80%] lg:w-[55%] m-auto'>
          <h2 className='text-[30px] font-bold text-center md:text-left mt-10 lg:mt-0'>
            Create an account
          </h2>
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              placeholder='Username'
              name='username'
              value={data.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className='text-red-500 text-[13px] text-center'>
                {errors.username}
              </p>
            )}
            <Input
              type='email'
              placeholder='Email'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className='text-red-500 text-[13px] text-center'>
                {errors.email}
              </p>
            )}
            <Input
              type='number'
              placeholder='Phone Number'
              name='phoneNumber'
              value={data.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <p className='text-red-500 text-[13px] text-center'>
                {errors.phoneNumber}
              </p>
            )}
            <Input
              type='password'
              placeholder='Password'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className='text-red-500 text-[13px] text-center'>
                {errors.password}
              </p>
            )}
            <Button
              type='submit'
              title='Register'
              className='bg-[#FC7A1E] w-full hover:bg-[#485696]'
            />
            <p className='text-[#333333] text-center text-[13px] mt-3'>
              Already have an account?{' '}
              <Link href='/login'>
                <span
                  style={{
                    color: '#485696',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  Log In
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
