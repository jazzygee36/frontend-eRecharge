import React from 'react';
import { PaystackButton } from 'react-paystack';

interface Props {
  email: string;
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}

const PaystackPayment = ({ amount, email, onSuccess, onClose }: Props) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: 'user@example.com',
    amount: 20000,
    publicKey: 'pk_test_bb303c70de3d313ccf557c37b226540818e7fc03',
    firstname: 'cool',
    lastname: 'story',
    /*split: { //if you want to use transaction split
              "type": "percentage",
              "bearer_type": "all",
              "subaccounts": [
                  {
                      "subaccount": "ACCT_mtl3xzwjfhcldkw",
                      "share": 30
                  },
                  {
                      "subaccount": "ACCT_y19ht107y44o294",
                      "share": 20
                  }
              ]
          }*/
  };

  return (
    <div>
      <PaystackButton
        className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
        {...config}
      />
    </div>
  );
};

export default PaystackPayment;
