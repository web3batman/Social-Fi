import React from 'react'
import MessageCard from './messagecard'

const Message = () => {
  return (
    <div className='flex flex-col gap-4 w-full min-h-[calc(100vh - 92px)]'>
      <MessageCard active={true} />
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </div>
  )
}

export default Message