import React, {useState, useEffect, useContext} from 'react'
import MessageCard from './messagecard'
import api from '../api/auth';
import toast from 'react-hot-toast';
import { UserContext } from '@/contexts/UserProvider';

const Message = () => {

  //@ts-ignore
  const { myProfile } = useContext(UserContext);

  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    api.get('/users/holding').then(res => {
      setCards(res.data);
    }).catch(err => {
      toast.error("Oops, there is an error.")
    })
  }, [])

  return (
    <div className='flex flex-col gap-4 w-full min-h-[calc(100vh - 92px)]'>
      <MessageCard user={myProfile} roomname='My Room' />
      {
        cards && cards.map((card, index) => {
          if (card.userid._id != myProfile._id) {
            return <MessageCard user={card.userid} key={index} />
          }
        
      })
      }
    </div>
  )
}

export default Message