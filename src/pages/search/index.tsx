import React from 'react'
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import SideBarRight from '../components/sidebar_right';
import CardGroup from './cardgroup';
import SearchNav from './search_nav';
import BottomNav from '../components/bottom_nav';
import { Saira } from 'next/font/google';
const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

const Dashboard = () => {
  return (
    <div className={saira.className}>
      <Header />
      <div className='w-full bg-main-bg-color'>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
            <SearchNav />
            <CardGroup />
          </div>
          <SideBarRight />
        </div>
        <BottomNav />
      </div>
    </div>
  )
}

export default Dashboard;