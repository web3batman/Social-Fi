import React from 'react'

const SearchNav = () => {
  return (
    <div className='flex gap-2'>
      <button className='px-2 lg:px-6 py-1 lg:py-2 rounded-lg bg-secondary max-sm:w-full'>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='text-white font-medium leading-[32px] text-center text-base'>
            Trending
          </h1>
        </div>
      </button>
      <button className='px-2 lg:px-6 py-1 lg:py-2 rounded-lg bg-white text-primary max-sm:w-full border-border-color border'>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='text-primary font-medium leading-[32px] text-center text-base'>
            Top
          </h1>
        </div>
      </button>
      <button className='px-2 lg:px-6 py-1 lg:py-2 rounded-lg bg-white text-primary max-sm:w-full border-border-color border'>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='text-primary font-medium leading-[32px] text-center text-base'>
            New
          </h1>
        </div>
      </button>
      <button className='px-2 lg:px-6 py-1 lg:py-2 rounded-lg bg-white text-primary max-sm:w-full border-border-color border'>
        <div className='flex gap-4 items-center justify-center sm:justify-start'>
          <h1 className='text-primary font-medium leading-[32px] text-center text-base'>
            Activity
          </h1>
        </div>
      </button>
    </div>
  )
}

export default SearchNav