'use client';

import SuccessIcon from '@/assets/icons/successIcon';
import Button from '../button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount?: string;
  network?: string;
  phone?: string;
}

const SuccessModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  amount,
  network,
  phone,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-[90%] max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-[18px]'></h1>
            <button
              className='text-gray-400 hover:text-gray-600'
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <div className='flex flex-col justify-center'>
            <div className='w-12 h-12 rounded-full bg-[green] m-auto mb-4 flex items-center'>
              <SuccessIcon />
            </div>
            <h1 className='text-center text-[25px] font-semibold mb-4'>
              Success
            </h1>

            <p className='text-center text-[20px] font-normal'>
              {' '}
              {amount} <span className='capitalize'>{network}</span> card has
              been sent to <strong>{phone}</strong>
            </p>

            <Button
              title={'Ok'}
              className={'w-full bg-[green] mt-5 mb-3'}
              type={'button'}
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;
