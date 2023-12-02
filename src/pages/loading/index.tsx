import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <ReactLoading type={'spinningBubbles'} color={'#F8793A'} height={'10%'} width={'10%'} />
    </div>
  )
}

export default Loading
