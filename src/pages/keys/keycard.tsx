import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Keycard = (props: { avatar: string, id: string, username: string, screen_name: string, price: number, count?: number }) => {
  const { avatar, id, username, screen_name, price, count } = props;

  return (
    <Link href={`/keys/${id}`} className='p-4 bg-white dark:bg-dark-header-bg flex justify-between items-center rounded-lg w-full'>
      <div className='flex gap-4 items-center'>
        <Image quality={100} src={avatar ? avatar : '/avatars/default_profile_normal.png'} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full' />
        <div className='flex flex-col'>
          <h1 className='text-base font-bold leading-[24px]'>{username}</h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
            <span>@{screen_name}</span>
          </h2>
        </div>
      </div>
      <div className='flex gap-4 items-center'>
        {/* <h1 className='text-[#009C06] font-normal leading-[18px] text-[12px] max-[860px]:hidden'>
          +162,906.24%
        </h1> */}
        {
          count ? (
            <div className='flex flex-col'>
              <h1 className='text-base font-bold leading-[24px] text-center'>
                {count}
              </h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                <span>Key Count</span>
              </h2>
            </div>
          ) : (
            <div className='flex flex-col'>
              <h1 className='text-base font-bold leading-[24px] flex gap-2 items-center'>
                <span>{price}</span>
                <Image quality={100} src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
              </h1>
              <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                <span>Key Price</span>
              </h2>
            </div>
          )
        }

      </div>
    </Link>
  )
}

export default Keycard