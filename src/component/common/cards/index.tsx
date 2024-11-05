import Link from 'next/link';
import React from 'react';

interface Props {
  img: string; // Updated type to string for image source
  title: string;
  description: string;
  bottomText: string;
  className?: string;
  isBottomTextDisabled?: boolean;
  imgAlt?: string; // New optional prop for the image alt text
}

const Cards = ({
  img,
  title,
  description,
  bottomText,
  className = '',
  isBottomTextDisabled = false,
  imgAlt = 'Image', // Default alt text
}: Props) => {
  return (
    <div
      className={`h-full rounded-b-3xl bg-[#EBEEF1] w-[221px] pb-4 ${className}`}
    >
      <img src={img} alt={imgAlt} className='w-full h-auto' />
      <div className='text-center px-[27px]'>
        <h2 className='font-bold'>{title}</h2>
        <p className='text-[16px] my-2'>{description}</p>
        {isBottomTextDisabled ? (
          <h4 className='font-bold text-[20px] text-gray-400 cursor-not-allowed opacity-50'>
            {bottomText}
          </h4>
        ) : (
          <Link href='/login'>
            <h4 className='font-bold text-[20px] text-[#485696] cursor-pointer'>
              {bottomText}
            </h4>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cards;
