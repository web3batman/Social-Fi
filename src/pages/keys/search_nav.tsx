import React, {useState} from 'react'

const SearchNav = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className='flex gap-2'>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 0? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(0)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            You
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 1? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(1)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Your Keys
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 2? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(2)}>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='font-medium leading-[32px] text-center text-base'>
            Friends
          </h1>
        </div>
      </button>
      <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 3? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(3)}>
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