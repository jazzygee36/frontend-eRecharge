'use client';
import Phone from '@/assets/icons/phone';
import QRCODE from '@/assets/icons/qrCode';
import Settings from '@/assets/icons/settings';
import Card from '@/assets/icons/card';
import ThankYou from '../../assets/thank-you.webp';
import Link from 'next/link';

const QuickLinks = () => {
  return (
    <div className='block md:hidden mt-5'>
      <div className='flex justify-between items-start py-2 px-3 mt-5  bg-[#4C3B4D] text-white '>
        <h4 className='font-medium text-[16px]'>eaZyLinks</h4>
        <h4 className='font-medium text-[16px] cursor-pointer'>History</h4>
      </div>
      <div className='flex justify-between  m-auto items-center w-[90%]  align-middle mt-4'>
        <div className='flex flex-col gap-1 justify-center items-center'>
          <Settings />

          <p>Settings</p>
          <p className='text-[red] text-[8px] -mt-2 '>Coming soon</p>
        </div>
        <Link href='/airtime'>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <Phone />
            <p>Airtime</p>
          </div>
        </Link>
        <Link href='/buy-data'>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <QRCODE />
            <p>Data</p>
          </div>{' '}
        </Link>
        <Link href='/buy-electricity'>
          <div className='flex flex-col gap-1 justify-center items-center'>
            <Card />
            <p>Electricity</p>
          </div>
        </Link>
      </div>
      <hr className='mt-5 mb-5' />
      <div className='flex justify-between  m-auto items-center w-[90%]  align-middle mt-6'>
        <div className='flex flex-col gap-1 justify-center items-center'>
          <QRCODE />
          <p>QR Payment</p>
          <p className='text-[red] text-[8px] -mt-2 '>Coming soon</p>
        </div>{' '}
        <div className='flex flex-col gap-1 justify-center items-center'>
          <Card />
          <p>Cable Tv</p>
          <p className='text-[red] text-[8px] -mt-2 '>Coming soon</p>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
          <Phone />
          <p>Profile</p>
          <p className='text-[red] text-[8px] -mt-2 '>Coming soon</p>
        </div>
        <div className='flex flex-col gap-1 justify-center items-center'>
          <Settings />
          <p>Settings</p>
          <p className='text-[red] text-[8px] -mt-2 '>Coming soon</p>
        </div>
      </div>
      <hr className='mt-5 mb-5' />
      <img src={ThankYou.src} alt='than you' className='mt-5' />{' '}
    </div>
  );
};

export default QuickLinks;
