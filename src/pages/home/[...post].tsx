import React, {useState, useEffect, useContext} from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../../constants/auth';
import Image from 'next/image'

interface Post {
  _id: string,
  content: string,
  vote: string[],
  created_at: string,
  updated_at: string,
  poster_id: {
    _id: string,
    twitter_id: string,
    avatar: string,
    username: string,
    screen_name: string,
  }
}

const OpenPost = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)

  /**
   * Get all posts when the component render.
   */
  useEffect(() => {
    if (myProfile.avatar) {      
      api.get('/posts').then(res => {
        setPosts(res.data);
      }).catch(err => {
        console.log('Error', err);
      })
    }
  }, [myProfile])

  return (
    <div className='bg-main-bg-color dark:bg-dark-body-bg'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
        <Link href={'/home'} className='border border-[#E7EAF0] dark:border-dark-border rounded-lg py-2 px-4 flex items-center gap-2 w-fit bg-white dark:bg-dark-header-bg'>
                <Image quality={100} src={'/icons/arrow-left.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 opacity-90' />
                <h2 className='text-primary dark:text-white font-medium text-base leading-[24px]'>
                    Back
                </h2>
            </Link>
          {
            posts.length != 0 && posts.map((post, index) => {
              return (
                <Link href={`/home/${post.poster_id._id}`} key={index}>
                  <PostCard post={post} />
                </Link>
              )
            })
          }
        </div>
        <SideBarRight />
      </div>
      <BottomNav />
    </div>
  )
}

export default OpenPost;



