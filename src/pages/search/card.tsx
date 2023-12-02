import React from 'react'
import Image from 'next/image'

const Card = () => {
  return (
    <div className='p-4 bg-white flex justify-between items-center rounded-lg w-full'>
      <div className='flex gap-4 items-center'>
        <Image src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
        <div className='flex flex-col'>
          <h1 className='text-base font-bold leading-[24px]'>Trader Joe</h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
            <span>@traderJoy_xyz</span>
          </h2>
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        <h1 className='text-[#009C06] font-normal leading-[18px] text-[12px] max-[860px]:hidden'>
          +162,906.24%
        </h1>
        <div className='flex flex-col'>
          <h1 className='text-base font-bold leading-[24px] flex gap-2 items-center'>
            <span>10,890</span>
            <Image src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
          </h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
            <span>Ticket Prize</span>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Card