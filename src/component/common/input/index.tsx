'use client';
import React from 'react';

interface Props {
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string; // Optional name prop
  className?: string; // Optional custom class for styling
  readOnly?: boolean;
}

const Input = ({
  type,
  placeholder,
  value,
  onChange,
  name,
  className,
  readOnly,
  ...rest
}: Props) => {
  return (
    <div className='py-4 m-auto'>
      <input
        type={type}
        name={name} // Attach name prop if provided
        placeholder={placeholder}
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        className={`h-11 w-full outline-none rounded-lg border border-[grey] px-3 ${className}`}
        {...rest} // Spread additional props
      />
    </div>
  );
};

export default Input;
