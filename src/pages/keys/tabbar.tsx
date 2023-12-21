import React, { useContext } from 'react'
import { UserContext } from '@/contexts/UserProvider'

const Tabbar = () => {
    
  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white dark:bg-dark-header-bg w-1/3 rounded-lg border-border-color dark:border-dark-border border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Portfolio</h2>
                <h1 className='text-secondary dark:text-font-yellow text-base font-semibold'>0 ADA</h1>
            </div>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white dark:bg-dark-header-bg w-1/3 rounded-lg border-border-color dark:border-dark-border border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Balance</h2>
                <h1 className='text-secondary dark:text-font-yellow text-base font-semibold'>{Math.floor(myProfile.balance * 100) / 100 } ADA</h1>
            </div>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white dark:bg-dark-header-bg w-1/3 rounded-lg border-border-color dark:border-dark-border border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Fees Earned</h2>
                <h1 className='text-secondary dark:text-font-yellow text-base font-semibold'>{Math.floor(myProfile.fee_profit * 100) / 100 } ADA</h1>
            </div>
        </div>
    )
}

export default Tabbar