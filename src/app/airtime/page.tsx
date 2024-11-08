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
// import { useRouter } from 'next/router';

const Airtime = () => {
  // const router = useRouter();
  return (
    <div className='py-5 px-5  h-screen'>
      <h2 className='text-xl font-bold text-[green] text-center mb-5'>
        e-Recharge <span style={{ color: '#485696' }}>Airtime</span>
      </h2>
      {/* <div className='' onClick={() => router.back}>
        Back
      </div> */}
      <form className='w-full md:w-[50%] m-auto'>
        <p className='font-semibold text-[#000000] mb-3'>
          Select Mobile Operation
        </p>
        <div className='  hidden md:block mt-4'>
          <div className='grid grid-cols-4 justify-between gap-6  items-center m-auto w-full'>
            <img
              src={MNineMobile.src}
              alt='mtn'
              width={300}
              className='cursor-pointer rounded-md'
            />

            <img
              src={Airtel.src}
              alt='mtn'
              width={300}
              className='cursor-pointer'
            />
            <img
              src={MTN.src}
              alt='mtn'
              width={270}
              className='cursor-pointer'
            />

            <img
              src={Glo.src}
              alt='mtn'
              width={300}
              className='cursor-pointer'
            />
          </div>
        </div>
        <div className='  block md:hidden'>
          <div className='grid grid-cols-4 justify-between  gap-4 items-center m-auto w-full'>
            <img
              src={NinePhone.src}
              alt='mtn'
              width={150}
              className='cursor-pointer'
            />

            <img
              src={AirtelPhone.src}
              alt='mtn'
              width={150}
              className='cursor-pointer'
            />
            <img
              src={MTNPhone.src}
              alt='mtn'
              width={150}
              className='cursor-pointer'
            />

            <img
              src={GloPhone.src}
              alt='mtn'
              width={150}
              className='cursor-pointer'
            />
          </div>
        </div>
        <p className='mt-6 font-semibold'>Mobile Number</p>
        <Input
          type={'text'}
          placeholder={'Mobile number'}
          value={''}
          onChange={() => {}}
        />

        <p className='mt-4 font-semibold'>Amount</p>
        <Input
          type={'text'}
          placeholder={'Amount'}
          value={''}
          onChange={() => {}}
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

export default Airtime;
