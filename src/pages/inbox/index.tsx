import React, {useState, useEffect} from 'react'
import Sidebar from '@/components/sidebar';
import Message from './message';
import BottomNav from '@/components/bottom_nav';

const Inbox = () => {

  return (
    <div className='w-full bg-main-bg-color dark:bg-dark-body-bg dark:text-white'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 w-full max-md:mb-[110px] min-h-[calc(100vh-140px)] '>
          <h2 className='font-medium text-[24px] leading-[32px]'>Messages</h2>
          <Message />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Inbox;