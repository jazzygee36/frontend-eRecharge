'use client';
import { requestPasswordReset, resetPassword } from '@/api/auth';
import Button from '@/component/common/button';
import Input from '@/component/common/input';
import Toast from '@/component/common/toast/toast';
import { QUERIES } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useState } from 'react';
import { z } from 'zod';

const formSchema = z.object({
  password: z.string().min(3, 'Password required'),
  confirmPwd: z.string().min(3, 'Password required'),
});

type FormData = z.infer<typeof formSchema>;

const ResetPassword = () => {
  const queryClient = useQueryClient();

  // Add state to hold the phone number

  const [data, setData] = useState<FormData>({ password: '', confirmPwd: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data: unknown) => {
      const successMessage =
        (data as any)?.response?.data?.message ||
        'Your password has been reset';
      setToastMessage({
        message: successMessage,
        type: 'success',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES.ME],
      });
      // Additional logic for post-registration

      window.location.href = '/login';
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as any)?.response?.data?.message ||
        'Error during password change';
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear field-specific errors on input change
  };
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-[90%] md:w-[30%] rounded-lg py-10 px-10 shadow-lg'>
        <h2 className='text-[12px] font-bold text-center mb-5 lg:mt-0 block md:hidden'>
          <span style={{ color: 'green', fontWeight: 700 }}>E-Recharge</span>
        </h2>
        <h1 className='text-center text-[30px] font-bold'>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <Input
            name='password'
            type='text'
            placeholder='Enter new password'
            value={data.password} // Use the state variable here
            onChange={handleChange} // Update the state when input changes
          />
          {errors.password && (
            <p className='text-red-500 text-[13px]'>{errors.password}</p>
          )}
          <Input
            name='confirmPwd'
            type='text'
            placeholder='Confirm new password'
            value={data.confirmPwd} // Use the state variable here
            onChange={handleChange} // Update the state when input changes
          />
          {errors.confirmPwd && (
            <p className='text-red-500 text-[13px]'>{errors.confirmPwd}</p>
          )}
          <Button
            title={isPending ? 'Reseting Password...' : 'Reset Password'}
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
