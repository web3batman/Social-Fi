import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const MessageCard = (props: any) => {
  const { active, username, time, avatar } = props;

  return (
    <div className="p-4 rounded-lg flex justify-between items-center bg-white">
      <div className='flex gap-4 items-center'>
        <Image src={'/avatars/default.svg'} width={100} height={100} alt='Icon' className='w-10 rounded-full' />
        <div className='flex flex-col'>
          <h1 className='text-[16px] font-semibold leading-6'>
            Trader Joe
          </h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-grey-2 line-clamp-1'>
            Hello, Can I have you in my team. Your skill might help the company realy much and you can improve you...
          </h2>
        </div>
      </div>
      <div className='flex flex-col items-end h-10 justify-between'>
        <h2 className='text-[12px] font-normal leading-[18px]'>24m</h2>
        <div>
          <div className={`w-2 h-2 rounded-full ${active ? 'bg-secondary' : 'bg-white'}`}>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MessageCard