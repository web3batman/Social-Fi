import React, {useState} from 'react'

const SearchNav = (props:{customer: number, setCustomer: Function}) => {

  const {customer, setCustomer} = props;

  return (
    <div className='flex gap-2 overflow-x-auto w-full'>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${customer == 0? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCustomer(0)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            You
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${customer == 1? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCustomer(1)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base line-clamp-1'>
            Your Keys
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${customer == 2? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCustomer(2)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Friends
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${customer == 3? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCustomer(3)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Global
          </h1>
        </div>
      </button>
    </div>
  )
}

export default SearchNav