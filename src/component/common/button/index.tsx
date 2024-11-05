import React from 'react';

interface Props {
  title: string;
  className: any;
  type?: any;
}

const Button = ({ title, className, type }: Props) => {
  return (
    <button
      type={type}
      className={`h-11 rounded-lg text-[#ffffff] px-4 ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;
