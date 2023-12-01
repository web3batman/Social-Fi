import React, {useState, useEffect, useContext} from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../api/auth';
import Image from 'next/image'

const OpenPost = () => {
  const [posts, setPosts] = useState<{
    created_at: string, 
    content: string, 
    poster_id: {
      _id: string,
      avatar: string,
      username: string,
      screen_name: string
    }
    _id: string
    // reply: number, 
    // exchange: number, 
    // star: number, 
    // bookmark: number, 
    // price: number
  }[]>([]);
  
  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)

  const addNewPost = (post: object) => {
    //@ts-ignore
    api.post(`/posts`, {content: post.content}).then(
      res => {
        const newPost = {
          ...res.data,
          poster_id: {
            screen_name: myProfile.screen_name,
            username: myProfile.username,
            avatar: myProfile.avatar
          }
        }
        // @ts-ignore
        setPosts((predata) => [newPost, ...predata]);
      }
    )
  }

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
  }, [])

  return (
    <div className='bg-main-bg-color'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
        <Link href={'/home'} className='border border-[#E7EAF0] rounded-lg py-2 px-4 flex items-center gap-2 w-fit bg-white'>
                <Image src={'/icons/arrow-left.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 opacity-90' />
                <h2 className='text-primary font-medium text-base leading-[24px]'>
                    Back
                </h2>
            </Link>
          {
            posts.length != 0 && posts.map((post, index) => {
              return (
                <Link href={'/home/post/1'} key={index}>
                  <PostCard display_name={post.poster_id.screen_name} username={post.poster_id.username} avatar={post.poster_id.avatar} created_at={post.created_at} content={post.content} />
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



