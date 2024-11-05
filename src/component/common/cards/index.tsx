import Link from 'next/link';
import React from 'react';

interface Props {
  img: any;
  title: string;
  description: string;
  bottomText: string;
  className?: any;
  isBottomTextDisabled?: boolean; // New prop to control disabled state
}

const Cards = ({
  img,
  title,
  description,
  bottomText,
  className,
  isBottomTextDisabled = false,
}: Props) => {
  return (
    <div className=' h-full rounded-b-3xl bg-[#EBEEF1] w-[221px] pb-4'>
      <img src={img} alt='img' />
      <div className=' text-center px-[27px]'>
        <h2 className={`font-bold`}>{title}</h2>
        <p className=' text-[16px] my-2'>{description}</p>
        <Link href={'/login'}>
          <h4
            className={`font-bold text-[20px] ${
              isBottomTextDisabled
                ? 'text-gray-400 cursor-not-allowed opacity-50'
                : 'text-[#485696] cursor-pointer'
            }`}
          >
            {bottomText}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
