import React from 'react';
import Image from '../../assets/online.webp';
import Button from '../common/button';
import Link from 'next/link';

const WelcomeSection = () => {
  return (
    <div
      className={`w-full h-full py-11 px-5 text-center md:text-left md:px-20 bg-[#61C9A8] grid grid-cols-1 md:grid-cols-2 items-center align-middle`}
    >
      <div className='m-auto'>
        <h3 className='font-bold text-[32px] text-[#ffffff] mb-8'>
          Welcome to E-Recharge
        </h3>
        <p className='font-bold text-[16px] text-[#ffffff]'>
          All in one solution for your Telecom needs
        </p>
        <p className='font-bold text-[16px] text-[#ffffff]'>
          Our mission is to deliver best service in the quickest amount of time.
        </p>
        <Link href='/register'>
          <Button
            title={'Register with Us'}
            className={'bg-[#485696] mt-4 hover:bg-[green]'}
            type={'submit'}
          />
        </Link>
      </div>
      <div className='  hidden md:block m-auto'>
        <img
          src={Image.src}
          alt='logo'
          width={250}
          style={{ borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default WelcomeSection;
