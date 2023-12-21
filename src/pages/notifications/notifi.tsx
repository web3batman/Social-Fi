import React, { useEffect, useState } from 'react'
import styles from './index.module.css'
import Image from 'next/image'

const Notification = (props: any) => {
  let { active, username, notitype, time } = props;
  const [comment, setComment] = useState('');
  const [notifi_avatar, setNotifiavatar] = useState('/icons/noti_ring.svg');

  useEffect(() => {
    switch (notitype) {
      case 'comment':
        setComment('comment on your post');
        setNotifiavatar('/icons/noti_inbox.svg');
        break;
      case 'star':
        setComment('star your post');
        setNotifiavatar('/icons/star.svg');
        break;
      case 'follow':
        setComment('follow now');
        setNotifiavatar('/icons/noti_ring.svg');
        break;
      default:
        setComment('Ready to connect with your community friends? start to follow your best fellow. Here are they!!!');
        setNotifiavatar('/icons/noti_ring.svg');
        const timeElapsed = Date.now();
        const today = new Date(timeElapsed);
        today.toDateString();
        time = today.toString();
        break;
    }
  }, [])


  return (
    <div className={`p-4 rounded-lg flex justify-between items-center bg-white dark:bg-dark-header-bg ${active ? styles.active : ''} ${notitype ? '' : 'max-sm:flex-col gap-2'} `}>
      <div className='flex gap-4 items-center'>
        <div className={`p-2 rounded-lg ${notitype ? '' : 'shrink-0'} ${active ? styles.active_card : styles.common_card}`}>
          <Image quality={100} src={notifi_avatar} width={'100'} height={'100'} alt='Icon' className='w-[24px] h-[24px] max-w-[unset]' />
        </div>
        <div className='flex flex-col pr-2'>
          <h1 className='text-[16px] font-semibold leading-6'>
            {username}
            <span className='font-normal'> {comment}</span>
          </h1>
          <h2 className='text-[12px] font-normal leading-[18px] text-grey-2'>
            {time}
          </h2>
        </div>
      </div>
      {
        notitype ? (
          <Image quality={100} src={'/icons/two_girls.svg'} width={100} height={100} alt='Icon' className='w-10 h-10 shrink-0' />
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