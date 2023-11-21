import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './sidebar.module.css'
import { useRouter } from 'next/router'

const BottomNav = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<string>();

  useEffect(() => {
    setCurrentPage(router.asPath)
  }, [])
  return (
    <div className='fixed bottom-0 w-full md:hidden z-20'>
      <div className='flex rounded-t-[15px] bg-white p-2'>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/home' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/home')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/home' ? '/icons/home.svg' : '/icons/home_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base'>Home</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/search' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/search')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/search' ? '/icons/side_search.svg' : '/icons/side_search_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base'>Search</h3>
          </div>
        </div>
        {/* <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/notifications' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/notifications')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/notifications' ? '/icons/side_ring.svg' : '/icons/side_ring_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base max-w-full overflow-hidden'>Notification</h3>
          </div>
        </div> */}
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/keys' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/keys')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/keys' ? '/icons/side_ring.svg' : '/icons/side_ring_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base max-w-full overflow-hidden'>Keys</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/inbox' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/inbox')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/inbox' ? '/icons/side_inbox.svg' : '/icons/side_inbox_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base'>Inbox</h3>
          </div>
        </div>
        <div className={`p-4 cursor-pointer hover:bg-gray-300 rounded-x-lg w-1/5 ${currentPage == '/wallet' ? styles.active : 'text-grey-1'}`} onClick={() => router.push('/wallet')}>
          <div className='flex flex-col items-center gap-2'>
            <Image src={currentPage != '/wallet' ? '/icons/side_wallet.svg' : '/icons/side_wallet_active.svg'} width={100} height={100} alt='Home' className='w-6 h-6' />
            <h3 className='font-semibold leading-[14px] text-base'>Wallet</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomNav