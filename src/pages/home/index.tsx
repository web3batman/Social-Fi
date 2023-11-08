import React from 'react'
import Header from '../components/header';
import Image from 'next/image';
import Sidebar from '../components/sidebar';
import SideBarRight from '../components/sidebar_right';
import Post from './post';
import PostCard from './postcard';

const Dashboard = () => {
  return (
    <div>
      <Header />
      <div className='w-full bg-[#D9D9D9]'>
        <div className='px-5 md:px-10 pt-6 flex max-w-[1240px] w-screen mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-lg:grow'>
            <Post />
            <PostCard />
            <PostCard />
            <PostCard />

          </div>
          <SideBarRight />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;