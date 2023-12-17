import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Card = (props: { item: object }) => {

  const router = useRouter();

  //@ts-ignore
  const { customer, seller, buy, count } = props.item;

  return (
    <div className='p-4 bg-white flex items-center rounded-lg w-full'>
      <div className='flex gap-9 items-center'>
        <div className='relative'>
          <Image src={customer.avatar} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white border-2 cursor-pointer' onClick={() => router.push(`/keys/${customer._id}`)} />
          <Image src={seller.avatar} width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full border-white border-2 absolute top-0 left-[24px] z-10 cursor-pointer' onClick={() => router.push(`/keys/${seller._id}`)} />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='text-base font-bold leading-[24px]'>
            {customer.username}
            <span className='font-base font-normal'> {buy ? 'bought' : 'sold'} {count} </span>
            <span className='font-base font-normal'> key</span>
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