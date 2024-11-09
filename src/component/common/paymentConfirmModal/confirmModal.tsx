'use client';

import Button from '../button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClick?: () => void;
  network?: string;
  email?: string;
  phone?: string;
  amount?: string;
  isPending?: boolean;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onClick,
  network,
  email,
  phone,
  amount,
  isPending,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-[90%] max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold text-[18px]'>Confirm Transaction</h1>
            <button
              className='text-gray-400 hover:text-gray-600'
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className='mt-7 flex justify-between'>
            <div className='font-semibold'>Network</div>
            <div className='font-normal capitalize'>{network}</div>
          </div>
          <hr className='mt-3' />
          <div className='mt-4 flex justify-between'>
            <div className='font-semibold'>Phone number</div>
            <div className='font-normal'>{phone}</div>
          </div>
          <hr className='mt-3' />

          <div className='mt-4 flex justify-between'>
            <div className='font-semibold'>Amount</div>
            <div className='font-normal'>{amount}</div>
          </div>
          <hr className='mt-3' />

          <div className='mt-4 flex justify-between'>
            <div className='font-semibold'>Email</div>
            <div className='font-normal'>{email}</div>
          </div>

          <Button
            // title={'Pay'}
            title={isPending ? 'Pay...' : 'Pay'}
            disabled={isPending}
            className={'bg-[#485696] w-full mt-8'}
            type={'button'}
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
