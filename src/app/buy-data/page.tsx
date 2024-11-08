'use client';

import Button from '@/component/common/button';
import Input from '@/component/common/input';
import MTN from '../../assets/airtime/mtn big.webp';
import Airtel from '../../assets/airtime/airtelbig.jpg';
import MNineMobile from '../../assets/airtime/9mobile-logo.jpg';
import Glo from '../../assets/airtime/globig.jpg';
import NinePhone from '../../assets/airtime/9mobile.png';
import MTNPhone from '../../assets/airtime/images.png';
import AirtelPhone from '../../assets/airtime/airtel.png';
import GloPhone from '../../assets/airtime/GloMobile.jpg';
import { useState } from 'react';
// import { useRouter } from 'next/router';

const BuyData = () => {
  // State to track the selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dataPlan, setDataPlan] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleImageClick = (image: string) => {
    // Toggle checkbox when a new image is clicked
    setSelectedImage(selectedImage === image ? null : image);
  };

  return (
    <div className='py-5 px-5  h-screen'>
      <h2 className='text-xl font-bold text-[green] text-center mb-5'>
        e-Recharge <span style={{ color: '#485696' }}>Airtime</span>
      </h2>
      <form className='w-full md:w-[50%] m-auto'>
        <p className='font-semibold text-[#000000] mb-3'>
          Select Mobile Operation
        </p>
        <div className='hidden md:block mt-4'>
          <div className='grid grid-cols-4 justify-between gap-6 items-center m-auto w-full'>
            <div className='relative'>
              <img
                src={MNineMobile.src}
                alt='mtn'
                width={300}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('9mobile')}
              />
              {selectedImage === '9mobile' && (
                <input
                  type='checkbox'
                  checked={selectedImage === '9mobile'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={Airtel.src}
                alt='airtel'
                width={300}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('airtel')}
              />
              {selectedImage === 'airtel' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'airtel'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={MTN.src}
                alt='mtn'
                width={270}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('mtn')}
              />
              {selectedImage === 'mtn' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'mtn'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={Glo.src}
                alt='glo'
                width={300}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('glo')}
              />
              {selectedImage === 'glo' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'glo'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>
          </div>
        </div>

        <div className='block md:hidden'>
          <div className='grid grid-cols-4 justify-between gap-4 items-center m-auto w-full'>
            <div className='relative'>
              <img
                src={NinePhone.src}
                alt='9mobile'
                width={130}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('9mobile')}
              />
              {selectedImage === '9mobile' && (
                <input
                  type='checkbox'
                  checked={selectedImage === '9mobile'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={AirtelPhone.src}
                alt='airtel'
                width={130}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('airtel')}
              />
              {selectedImage === 'airtel' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'airtel'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={MTNPhone.src}
                alt='mtn'
                width={130}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('mtn')}
              />
              {selectedImage === 'mtn' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'mtn'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>

            <div className='relative'>
              <img
                src={GloPhone.src}
                alt='glo'
                width={130}
                className='cursor-pointer rounded-lg'
                onClick={() => handleImageClick('glo')}
              />
              {selectedImage === 'glo' && (
                <input
                  type='checkbox'
                  checked={selectedImage === 'glo'}
                  className='absolute top-1 left-1'
                  readOnly
                />
              )}
            </div>
          </div>
        </div>

        <p className='mt-6 font-semibold'>Data Plan</p>
        <Input
          type={'text'}
          placeholder={'Mobile number'}
          value={dataPlan}
          onChange={(e) => {
            setDataPlan(e.target.value);
          }}
        />

        <p className='mt-4 font-semibold'>Phone Number</p>
        <Input
          type={'text'}
          placeholder={'Phone number'}
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''));
          }}
        />
        <Button
          title={'Continue'}
          className={'bg-[#485696] w-full mt-5'}
          type={'submit'}
        />
      </form>
    </div>
  );
};

export default BuyData;
