'use client';
import { useEffect, useState } from 'react';
import Button from '../common/button';
import Input from '../common/input';
import Toast from '../common/toast/toast';
import axios from 'axios';
import { useUser } from '@/hooks';
import { QUERIES } from '@/utils';
import { useQueryClient, } from '@tanstack/react-query';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const queryKey: string[] | [] | number| any = [QUERIES.ME];
  const queryClient = useQueryClient();
  const { data, refetch } = useUser(true); // Refetch to get latest data if needed
  const userEmail = data?.profile?.email;

  const [amount, setAmount] = useState('');
  const [showPaystack, setShowPaystack] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(amount) > 500) {
      onClose();
      setShowPaystack(true);
    } else {
      setIsToastVisible(true);
    }
  };

  const handlePaystackSuccessAction = async (data: { reference: string }) => {
    setLoading(true); // Start loading when payment verification begins
    const reference = data.reference;
    try {
      await axios.post(`https://etransact.vercel.app/api/verify-payment`, { reference });
      await queryClient.invalidateQueries(queryKey); // Refresh user data
      setPaymentSuccess(true); // Show success toast
      setLoading(false); // Stop loading
    } catch (error) {
      console.log('Error recording payment:', error);
      setLoading(false); // Stop loading on error
    }
  };

  const handlePaystackCloseAction = () => {
    console.log('closed');
  };

  const loadPaystackScript = () => {
    if (window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup({
          key: 'pk_test_bb303c70de3d313ccf557c37b226540818e7fc03',
          email: userEmail,
          amount: parseFloat(amount) * 100,
          ref: new Date().getTime().toString(),
          callback: (data: { reference: string }) => handlePaystackSuccessAction(data),
          onClose: handlePaystackCloseAction,
        });
        handler.openIframe();
      } catch (error) {
        console.log('Error initializing Paystack:', error);
      }
    } else {
      console.log('Paystack script is not loaded.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.async = true;

    script.onload = () => console.log('Paystack script loaded successfully');
    script.onerror = () => console.log('Error loading Paystack script');

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showPaystack) {
      loadPaystackScript();
    }
  }, [showPaystack]);

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-[90%] max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Fund Wallet</h1>
            <button className='text-gray-400 hover:text-gray-600' onClick={onClose}>✕</button>
          </div>
          <div className='mt-4'>
            <form onSubmit={handleContinue}>
              <Input type='number' placeholder='Amount' value={amount} onChange={handleAmountChange} />
              <Button
                title={loading ? 'Processing...' : 'Continue'}
                className={`bg-[#485696] w-full mt-4 text-white`}
                type='submit'
                disabled={loading} // Disable button during loading
              />
            </form>
          </div>
        </div>
      </div>
      {isToastVisible && (
        <Toast message='Amount cannot be less than 1000' type='error' onClose={() => setIsToastVisible(false)} />
      )}
      {paymentSuccess && (
        <Toast message='Payment successful!' type='success' onClose={() => setPaymentSuccess(false)} />
      )}
    </>
  );
};

export default FundModal;
