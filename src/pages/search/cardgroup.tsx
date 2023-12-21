import React, {useEffect, useState} from 'react'
import Card from './card'
import api from '../../constants/auth'
import toast from 'react-hot-toast';

const CardGroup = (props: {tab: number}) => {
  const {tab} = props;
  const [sort, setSort] = useState({});
  const [query, setQuery] = useState({});

  const [allUsers, setUsers] = useState<{avatar: string, _id: string, username: string, screen_name: string, price: number}[]>([]);

  useEffect(() => {
    api.post('/users/getAll', {sort}).then(
      res => {
        setUsers(res.data)
      }
    ).catch(
      err => toast.error(err)
    )
  }, [sort])

  useEffect(() => {
    switch (tab) {
      case 1:
        setSort({price: -1});
        break;
      case 2:
        setSort({created_at: -1});
        break;
      case 3:
        setSort({updated_at: 1});
        break;
      default:
        setSort({price: 1})
        break;
    }
  }, [tab])

  return (
    <div className='flex flex-col gap-4 w-full'>
      {
        allUsers && allUsers.map((user, index) => <Card key={index} id={user._id} avatar={user.avatar} username={user.username} screen_name={user.screen_name} price={user.price} />)
      }
    </div>
  )
}

export default CardGroup