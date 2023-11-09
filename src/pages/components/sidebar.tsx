import React from 'react'
import Image from 'next/image'
import styles from './sidebar.module.css'

const Sidebar = () => {
  return (
    <div className='lg:shrink-0 max-md:hidden'>
      <div className='flex flex-col gap-2 rounded-[15px] bg-white w-[200px] lg:w-[250px] p-2'>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${styles.gradient}`}>
          <div className='flex gap-3 items-center'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='text-secondary font-semibold leading-[14px] text-[18px]'>Home</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg'>
          <div className='flex gap-3 items-center'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px] clear-left text-grey-1'>Search</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg'>
          <div className='flex gap-3 items-center'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px] text-grey-1'>Notifications</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg'>
          <div className='flex gap-3 items-center'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px] text-grey-1'>Inbox</h3>
          </div>
        </div>
        <div className='p-4 cursor-pointer hover:bg-gray-300 rounded-lg'>
          <div className='flex gap-3 items-center'>
            <Image src={'/icons/home.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px] text-grey-1'>Wallet</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar