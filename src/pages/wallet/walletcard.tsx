import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { UserContext } from '@/contexts/UserProvider'

const WalletCard = (props: any) => {

  //@ts-ignore
  const { myProfile } = useContext(UserContext);

  return (
    <div className="p-4 rounded-lg flex justify-between items-center bg-white dark:bg-dark-header-bg border border-border-color dark:border-dark-border">
      <div className='flex gap-4 items-center'>
        <Image quality={100} src={myProfile.avatar ? myProfile.avatar : '/avatars/default_profile_normal.png'} width={100} height={100} alt='Icon' className='w-10 rounded-full' />
        <div className='flex flex-col'>
          <h1 className='text-[16px] leading-6 font-bold'>
            {myProfile.username}
          </h1>
          {/* <h2 className='text-[12px] font-normal leading-[18px] text-grey-2 line-clamp-1 flex gap-1'>
            <span>addrsad6as9d...98asdka</span>
            <Image quality={100} src={'/icons/duplicate.svg'} width={100} height={100} alt='Icon' className='w-4 h-4' />
          </h2> */}
        </div>
      </div>
      {/* <div className='flex flex-col justify-between items-center'>
        <button className={`lg:px-4 px-2 py-2 rounded-lg flex gap-1 items-center ${styles.button_bg}`}>
          <Image quality={100} src={'/icons/download.svg'} width={100} height={100} alt='Icon' className='w-4 h-4' />
          <h2 className='text-secondary text-base font-medium leading-[24px] max-lg:hidden'>
            Export Private Key
          </h2>
        </button>
      </div> */}
    </div>
  )
}

export default WalletCard