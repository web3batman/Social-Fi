import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'

const PostCard = (props: {
  display_name: string, 
  username: string, 
  avatar: string, 
  created_at: string, 
  content: string, 
  id: string
  // reply: number, 
  // exchange: number, 
  // star: number, 
  // bookmark: number, 
  // price: number
}) => {
  const { display_name, username, avatar, created_at, content, id } = props;
  const router = useRouter();

  return (
    <div className='bg-white p-4 rounded-[15px] flex flex-col gap-4'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex gap-[10px] items-center'>
            <Image src={avatar} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full cursor-pointer' onClick={() => router.push(`/keys/${id}`)} />
            <div className='flex flex-col'>
              <h1 className='text-base font-bold leading-[24px]'>{ display_name }</h1>
              <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                <div className="flex gap-2">
                  <span>@{username}</span>
                  <span>-</span>
                  <span>{created_at}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className='text-[14px] font-normal leading-5'>
          {content}
        </h3>
      </div>
      <div className='flex justify-between gap-4 max-sm:flex-col'>
        <div className='flex gap-4'>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/chat.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
            {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{reply}</h3> */}
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/refresh.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{exchange}</h3> */}
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/post_star.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{star}</h3> */}
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
          </div>
          <div className='flex gap-1 items-center'>
            <Image src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
            {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{bookmark}</h3> */}
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
          </div>
        </div>
        <div className="flex gap-4">
          <div className='flex gap-1 items-center'>
            {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{price}</h3> */}
            <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
            <Image src={'/icons/currency-dollar.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
          </div>
          <Image src={'/icons/dots-vertical.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90 max-sm:hidden' />
        </div>
      </div>
    </div>
  )
}

export default PostCard;