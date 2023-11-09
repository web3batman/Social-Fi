import React from 'react'
import Image from 'next/image'
import styles from './sidebar.module.css'

const BottomNav = () => {
  return (
    <div className='fixed bottom-0 w-full md:hidden'>
      <div className='flex rounded-t-[15px] bg-white p-2'>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${styles.gradient}`}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='text-secondary font-semibold leading-[14px] text-base'>Home</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg w-1/5'>
          <div className='flex flex-col items-center gap-2'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base clear-left text-grey-1'>Search</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg w-1/5'>
          <div className='flex flex-col items-center gap-2'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base text-grey-1 max-w-full overflow-hidden'>Notification</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg w-1/5'>
          <div className='flex flex-col items-center gap-2'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base text-grey-1'>Inbox</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg w-1/5'>
          <div className='flex flex-col items-center gap-2'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base text-grey-1'>Wallet</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNav