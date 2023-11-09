import React from 'react'
import Image from 'next/image'

const Post = () => {
  return (
    <div className='bg-white p-4 rounded-[15px] flex flex-col gap-2'>
      <div className='bg-grey-3 p-2 flex gap-4 items-center w-full'>
        <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-[30px] h-[30px] rounded-full' />
        <h2 className='text-grey-2 font-normal text-[14px] leading-[20px]'>How’s going?</h2>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-[24px] h-[24px]' />
          <Image src={'/avatars/default.svg'} width={100} height={100} alt='Default avatar' className='w-[24px] h-[24px]' />
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center max-[875px]:hidden'>
            <h3 className='text-grey-4 text-[12px] font-normal leading-[18px]'>Share to</h3>
            <select name="share" className='px-2 py-1 rounded-lg bg-grey-3 text-grey-2 font-normal text-[12px] leading-[16px]'>
              <option value="all">Everyone</option>
            </select>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white'>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post