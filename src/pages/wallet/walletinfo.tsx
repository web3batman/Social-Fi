import React from 'react';
import MessageCard from './walletcard';
import Image from 'next/image';
import WalletSatus from './walletstatus';

const WalletInfo = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <MessageCard />
      <div className='flex justify-between gap-4 max-lg:flex-col'>
        <WalletSatus title={'balace'} amount={'200.00'} />
        <WalletSatus title={'Fees Earned'} amount={'2,830.55'} />
        <WalletSatus title={'Portofolio Value'} amount={'23,980.80'} />
      </div>
      <div className='flex justify-between gap-4'>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white border border-border-color w-1/2">
          <Image src={'/icons/plus-circle.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary leading-[24px] font-semibold text-base'>
            Deposit
          </h3>
        </div>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white border border-border-color w-1/2">
          <Image src={'/icons/paper-airplane.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary leading-[24px] font-semibold text-base'>
            Withdraw
          </h3>
        </div>
      </div>
    </div>
  )
}

export default WalletInfo