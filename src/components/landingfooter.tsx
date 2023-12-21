import React from 'react'

const Footer = () => {
  return (
    <div className='px-5 md:px-10 py-4 sm:py-[22px] flex sm:justify-between justify-center max-sm:flex-col max-sm:gap-6 items-center max-w-[1240px] w-full'>
      <div className='flex gap-6'>
        <h1 className='text-primary dark:text-white text-base font-medium leading-6 text-center cursor-pointer'>
          Privacy Policy
        </h1>
        <span className='dark:text-white'>.</span>
        <h1 className='text-primary dark:text-white text-base font-medium leading-6 text-center cursor-pointer'>
          FAQ
        </h1>
      </div>
      <div className='flex gap-2'>
        <h1 className='text-base font-medium leading-6 text-center cursor-pointer dark:text-white'>
          Questions?
        </h1>
        <h1 className='text-base font-medium leading-6 text-center text-secondary cursor-pointer dark:text-[#FAB243]'>
          Contact Us
        </h1>
      </div>
    </div>
  )
}

export default Footer