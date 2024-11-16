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
  if (!isOpen) return null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleBuyAirtime = () => {
    // closeConfirmModal();
    openModal();
  };

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
            <div className='font-normal'>Network</div>
            <div className='font-semibold capitalize'>{network}</div>
          </div>
          <hr className='mt-3' />
          <div className='mt-4 flex justify-between'>
            <div className='font-normal'>Phone number</div>
            <div className='font-semibold'>{phone}</div>
          </div>
          <hr className='mt-3' />

          <div className='mt-4 flex justify-between'>
            <div className='font-normal'>Amount</div>
            <div className=' font-semibold'>{amount}</div>
          </div>
          <hr className='mt-3' />

          <div className='mt-4 flex justify-between'>
            <div className='font-normal'>Email</div>
            <div className='font-semibold'>{email}</div>
          </div>

          <Button
            // title={'Pay'}
            title={isPending ? 'Buy...' : 'Buy'}
            disabled={isPending}
            className={'bg-[#485696] w-full mt-8'}
            type={'button'}
            onClick={handleBuyAirtime}
          />
        </div>
      </div>
      <SuccessModal
        isOpen={isModalOpen}
        onClose={closeModal}
        amount={amount}
        network={network}
        phone={phone}
      />
    </>
  );
};

export default ConfirmModal;
