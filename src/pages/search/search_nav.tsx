import React, {useState} from 'react'

const SearchNav = (props: {tab: number, setTab: Function}) => {
  const { tab, setTab } = props;

  return (
    <div className='flex gap-2'>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${tab == 0? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg dark:text-white text-primary'}`} onClick={() => setTab(0)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Trending
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${tab == 1? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg dark:text-white text-primary'}`} onClick={() => setTab(1)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Top
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${tab == 2? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg dark:text-white text-primary'}`} onClick={() => setTab(2)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            New
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${tab == 3? 'bg-secondary text-white':' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg dark:text-white text-primary'}`} onClick={() => setTab(3)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Activity
          </h1>
        </div>
      </button>
    </div>
  )
}

export default SearchNav