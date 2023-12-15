import React, { useContext } from 'react'
import { UserContext } from '@/contexts/UserProvider'

const Tabbar = () => {
    
  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

    return (
        <div className='flex gap-4 w-full'>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white w-1/3 rounded-lg border-border-color border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Portofolio</h2>
                <h1 className='text-secondary text-base font-semibold'>23,980.80 ADA</h1>
            </div>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white w-1/3 rounded-lg border-border-color border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Balance</h2>
                <h1 className='text-secondary text-base font-semibold'>{myProfile.balance} ADA</h1>
            </div>
            <div className='flex flex-col gap-1 px-4 py-2 bg-white w-1/3 rounded-lg border-border-color border'>
                <h2 className='text-grey-2 capitalize font-normal text-[12px] leading-4'>Fees Earned</h2>
                <h1 className='text-secondary text-base font-semibold'>2,830.55 ADA</h1>
            </div>
        </div>
    )
}

export default Tabbar