import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from './sidebar.module.css'
import { useRouter } from 'next/router'

const Sidebar = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>();

  useEffect(() => {
    setCurrentPage(router.asPath)
  }, [])

  return (
    <div className='lg:shrink-0 max-md:hidden'>
      <div className='flex flex-col gap-2 rounded-[15px] bg-white w-[200px] lg:w-[250px] p-2'>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${currentPage == '/home' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/home')}>
          <div className='flex gap-3 items-center'>
            <Image src={currentPage != '/home' ? '/icons/home.svg' : '/icons/home_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px]'>Home</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${currentPage == '/search' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/search')}>
          <div className='flex gap-3 items-center'>
            <Image src={currentPage != '/search' ? '/icons/side_search.svg' : '/icons/side_search_active.svg'} width={100} height={100} alt='Search' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px]'>Search</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${currentPage == '/notifications' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/notifications')}>
          <div className='flex gap-3 items-center'>
            <Image src={currentPage != '/notifications' ? '/icons/side_ring.svg' : '/icons/side_ring_active.svg'} width={100} height={100} alt='Notification' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px]'>Notifications</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${currentPage == '/inbox' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/inbox')}>
          <div className='flex gap-3 items-center'>
            <Image src={currentPage != '/inbox' ? '/icons/side_inbox.svg' : '/icons/side_inbox_active.svg'} width={100} height={100} alt='Inbox' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px]'>Inbox</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-lg ${currentPage == '/wallet' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/wallet')}>
          <div className='flex gap-3 items-center'>
            <Image src={currentPage != '/wallet' ? '/icons/side_wallet.svg' : '/icons/side_wallet_active.svg'} width={100} height={100} alt='Wallet' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-[18px]'>Wallet</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar