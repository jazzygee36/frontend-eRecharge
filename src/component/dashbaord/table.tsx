'use client';
import React from 'react';

const MonthlyExpenseTable = () => {
  const data = [
    {
      id: 1,
      amount: 'John Doe',
      type: 'Cable tv',
      description: 'recharge',
      reference: 'com',
      date: '2024-01-01',
    },
    {
      id: 2,
      amount: 'Jane Smith',
      type: 'Rechard card',
      description: 'For my mobil',
      reference: 'jane@example',
      date: '2024-02-01',
    },
    {
      id: 3,
      amount: 'Alice Johnson',
      type: 'income',
      description: 'Gotv',
      reference: 'alice@example',
      date: '2024-03-01',
    },
    {
      id: 4,
      amount: 'Bob Brown',
      type: 'Income',
      description: 'Someone',
      reference: 'bob@example',
      date: '2024-04-01',
    },
  ];

  return (
    <>
      <div className=' hidden md:block overflow-x-auto mt-4 md:mt-0 p-0 md:p-4'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4 border-b text-left'>S/N</th>
              <th className='py-2 px-4 border-b text-left'>Amount</th>
              <th className='py-2 px-4 border-b text-left'>Type</th>
              <th className='py-2 px-4 border-b text-left'>Description</th>
              <th className='py-2 px-4 border-b text-left '>Reference</th>
              {/* Hide Date on mobile, show on medium screens and larger */}
              <th className='py-2 px-4 border-b text-left '>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className='hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{item.id}</td>
                <td className='py-2 px-4 border-b'>{item.amount}</td>
                <td className='py-2 px-4 border-b '>{item.type}</td>
                <td className='py-2 px-4 border-b'>{item.description}</td>
                <td className='py-2 px-4 border-b'>{item.reference}</td>
                {/* Hide Date on mobile, show on medium screens and larger */}
                <td className='py-2 px-4 border-b'>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlyExpenseTable;
