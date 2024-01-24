import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Card = (props: { item: object }) => {

  const router = useRouter();

  //@ts-ignore
  const { customer, seller, buy, count, created_at } = props.item;
  const [creatTime, setTime] = useState('');

  useEffect(() => {
    convertTime();
  }, [])

  const convertTime = () => {
    const timestamp: any = new Date(created_at);
      const currentTimestamp: any = new Date();
      const timeDifference = currentTimestamp - timestamp;
      const minutesDifference = timeDifference / (1000 * 60);
      const minute = Math.floor(minutesDifference);
      const hour = Math.floor(minute / 60);
      const day = Math.floor(hour / 24);
      const month = Math.floor(day / 30);
      const createTime = created_at.split('T')[0];

      if (minute < 60) {
        setTime(`${minute + 1} m`)
      }
      if (hour > 0) {
        if (hour < 24) {
          setTime(`${hour} h`)
        }
      }
      if (day > 0) {
        if (day < 30) {
          setTime(`${day} d`)
        }
      }
      if (month > 0) {
        setTime(createTime);
      }
  }

  return (
    <div className='p-4 bg-white dark:bg-dark-header-bg flex items-center rounded-lg w-full'>
      <div className='flex gap-9 items-center'>
        <div className='relative'>
          <Image quality={100} src={customer.avatar} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white dark:border-dark-border border-2 cursor-pointer' onClick={() => router.push(`/keys/${customer._id}`)} />
          <Image quality={100} src={seller.avatar} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white dark:border-dark-border border-2 absolute top-0 left-[24px] z-10 cursor-pointer' onClick={() => router.push(`/keys/${seller._id}`)} />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='text-base font-bold leading-[24px]'>
            {customer.username}
            <span className='font-base font-normal'> {buy ? 'bought' : 'sold'} {count} </span>
            <span className='font-base font-normal'> key</span>
          </div>
          <div className='text-[12px] font-normal leading-[18px] text-[#738290] flex items-center gap-2'>
            {/* <h2 className='text-[14px] text-secondary font-medium leading-[18px]'>1.3273 ADA</h2>
            <span className='w-1 h-1 rounded-full bg-grey-2'></span> */}
            <span>{creatTime} ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card