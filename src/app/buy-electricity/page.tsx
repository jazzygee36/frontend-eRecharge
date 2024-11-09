'use client';

import BackIcon from '@/assets/icons/backIcon';
import Button from '@/component/common/button';
import Input from '@/component/common/input';

// import { useRouter } from 'next/router';

const BuyElectricity = () => {
  // const router = useRouter();
  return (
    <div className='py-5 px-5  h-screen'>
      <div className='flex justify-center items-center gap-4 mb-5'>
        <div className='absolute left-4'>
          <BackIcon />
        </div>
        <h2 className='text-xl font-bold text-[green] text-center '>
          e-Recharge <span style={{ color: '#485696' }}>Electricity</span>
        </h2>
      </div>

      {/* <div className='' onClick={() => router.back}>
        Back
      </div> */}
      <form className='w-full md:w-[50%] m-auto'>
        <p className='mt-6 font-semibold'>Disco</p>
        <Input
          type={'text'}
          placeholder={'Disco'}
          value={''}
          onChange={() => {}}
        />

        <p className='mt-4 font-semibold'>Meter type</p>
        <Input
          type={'text'}
          placeholder={'Meter type'}
          value={''}
          onChange={() => {}}
        />

        <p className='mt-4 font-semibold'>Meter number</p>
        <Input
          type={'text'}
          placeholder={'Meter number'}
          value={''}
          onChange={() => {}}
        />

        <p className='mt-4 font-semibold'>Amount</p>
        <Input
          type={'text'}
          placeholder={'Amount'}
          value={''}
          onChange={() => {}}
        />
        <Button
          title={'Proceed'}
          className={'bg-[#485696] w-full mt-5'}
          type={'submit'}
        />
      </form>
    </div>
  );
};

export default BuyElectricity;
