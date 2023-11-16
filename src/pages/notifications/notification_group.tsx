import React from 'react'
import Notification from './notifi'

const NotificationGroup = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <Notification active={true} username='Jason_haunte' notitype='comment' time='Just now' />
      <Notification active={false} username='Sarah Cohen' notitype='star' time='20m' />
      <Notification active={false} username='Trader Joe' notitype='follow' time='5h' />
      <Notification active={false} />
    </div>
  )
}

export default NotificationGroup