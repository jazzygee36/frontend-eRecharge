'use client';
import { useEffect, useState } from 'react';
import Button from '../common/button';
import Input from '../common/input';
import Toast from '../common/toast/toast';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FundModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<number>(0);
  const [showPaystack, setShowPaystack] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();

    if (amount > 500) {
      onClose();
      setShowPaystack(true); // Only show Paystack if amount is valid
    } else {
      setIsToastVisible(true);
    }
  };

  // Update this to extract reference from the object
  const handlePaystackSuccessAction = async (data: { reference: string }) => {
    const reference = data.reference; // Extract reference from the object
    console.log('Paystack callback triggered', reference);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/verify-payment',
        {
          amount,
          reference, // Send the reference directly to the API
        }
      );
      console.log(
        'Payment recorded successfully',
        response.data,
        'Payment recorded '
      );
      // onClose();
    } catch (error) {
      console.log('Error recording payment:', error);
    }
  };

  const handlePaystackCloseAction = () => {
    console.log('closed'); // Handle Paystack dialog close
  };

  const loadPaystackScript = () => {
    if (window.PaystackPop) {
      try {
        const handler = window.PaystackPop.setup({
          key: 'pk_test_bb303c70de3d313ccf557c37b226540818e7fc03',
          email: 'user@example.com',
          amount: amount * 100,
          ref: new Date().getTime().toString(),
          callback: (data: { reference: string }) =>
            handlePaystackSuccessAction(data), // Pass the object to the callback
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

    script.onload = () => {
      console.log('Paystack script loaded successfully');
    };

    script.onerror = () => {
      console.log('Error loading Paystack script');
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (showPaystack) {
      loadPaystackScript(); // Load Paystack script and show the payment modal
    }
  }, [showPaystack]);

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='relative w-[90%] max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg'>
          <div className='flex justify-between items-center'>
            <h1 className='font-bold'>Fund Wallet</h1>
            <button
              className='text-gray-400 hover:text-gray-600'
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <div className='mt-4'>
            <form onSubmit={handleContinue}>
              <Input
                type='number'
                placeholder='Amount'
                value={amount.toString()}
                onChange={handleAmountChange}
              />
              <Button
                title='Continue'
                className='bg-[#485696] w-full mt-4 text-white'
                type={'submit'}
              />
            </form>
          </div>
        </div>
      </div>
      {isToastVisible && (
        <Toast
          message={'Amount cannot be less than 1000'}
          type='error' // You can change this to success, info, etc.
          onClose={() => setIsToastVisible(false)}
        />
      )}
    </>
  );
};

export default FundModal;
