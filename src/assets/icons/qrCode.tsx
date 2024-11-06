import React from 'react';

const QRCODE = () => {
  return (
    <svg
      className='w-6 h-6 text-gray-800 dark:text-white'
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 4h6v6H4V4Zm10 10h6v6h-6v-6Zm0-10h6v6h-6V4Zm-4 10h.01v.01H10V14Zm0 4h.01v.01H10V18Zm-3 2h.01v.01H7V20Zm0-4h.01v.01H7V16Zm-3 2h.01v.01H4V18Zm0-4h.01v.01H4V14Z'
      />
      <path
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M7 7h.01v.01H7V7Zm10 10h.01v.01H17V17Z'
      />
    </svg>
  );
};

export default QRCODE;
