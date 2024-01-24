import React from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import NotificationGroup from './notification_group';
import BottomNav from '@/components/bottom_nav';

const Notifications = () => {
  return (
    <div className='w-full bg-main-bg-color dark:bg-dark-body-bg dark:text-white'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
          <h2 className='font-medium text-[24px] leading-[32px]'>Notifications</h2>
          <NotificationGroup />
        </div>
        <SideBarRight />
      </div>
      <BottomNav />
    </div>
  )
}

export default Notifications;