'use client';

import Button from '@/component/common/button';
import Input from '@/component/common/input';
import MTN from '../../assets/airtime/mtn big.webp';
import Airtel from '../../assets/airtime/airtelbig.jpg';
import MNineMobile from '../../assets/airtime/9mobile-logo.jpg';
import Glo from '../../assets/airtime/globig.jpg';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { AxiosError } from 'axios';
import { QUERIES } from '@/utils';
import { payUtiliies } from '@/api/auth';
import Toast from '@/component/common/toast/toast';
import BackIcon from '@/assets/icons/backIcon';
import ConfirmModal from '@/component/common/paymentConfirmModal/confirmModal';
import { useUser } from '@/hooks';

const formSchema = z.object({
  phone: z.string().min(11, 'Phone number is  required'),
  utilityType: z.string().min(3, 'Select network'),
  email: z.string().min(3, 'Email is required'),
  amount: z.string().min(3, 'Amount is required'),
});

type FormData = z.infer<typeof formSchema>;

const Airtime = () => {
  const queryClient = useQueryClient();
  const { data: user } = useUser(true);
  const userEmail = user?.profile?.userId?.email;

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const [data, setData] = useState<FormData>({
    phone: '',
    email: '',
    amount: '',
    utilityType: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(selectedImage === image ? null : image);
    setData((prevData) => ({ ...prevData, utilityType: image }));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: payUtiliies,

    onSuccess: (data: unknown) => {
      const authorization_url =
        (data as { authorization_url?: string })?.authorization_url ||
        (data as { data?: { authorization_url?: string } })?.data
          ?.authorization_url;

      if (authorization_url) {
        // Store the token in localStorage
        localStorage.setItem('authorization_url', authorization_url);

        queryClient.invalidateQueries({
          queryKey: [QUERIES.USERPROFILE],
        });
      } else {
        setToastMessage({
          message: 'Error',
          type: 'error',
        });
      }
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

    const parsedData = formSchema.safeParse(data);

    if (!parsedData.success) {
      const fieldErrors: { [key: string]: string } = {};
      parsedData.error.errors.forEach((error) => {
        if (error.path[0]) {
          fieldErrors[error.path[0]] = error.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    openModal();
    // mutate(parsedData.data);
  };

  const handlePayment = () => {
    const authorization_url = localStorage.getItem('authorization_url');
    // window.location.href = authorization_url as string;
  };

  useEffect(() => {
    if (userEmail) {
      setData((prevData) => ({ ...prevData, email: userEmail }));
    }
  }, [userEmail]);

  return (
    <div className='py-5 px-5 h-screen'>
      <div className='flex justify-center items-center gap-4 mb-5'>
        <div className='absolute left-4'>
          <BackIcon />
        </div>
        <h2 className='text-xl font-bold text-[green] text-center '>
          e-Recharge <span style={{ color: '#485696' }}>Airtime</span>
        </h2>
      </div>

      <form className='w-full md:w-[50%] m-auto' onSubmit={handleSubmit}>
        <p className='font-semibold text-[#000000] mb-3'>
          Select Mobile Operator
        </p>
        <div className=' md:block mt-4'>
          <div className='grid grid-cols-4 gap-6 items-center'>
            {[
              { img: MNineMobile, label: '9mobile' },
              { img: Airtel, label: 'airtel' },
              { img: MTN, label: 'mtn' },
              { img: Glo, label: 'glo' },
            ].map(({ img, label }) => (
              <div key={label} className='relative'>
                <img
                  src={img.src}
                  alt={label}
                  width={300}
                  className='cursor-pointer rounded-lg'
                  onClick={() => handleImageClick(label)}
                />
                {selectedImage === label && (
                  <input
                    type='checkbox'
                    checked
                    className='absolute top-1 left-1'
                    readOnly
                  />
                )}
              </div>
            ))}
          </div>
          {errors.utilityType && (
            <p className='text-red-500 text-[13px]'>{errors.utilityType}</p>
          )}
        </div>

        <p className='mt-6 font-semibold'>Mobile Number</p>
        <Input
          type='text'
          name='phone'
          placeholder='Mobile number'
          value={data.phone}
          onChange={handleChange}
        />
        {errors.phone && (
          <p className='text-red-500 text-[13px]'>{errors.phone}</p>
        )}

        <p className='mt-4 font-semibold'>Amount</p>
        <Input
          type='text'
          name='amount'
          placeholder='Amount'
          value={data.amount}
          onChange={handleChange}
        />
        {errors.amount && (
          <p className='text-red-500 text-[13px]'>{errors.amount}</p>
        )}

        <p className='mt-4 font-semibold'>Email</p>
        <Input
          type='email'
          name='email'
          placeholder='Email'
          value={userEmail ?? ''}
          // onChange={handleChange}
          readOnly={true}
        />

        <Button
          title={isPending ? 'Continue...' : 'Continue'}
          disabled={isPending}
          className='bg-[#485696] w-full mt-5'
          type='submit'
          // isPending={isPending}
        />
      </form>
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        network={data.utilityType}
        email={userEmail}
        phone={data.phone}
        amount={data.amount}
        isPending={isPending}
      />
    </div>
  );
};

export default Airtime;
