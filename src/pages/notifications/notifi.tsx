import React, { useEffect, useState, useContext } from 'react'
import styles from './index.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'
import api from '@/constants/auth'
import toast from 'react-hot-toast'
import { UserContext } from '@/contexts/UserProvider'

const Notification = (props: any) => {
  let { active, username, notitype, time, avatar, id, target } = props;
  const [comment, setComment] = useState('');
  const [notifi_avatar, setNotifiavatar] = useState('/icons/noti_ring.svg');

  const router = useRouter();
  //@ts-ignore
  const { myProfile } = useContext(UserContext);

  const convertData = (convertDate: Date) => {
    const originalDateString = convertDate;
    const dateObject = new Date(originalDateString);

    // Extracting date and time components
    const year = dateObject.getUTCFullYear();
    const month = (dateObject.getUTCMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getUTCDate().toString().padStart(2, '0');
    const hours = dateObject.getUTCHours().toString().padStart(2, '0');
    const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');

    const formattedDateString = `${year}-${month}-${day} ${hours}:${minutes}`;

    return formattedDateString;
  }

  useEffect(() => {
    switch (notitype) {
      case 'post':
        setComment('posted new post');
        setNotifiavatar('/icons/noti_inbox.svg');
        break;
      case 'postlike':
        setComment('liked your post');
        setNotifiavatar('/icons/star.svg');
        break;
      case 'follow':
        setComment('follow now');
        setNotifiavatar('/icons/noti_ring.svg');
      case 'reply':
        setComment('replied to your post')
        break;
      case 'key':
        setComment('bought your key');
        setNotifiavatar('/icons/Keys.svg');
        break;
      case 'chat':
        setComment("sent you message");
        setNotifiavatar('/icons/noti_inbox.svg');
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

  const toLinkPage = () => {
    console.log('notitype', notitype)
        api.get(`/notifications/${id}`).then(res => {
          
          switch (notitype) {
            case 'key':
              router.push('/keys');
              break;
            case 'chat':
              router.push(`/inbox/${myProfile._id}`)
              break;
            case 'postlike':
              api.get(`/posts/${target}`).then(post => {
                if (post) {
                  router.push(`/home/${target}`)
                } else {
                  toast.error("This post deleted by user.")
                }
              })
              break;
            case 'post':
              api.get(`/posts/${target}`).then(post => {
                if (post) {
                  router.push(`/home/${target}`)
                } else {
                  toast.error("This post deleted by user.")
                }
              })
              break;
            case 'reply':
              api.get(`/posts/${target}`).then(post => {
                if (post) {
                  router.push(`/home/${target}`)
                } else {
                  toast.error("This post deleted by user.")
                }
              })
              break
          }
        }).catch(err => {
          toast.error("There is an error!")
        })
      
    }


  return (
    <div className={`p-4 rounded-lg flex justify-between items-center bg-white dark:bg-dark-header-bg ${active ? styles.active : ''} ${notitype ? '' : 'max-sm:flex-col gap-2'} cursor-pointer`} onClick={() => {
      toLinkPage()
    }}>
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
            {convertData(time)}
          </h2>
        </div>
      </div>
      {
        notitype ? (
          <Image quality={100} src={avatar} width={100} height={100} alt='Icon' className='w-10 h-10 shrink-0 rounded-lg' />
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