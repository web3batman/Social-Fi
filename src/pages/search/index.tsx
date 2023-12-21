import React, {useState} from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import CardGroup from './cardgroup';
import SearchNav from './search_nav';
import BottomNav from '@/components/bottom_nav';

const Search = () => {
  const [tab, setTab] = useState(0);
  return (
    <div className='w-full bg-main-bg-color dark:bg-dark-body-bg dark:text-white'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
          <SearchNav tab={tab} setTab={setTab} />
          <CardGroup tab={tab} />
        </div>
        <SideBarRight />
      </div>
      <BottomNav />
    </div>
  )
}

export default Search;