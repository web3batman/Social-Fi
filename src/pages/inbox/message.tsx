import React from 'react'
import MessageCard from './messagecard'

const Message = () => {
  return (
    <div className='flex flex-col gap-4 w-full'>
      <MessageCard active={true} />
      <MessageCard />
      <MessageCard />
      <MessageCard />
    </div>
  )
}

export default Message