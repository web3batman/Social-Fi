import React, { useState, useRef, useEffect, useContext } from 'react'
import Image from 'next/image'
import { UserContext } from '@/contexts/UserProvider';

const Post = (props: {addpost: Function}) => {
  const {addpost} = props;

  const [postcontent, setPostcontent] = useState('');
  const newPostRef = useRef(null);
  const [avatar, setAvatar] = useState('/avatars/default_profile_normal.png');

  // @ts-ignore
  const {myProfile} = useContext(UserContext)

  const handleChange = (e: any) => {
    setPostcontent(e.target.value);
  }

  const postNewContent = () => {
    if (postcontent != '') {
      const newData = {
        poster_id: myProfile._id,
        content: postcontent,
        reply: 384,
        exchange: 1456,
        star: 790,
        bookmark: 201,
        price: 0.25
      }
      addpost(newData);
      setPostcontent('');
    }
  }

  useEffect(() => {
    const textarea = newPostRef.current;
    if (textarea) {
      // @ts-ignore
      textarea.style.height = 'inherit'; // Set to inherit to calculate new scrollHeight
      // @ts-ignore
      textarea.style.height = `${textarea.scrollHeight}px`; // Set new height
    }
  }, [postcontent]);

  return (
    <div className='bg-white p-4 rounded-[15px] flex flex-col gap-2'>
      <div className='flex gap-4 w-full'>
        <Image src={myProfile.avatar || avatar} width={100} height={100} alt='Default avatar' className='w-[35px] h-[35px] rounded-full' />
        <textarea className='text-grey-2 font-normal text-[14px] leading-[20px] bg-grey-3 w-full rounded-lg p-2 resize-none' value={postcontent} ref={newPostRef} onChange={handleChange} autoFocus/>
      </div>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2'>
          <Image src={'/icons/emoji-happy.svg'} width={100} height={100} alt='Default avatar' className='w-[24px] h-[24px]' />
          <Image src={'/icons/photograph.svg'} width={100} height={100} alt='Default avatar' className='w-[24px] h-[24px]' />
        </div>
        <div className='flex gap-4 items-center'>
          <div className='flex gap-2 items-center max-[875px]:hidden'>
            <h3 className='text-grey-4 text-[12px] font-normal leading-[18px]'>Share to</h3>
            <select name="share" className='px-2 py-1 rounded-lg bg-grey-3 text-grey-2 font-normal text-[12px] leading-[16px]'>
              <option value="all">Everyone</option>
            </select>
          </div>
          <button className='px-4 py-2 rounded-lg bg-secondary text-base leading-[24px] font-medium text-white' onClick={postNewContent}>
            Post
          </button>
        </div>
      </div>
    </div>
  )
}

export default Post