'use client';
import React from 'react';

const MonthlyExpenseTable = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
    { id: 3, name: 'Alice Johnson', age: 22, email: 'alice@example.com' },
    { id: 4, name: 'Bob Brown', age: 45, email: 'bob@example.com' },
  ];

  return (
    <>
      <div className='overflow-x-auto  mt-4 md:mt-0 p-0 md:p-4'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4 border-b text-left'>S/N</th>
              <th className='py-2 px-4 border-b text-left'>Amount</th>
              <th className='py-2 px-4 border-b text-left'>Type</th>
              <th className='py-2 px-4 border-b text-left'>Description</th>
              <th className='py-2 px-4 border-b text-left '>Reference</th>
              <th className='py-2 px-4 border-b text-left hidden md:block'>
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className='hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{item.id}</td>
                <td className='py-2 px-4 border-b'>{item.name}</td>
                <td className='py-2 px-4 border-b'>{item.age}</td>
                <td className='py-2 px-4 border-b'>{item.email}</td>
                <td className='py-2 px-4 border-b '>{item.email}</td>
                <td className='py-2 px-4 border-b hidden md:block'>
                  {item.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MonthlyExpenseTable;
