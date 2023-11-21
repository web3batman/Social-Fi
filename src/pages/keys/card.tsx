import React from 'react'
import Image from 'next/image'

const Card = () => {
  return (
    <div className='p-4 bg-white flex items-center rounded-lg w-full'>
      <div className='flex gap-9 items-center'>
        <div className='relative'>
          <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white border-2' />
          <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white border-2 absolute top-0 left-[24px] z-10' />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='text-base font-bold leading-[24px]'>
            L38NFT.ADA
            <span className='font-base font-normal'> bought 1 </span> 
            Sahara.ADA ...
            <span className='font-base font-normal'> Crypto key</span>
          </div>
          <div className='text-[12px] font-normal leading-[18px] text-[#738290] flex items-center gap-2'>
            <h2 className='text-[14px] text-secondary font-medium leading-[18px]'>1.3273 ADA</h2>
            <span className='w-1 h-1 rounded-full bg-grey-2'></span>
            <span>Just now</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card