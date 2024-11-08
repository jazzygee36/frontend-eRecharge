'use client';
import Input from '@/component/common/input';
import React, { useState } from 'react';
import Create from '../../assets/registerIcon.svg';
import Button from '@/component/common/button';
import Link from 'next/link';

import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logIn } from '@/api/auth';
import { QUERIES } from '@/utils';
import Toast from '@/component/common/toast/toast';
import { AxiosError } from 'axios';

const formSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  password: z.string().min(6, 'Password should be at least 6 characters long'), // Fixed validation for password
});

type FormData = z.infer<typeof formSchema>;

const Login = () => {
  const queryClient = useQueryClient();

  const [data, setData] = useState<FormData>({ username: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: logIn,
    onSuccess: (data: unknown) => {
      const successMessage =
        (data as { response?: { data?: { message: string } } })?.response?.data
          ?.message || 'Login Successful';
      setToastMessage({
        message: successMessage,
        type: 'success',
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.ME],
      });
      // Additional logic for post-registration

      window.location.href = '/dashboard';
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || 'Error during login';
      setToastMessage({ message: errorMessage, type: 'error' });
      console.log(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    const parsedData = formSchema.safeParse(data);
    if (!parsedData.success) {
      // Collect validation errors
      const fieldErrors: { [key: string]: string } = {};
      parsedData.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    // If validation passes, call the mutation
    mutate(parsedData.data);
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
          <h2 className='text-[30px] font-bold text-center  mt-10 lg:mt-0'>
            Welcome to{' '}
            <span style={{ color: 'green', fontWeight: 700 }}>E-Recharge</span>
          </h2>

          <h6 className='text-[20px] font-bold  mt-10 lg:mt-0'>Login</h6>
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
              title={isPending ? 'Login...' : 'Login'}
              disabled={isPending}
              type='submit'
              className='bg-[#485696] w-full hover:bg-[green] mt-4'
            />
          </form>
          {toastMessage && (
            <Toast
              message={toastMessage.message}
              type={toastMessage.type}
              onClose={() => setToastMessage(null)}
            />
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 items-center mt-2'>
            <Link href={'/reset-password'}>
              <div className='font-medium text-[#FC7A1E] text-[13px]'>
                Forget password?
              </div>
            </Link>
            <div>
              <p className='text-[#333333] mt-3 text-[13px] '>
                Dont have an account?{' '}
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
