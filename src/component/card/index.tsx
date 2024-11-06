import React from 'react';
import Buy from '../../assets/Buy airtime.svg';
import Cards from '../common/cards';
import Electricity from '../../assets/electricity.svg';
import Cable from '../../assets/cabletv.svg';

const Card = () => {
  return (
    <div className='mb-12'>
      <div className='text-center my-10'>
        <h1 className='font-bold text-[#000000] text-[40px]'>Pay Bills</h1>
        <p className='font-bold text-[#000000] text-[17px] md:text-[24px]'>
          Electronic vending of Telecom Services
        </p>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-6 gap-y-6 md:gap-y-0  justify-items-center items-center  mx-auto'>
        <Cards
          img={Buy.src}
          title={'Buy Data Bundle'}
          description={
            'Start enjoying this  rates for your internet browsing databundle.'
          }
          bottomText={'Buy Now'}
          isBottomTextDisabled={true}
        />
        <Cards
          img={Buy.src}
          title={'Buy Airtime'}
          description={'Enjoy huge discount when you purchase airtime.'}
          bottomText={'Buy Now'}
        />
        <Cards
          img={Cable.src}
          title={'CableTV Subscription'}
          description={'Instant recharge of DStv, GOtv and Startimes e.t.c.'}
          bottomText={'Buy Now'}
          className={`text-[18px]`}
          isBottomTextDisabled={true}
        />
        <Cards
          img={Electricity.src}
          title={'Pay Electricity Bill'}
          description={
            'Pay you electricity bill online e.g. EKEDC, IKEDC, AEDC, PHEDC e.t.c.'
          }
          bottomText={'Pay Now'}
          className={`text-[20px]`}
          isBottomTextDisabled={true}
        />
      </div>
    </div>
  );
};

export default Card;
