import React, { useEffect, useState } from 'react';
import { useUser } from '@/hooks';
import BackIcon from '@/assets/icons/backIcon';

interface Payment {
  transactionReference: string;
  amount: number;
  channel: string;
  status: string;
  paymentDate?: string; // Optional if it may be undefined
}

const ITEMS_PER_PAGE = 10; // Number of rows per page

const MonthlyExpenseTable = () => {
  const { data, isLoading, isError } = useUser(true);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [paginatedData, setPaginatedData] = useState<Payment[]>([]); // Explicitly typed state

  useEffect(() => {
    if (!isLoading && !isError && data?.profile?.payments) {
      // Paginate data
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      setPaginatedData(data.profile.payments.slice(startIndex, endIndex));
    }
  }, [data, isLoading, isError, currentPage]);

  const totalPages = Math.ceil(
    (data?.profile?.payments?.length || 0) / ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className='px-3'>
      <div className='flex mt-5 mb-5 items-center justify-between'>
        <div className='flex gap-2'>
          <BackIcon />
          <h2>Back</h2>
        </div>
        <h2 className='font-bold'>Transaction History</h2>
      </div>
      <div className='overflow-x-auto mt-4 md:mt-0 p-0 md:p-4'>
        <table className='min-w-full bg-white border border-gray-300'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='py-2 px-4 border-b text-left'>Amount</th>
              <th className='py-2 px-4 border-b text-left'>Type</th>
              <th className='py-2 px-4 border-b text-left'>Reference</th>
              <th className='py-2 px-4 border-b text-left'>Status</th>
              <th className='py-2 px-4 border-b text-left'>Date</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr
                  key={item.transactionReference}
                  className='hover:bg-gray-100'
                >
                  <td className='py-2 px-4 border-b'>{item.amount / 100}</td>
                  <td className='py-2 px-4 border-b'>{item.channel}</td>
                  <td className='py-2 px-4 border-b'>
                    {item.transactionReference}
                  </td>
                  <td className='py-2 px-4 border-b text-[green]'>
                    {item.status}
                  </td>
                  <td className='py-2 px-4 border-b'>
                    {item.paymentDate
                      ? new Date(item.paymentDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className='text-center py-10'>
                  No payments available. Fund your account.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination Controls */}
        <div className='flex justify-between items-center mt-4'>
          <button
            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className='px-4 py-2 bg-gray-200 rounded disabled:opacity-50'
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MonthlyExpenseTable;
