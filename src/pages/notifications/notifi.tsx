import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const Notification = (props: any) => {
  const { active, username, notitype, time } = props;
  const [card, setCard] = useState<object>({
    icon: '/icons/home.svg',
    time: Date.now,
    username: '',
    notitype: '',
    comment: 'Ready to connect with your community friends? start to follow your best fellow. Here are they!!!'
  });

  useEffect(() => {
    switch (notitype) {
      case 'comment':
        setCard({
          icon: '/icons/home.svg',
          time: time,
          username: username,
          comment: 'comment on your post'
        })
        break;
      case 'star':
        setCard({
          icon: '/icons/home.svg',
          time: time,
          username: username,
          comment: 'star your post'
        })
        break;
      case 'follow':
        setCard({
          icon: '/icons/home.svg',
          time: time,
          username: username,
          comment: 'follow you'
        })
        break;
      default:
        setCard({
          icon: '/icons/home.svg',
          time: Date.now,
          comment: 'Ready to connect with your community friends? start to follow your best fellow. Here are they!!!'
        })
        break;
    }
  }, [])

  return (
    <div className={`p-4 rounded-lg flex justify-between items-center bg-white ${active ? styles.active : ''}`}>
      <div className='flex gap-4 items-center'>
        <div className={`p-2 rounded-lg ${notitype ? '' : 'shrink-0'} ${active ? styles.active_card : styles.common_card}`}>
          <Image src={'/icons/home.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
        </div>
        <div className='flex flex-col pr-2'>
          <h1 className='text-[16px] font-semibold leading-6'>
            {username}
            <span className='font-normal'> {card.comment}</span>
          </h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-grey-2'>
            {time}
          </h2>
        </div>
      </div>
      {
        notitype ? (
          <Image src={'/icons/home.svg'} width={100} height={100} alt='Icon' className='w-10 h-10' />
        ) : (
          <button className='px-4 py-2 rounded-lg bg-secondary shrink-0'>
            <div className='flex gap-4 items-center justify-center sm:justify-start'>
              <h1 className='text-white font-medium text-center text-[12px] break-keep'>
                Find Fellow
              </h1>
            </div>
          </button>
        )
      }
    </div>
  )
}

export default Notification