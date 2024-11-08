'use client';

import Link from 'next/link';

import './style.css'; // Import CSS for styling

const Header: React.FC = () => {
  return (
    <div className={'flex justify-between items-center px-4 md:px-10'}>
      <h2 className='text-[20px] font-bold text-center '>
        <span style={{ color: 'green', fontWeight: 700 }}>e-Recharge</span>
      </h2>
      <Link href='/login'>
        <button
          className={'bg-transparent text-[#485696] cursor-pointer font-bold'}
          type={'button'}
        >
          Login
        </button>
      </Link>
    </div>
  );
};

export default Header;
