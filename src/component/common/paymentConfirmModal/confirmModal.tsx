'use client';

import { useState } from 'react';
import Button from '../button';
import SuccessModal from '../successModal';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  network?: string;
  email?: string;
  phone?: string;
  amount?: string;
  isPending?: boolean;
}

const ConfirmModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  network,
  email,
  phone,
  amount,
  isPending,
}) => {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const openSuccessModal = () => setIsSuccessModalOpen(true);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const handleBuyAirtime = () => {
    // Simulate buy airtime logic here, handle success or failure
    openSuccessModal();
  };

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
              aria-label='Close'
            >
              ✕
            </button>
          </div>
          <div className='mt-7 flex justify-between'>
            <span className='font-normal'>Network</span>
            <span className='font-semibold capitalize'>{network}</span>
          </div>
          <hr className='mt-3' />
          <div className='mt-4 flex justify-between'>
            <span className='font-normal'>Phone number</span>
            <span className='font-semibold'>{phone}</span>
          </div>
          <hr className='mt-3' />
          <div className='mt-4 flex justify-between'>
            <span className='font-normal'>Amount</span>
            <span className='font-semibold'>{amount}</span>
          </div>
          <hr className='mt-3' />
          <div className='mt-4 flex justify-between'>
            <span className='font-normal'>Email</span>
            <span className='font-semibold'>{email}</span>
          </div>
          <Button
            title={isPending ? 'Processing...' : 'Buy'}
            disabled={isPending}
            className='bg-[#485696] w-full mt-8'
            type='button'
            onClick={handleBuyAirtime}
          />
        </div>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={closeSuccessModal}
        amount={amount}
        network={network}
        phone={phone}
      />
    </>
  );
};

export default ConfirmModal;
