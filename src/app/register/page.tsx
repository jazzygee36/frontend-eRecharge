'use client';
import Input from '@/component/common/input';
import React, { useState } from 'react';
import Create from '../../assets/online.webp';
import Button from '@/component/common/button';
import Link from 'next/link';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signUp } from '@/api/auth';
import Toast from '@/component/common/toast/toast';
import { QUERIES } from '@/utils';
import { AxiosError } from 'axios';
import Loading from '@/component/common/loading/loading';

const formSchema = z.object({
  username: z.string().min(3, 'Username should be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password should be at least 6 characters long'),
  phoneNumber: z.string().length(11, 'Phone number should be 11 characters'),
});

type FormData = z.infer<typeof formSchema>;

const Register = () => {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FormData>({
    username: '',
    password: '',
    email: '',
    phoneNumber: '',
  });
  console.log('email', data.email);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: signUp,
    onSuccess: (data: unknown) => {
      const successMessage =
        (data as { response?: { data?: { message: string } } })?.response?.data
          ?.message || 'Registered Successfully';
      setLoading(true);

      setToastMessage({
        message: successMessage,
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES.USERPROFILE],
      });
      // Additional logic for post-registratio

      setTimeout(() => {
        window.location.href = '/confirm-email';
      }, 300); // Adjust delay as needed
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || 'Error during registration';
      setToastMessage({ message: errorMessage, type: 'error' });
      console.log(error);
    },
  });
  // localStorage.setItem('email', data.email);

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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear field-specific errors on input change
    if (name === 'email') {
      localStorage.setItem('email', value);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className='flex items-center justify-center min-h-screen'>
          <div className='grid grid-cols-1 md:grid-cols-2 items-center w-full'>
            <img
              src={Create.src}
              alt='create'
              className='m-auto hidden md:block'
            />

            <div className='w-[80%] lg:w-[55%] m-auto'>
              <h2 className='text-xl font-bold text-[green] text-center'>
                e-Recharge
              </h2>
              <h2 className='text-[30px] font-bold text-center mt-10 lg:mt-0'>
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
                  type='text'
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
                  title={isPending ? 'Registering...' : 'Register'}
                  disabled={isPending}
                  className='bg-[#485696] w-full hover:bg-[green]'
                />
                <p className='text-[#333333] text-center text-[13px] mt-3'>
                  Already have an account?{' '}
                  <Link href='/login'>
                    <span
                      style={{
                        color: '#FC7A1E',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                      }}
                    >
                      Log In
                    </span>
                  </Link>
                </p>
              </form>
              {toastMessage && (
                <Toast
                  message={toastMessage.message}
                  type={toastMessage.type}
                  onClose={() => setToastMessage(null)}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
