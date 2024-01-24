import React, { useEffect, useState } from 'react'
import Card from './card'
import api from '../../constants/auth'

const CardGroup = (props: {customer: number}) => {

  const [keys, setKeys] = useState([]);
  const {customer} = props;

  useEffect(() => {
    api.get(`/keys/customer/${customer}`).then(res => {
      setKeys(res.data);
    }).catch(err => {

    })
  }, [customer])

  return (
    <div className='flex flex-col gap-4 w-full'>
      {
        keys && keys.map((item: any, index) => 
          {
            //@ts-ignore
            if (item.seller && item.customer) {
              return(
                <Card key={index} item={item} />
              )
            }
          }
        )
      }
    </div>
  )
}

export default CardGroup