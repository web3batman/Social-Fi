import React from 'react';
import Image from 'next/image';

const PostCard = () => {
  return (
    <div className='bg-white p-4 rounded-[15px] flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
            <div className='flex flex-col'>
              <h1 className='text-base font-bold leading-[24px]'>Elisabeth Olson</h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                <div className="flex gap-2">
                  <span>@elisabetholson</span>
                  <span>-</span>
                  <span>Just now</span>
                </div>
              </h2>
            </div>
          </div>
        </div>
        <h3 className='text-[14px] font-normal leading-5'>
          REVENUE SHARA 🌟alright now trading is back I want everyone to win, so I decided:
          🔴I will share 40% of my fees from the volume I earned every three days to everyone who holds my ticket.🔴I will send the Revenue share as a tip.

          ⛔ My fees right now at 1.4 ADA🔺️Buy the ticket and wait for your revenue share.🔺️
        </h3>
      </div>
      <div className='flex justify-between gap-4 max-sm:flex-col'>
        <div className='flex gap-4'>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/chat.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>384</h3>
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/refresh.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>1,456</h3>
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/star.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>790</h3>
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>201</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className='flex gap-1 items-center'>
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>384</h3>
            <Image src={'/icons/currency-dollar.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
          </div>
          <Image src={'/icons/dots-vertical.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90 max-sm:hidden' />
        </div>
      </div>
    </div>
  )
}

export default PostCard;