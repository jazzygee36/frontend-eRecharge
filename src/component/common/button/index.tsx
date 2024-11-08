import React from 'react';

interface Props {
  title: string;
  className: string;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ title, className, type, onClick, disabled }: Props) => {
  return (
    <button
      type={type}
      className={`h-11 rounded-lg text-[#ffffff] px-4 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
