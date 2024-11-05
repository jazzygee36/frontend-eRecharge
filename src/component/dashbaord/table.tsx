'use client';
import React from 'react';

const MonthlyExpenseTable = () => {
  const data = [
    {
      id: 1,
      amount: 'John Doe',
      type: 28,
      description: 'john@example.com',
      reference: 'john@example.com',
      date: '2024-01-01',
    },
    {
      id: 2,
      amount: 'Jane Smith',
      type: 34,
      description: 'jane@example.com',
      reference: 'jane@example.com',
      date: '2024-02-01',
    },
    {
      id: 3,
      amount: 'Alice Johnson',
      type: 22,
      description: 'alice@example.com',
      reference: 'alice@example.com',
      date: '2024-03-01',
    },
    {
      id: 4,
      amount: 'Bob Brown',
      type: 45,
      description: 'bob@example.com',
      reference: 'bob@example.com',
      date: '2024-04-01',
    },
  ];

  return (
    <>
      <div className='hidden overflow-x-auto mt-4 md:mt-0 p-0 md:p-4'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4 border-b text-left'>S/N</th>
              <th className='py-2 px-4 border-b text-left'>Amount</th>
              <th className='py-2 px-4 border-b text-left'>Type</th>
              <th className='py-2 px-4 border-b text-left'>Description</th>
              <th className='py-2 px-4 border-b text-left '>Reference</th>
              {/* Hide Date on mobile, show on medium screens and larger */}
              <th className='py-2 px-4 border-b text-left hidden sm:block'>
                Date
              </th>
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
