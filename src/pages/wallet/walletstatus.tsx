import React from 'react'

const WalletSatus = (props: { title: any; amount: any; }) => {
  const { title, amount } = props;

  return (
    <div className="p-4 rounded-lg flex flex-col justify-between bg-white dark:bg-dark-header-bg border border-border-color dark:border-dark-border w-full lg:w-1/3">
      <h1 className='text-[14px] font-normal leading-[18px] text-grey-4 uppercase'>{title}</h1>
      <h2 className='text-primary dark:text-white text-[24px] font-semibold leading-[32px]'>
        {amount} ADA
      </h2>
    </div>
  )
}

export default WalletSatus