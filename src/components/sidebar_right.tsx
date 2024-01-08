import React from 'react'
import Image from 'next/image'

const SideBarRight = () => {
  return (
    <div className='shrink-0 hidden'>
      <div className='flex flex-col gap-4 rounded-[15px] bg-white dark:bg-dark-header-bg dark:text-white w-[250px] lg:w-[300px] p-4'>
        <h1 className='text-primary dark:text-white text-base leading-[24px] font-semibold'>Who to follow</h1>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image quality={100} src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
            <div className='flex flex-col items-center'>
              <h1 className='text-base font-bold leading-[24px]'>Trader Joe</h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>@traderJoy_xyz</h2>
            </div>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white'>
            Follow
          </button>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image quality={100} src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
            <div className='flex flex-col items-center'>
              <h1 className='text-base font-bold leading-[24px]'>Trader Joe</h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>@traderJoy_xyz</h2>
            </div>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white'>
            Follow
          </button>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image quality={100} src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
            <div className='flex flex-col items-center'>
              <h1 className='text-base font-bold leading-[24px]'>Trader Joe</h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>@traderJoy_xyz</h2>
            </div>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white'>
            Follow
          </button>
        </div>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image quality={100} src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
            <div className='flex flex-col items-center'>
              <h1 className='text-base font-bold leading-[24px]'>Trader Joe</h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>@traderJoy_xyz</h2>
            </div>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white'>
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

export default SideBarRight