'use client';
import React, { useEffect } from 'react';
import { useUser } from '@/hooks';
import BackIcon from '@/assets/icons/backIcon';

const MonthlyExpenseTable = () => {
  const { data, isLoading, isError } = useUser(true);

  console.log('dataaaa', data);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log('Fetched data:', data);
    }
  }, [data, isLoading, isError]);

  return (
    <>
      <div className='flex gap-3 mt-5 items-center px-2'>
        <BackIcon />
        <h2>back</h2>
      </div>
      <div className='  overflow-x-auto mt-4 md:mt-0 p-0 md:p-4'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              {/* <th className='py-2 px-4 border-b text-left'>S/N</th> */}
              <th className='py-2 px-4 border-b text-left'>Amount</th>
              <th className='py-2 px-4 border-b text-left'>Type</th>
              {/* <th className='py-2 px-4 border-b text-left'>Description</th> */}
              <th className='py-2 px-4 border-b text-left '>Reference</th>
              <th className='py-2 px-4 border-b text-left '>Status</th>
              {/* Hide Date on mobile, show on medium screens and larger */}
              <th className='py-2 px-4 border-b text-left '>Date</th>
            </tr>
          </thead>
          <tbody>
            {data?.profile?.payments && data.profile.payments.length > 0 ? (
              data.profile.payments.map((item) => (
                <tr
                  key={item.transactionReference}
                  className='hover:bg-gray-100'
                >
                  <td className='py-2 px-4 border-b'>{item.amount / 100}</td>

                  <td className='py-2 px-4 border-b'>{item.channel}</td>
                  <td className='py-2 px-4 border-b'>
                    {item.transactionReference}
                  </td>
                  <td className='py-2 px-4 border-b'>{item.status}</td>

                  <td className='py-2 px-4 border-b'>
                    {item.paymentDate
                      ? new Date(item.paymentDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='text-center py-4'>
                  No payments available fund your account
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlyExpenseTable;
