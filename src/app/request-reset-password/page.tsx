'use client';
import { requestPasswordReset } from '@/api/auth';
import Button from '@/component/common/button';
import Input from '@/component/common/input';
import Toast from '@/component/common/toast/toast';
import { QUERIES } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(3, 'Email required'),
  newPassword: z.string().min(6, 'New Password required'),
});

type FormData = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const queryClient = useQueryClient();

  // Add state to hold the phone number

  const [data, setData] = useState<FormData>({ email: '', newPassword: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data: unknown) => {
      const successMessage =
        (data as { response?: { data?: { message: string } } })?.response?.data
          ?.message || 'A link has been sent to you email for password reset';
      setToastMessage({
        message: successMessage,
        type: 'success',
      });

      queryClient.invalidateQueries({
        queryKey: [QUERIES.ME],
      });
      // Additional logic for post-registration

      window.location.href = '/confirm-email';
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage =
        error?.response?.data?.message || 'Error password change';
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

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[90%] md:w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h2 className='text-[12px] font-bold text-center mb-5 lg:mt-0 block md:hidden'>
          <span style={{ color: 'green', fontWeight: 700 }}>E-Recharge</span>
        </h2>
        <h1 className='text-center text-[30px] font-bold'>
          Request Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            name='email'
            type='text'
            placeholder='Enter Email'
            value={data.email} // Use the state variable here
            onChange={handleChange} // Update the state when input changes
          />
          {errors.email && (
            <p className='text-red-500 text-[13px] text-center mb-3'>
              {errors.email}
            </p>
          )}
          <Input
            name='newPassword'
            type='text'
            placeholder='Enter New Password'
            value={data.newPassword} // Use the state variable here
            onChange={handleChange} // Update the state when input changes
          />
          {errors.newPassword && (
            <p className='text-red-500 text-[13px] text-center mb-3'>
              {errors.newPassword}
            </p>
          )}
          <Button
            title={isPending ? 'Reseting Reset Password...' : 'Reset Password'}
            disabled={isPending}
            className={'bg-[#FC7A1E] w-full hover:bg-[#485696]'}
            type={'submit'}
          />
        </form>
        {toastMessage && (
          <Toast
            message={toastMessage.message}
            type={toastMessage.type}
            onClose={() => setToastMessage(null)}
          />
        )}
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
