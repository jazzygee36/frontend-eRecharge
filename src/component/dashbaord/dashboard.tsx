import React, { useState } from 'react';

const MainDashboard = () => {
  // State to manage the toggle of the switch
  const [isToggledWallet, setIsToggledWallet] = useState(false);
  const [isToggledExpense, setIsToggledExpense] = useState(false);
  const [walletBalance, setWalletBalance] = useState(false);
  const [monthlyExpenseBalance, setMonthlyExpenseBalance] = useState(false);

  // Function to handle toggle change
  const handleToggleWallet = () => {
    setIsToggledWallet((prev) => !prev);
  };
  const handleToggleExpense = () => {
    setIsToggledExpense((prev) => !prev);
  };

  const toggleToSeeWalletBalance = () => {
    setWalletBalance(!walletBalance);
  };
  const toggleToSeeMonthlyBalance = () => {
    setMonthlyExpenseBalance(!monthlyExpenseBalance);
  };
  return (
    <div>
      <h2 className='text-2xl font-bold text-left'>Welcome</h2>

      <div className='flex flex-col md:flex-row gap-4 justify-center items-center mt-4'>
        {/* Wallet Balance Box */}
        <div className='shadow-lg bg-[#61C9A8] p-6 rounded-lg w-full md:w-1/2 text-center'>
          <h2 className='text-xl font-bold text-white'>Wallet Balance</h2>
          {walletBalance ? (
            <p className='text-2xl font-semibold mt-2 text-white'>N0.00</p>
          ) : (
            <p className='text-2xl font-semibold mt-2 text-white'>******</p>
          )}
          <div className='flex justify-between items-center mt-4'>
            <button className='mt-4 bg-[green] text-white px-4 py-2 rounded-lg hover:bg-blue-600'>
              Fund Wallet
            </button>

            <div className='mt-4 flex items-center gap-1'>
              <p className='text-white text-[13px]'>
                {walletBalance ? 'Hide balance' : 'Show balance'}
              </p>
              <label className='flex items-center cursor-pointer'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    className='hidden'
                    checked={isToggledWallet} // bind the checked status to state
                    onChange={handleToggleWallet} // handle toggle change
                    onClick={toggleToSeeWalletBalance}
                  />
                  <div className='block bg-gray-400 w-14 h-8 rounded-full'></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                      isToggledWallet
                        ? 'transform translate-x-6 bg-[#485696]'
                        : ''
                    }`}
                  ></div>
                </div>

                {/* Optional label for the switch */}
              </label>
            </div>
          </div>
        </div>

        {/* Fund Wallet Box */}
        <div className='shadow-lg bg-[#485696] p-6 rounded-lg w-full md:w-1/2 text-center'>
          <h2 className='text-xl font-bold text-white'>
            Total Monthly Expenses
          </h2>
          {monthlyExpenseBalance ? (
            <p className='text-2xl font-semibold mt-2 text-white'>N0.00</p>
          ) : (
            <p className='text-2xl font-semibold mt-2 text-white'>******</p>
          )}
          <div className='flex justify-between items-center mt-4'>
            <button className=' mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-[#485696]'>
              Expense
            </button>

            <div className='mt-4 flex items-center gap-1'>
              <p className='text-white text-[13px]'>
                {monthlyExpenseBalance ? 'Hide balance' : 'Show balance'}
              </p>
              <label className='flex items-center cursor-pointer'>
                <div className='relative'>
                  <input
                    type='checkbox'
                    className='hidden'
                    checked={isToggledExpense} // bind the checked status to state
                    onChange={handleToggleExpense} // handle toggle change
                    onClick={toggleToSeeMonthlyBalance}
                  />
                  <div className='block bg-gray-400 w-14 h-8 rounded-full'></div>
                  <div
                    className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out ${
                      isToggledExpense
                        ? 'transform translate-x-6 bg-[#485696]'
                        : ''
                    }`}
                  ></div>
                </div>

                {/* Optional label for the switch */}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
