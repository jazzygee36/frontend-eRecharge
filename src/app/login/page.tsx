'use client';
import Input from '@/component/common/input';
import React, { useState } from 'react';
import Create from '../../assets/registerIcon.svg';
import Button from '@/component/common/button';
import Link from 'next/link';

import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  password: z.string().min(6, 'Password should be at least 6 characters long'), // Fixed validation for password
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const [data, setData] = useState<FormData>({ username: '', password: '' });
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
        <img
          src={Create.src}
          alt='create'
          className='m-auto hidden md:block'
          style={{ width: 400 }}
        />
        <div className='w-[80%] lg:w-[55%] m-auto'>
          <h2 className='text-[30px] font-bold  mt-10 lg:mt-0'>Login</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              name='username' // Add name prop
              placeholder='Username'
              value={data.username}
              onChange={handleChange}
            />
            {errors.username && (
              <p className='text-red-500 text-[13px]'>{errors.username}</p>
            )}

            <Input
              type='password'
              name='password' // Add name prop
              placeholder='Password'
              value={data.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className='text-red-500 text-[13px]'>{errors.password}</p>
            )}

            <Button
              type='submit'
              title='Register'
              className='bg-[#FC7A1E] w-full hover:bg-[#485696] mt-4'
            />
          </form>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center mt-2'>
            <Link href={'/reset-password'}>
              <div className='font-medium text-[#FC7A1E] text-[13px]'>
                Forget password?
              </div>
            </Link>
            <div>
              <p className='text-[#333333] mt-3 text-[13px]'>
                Don't have an account?{' '}
                <Link href='/register'>
                  <span
                    style={{
                      color: '#485696',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                    }}
                  >
                    Register here
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
