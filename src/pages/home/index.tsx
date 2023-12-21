import React, {useState, useEffect, useContext} from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import Post from './post';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import { Saira } from 'next/font/google';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../../constants/auth';
import toast from 'react-hot-toast'

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

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  
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
        toast.success('Successfly posted.')
        // @ts-ignore
        setPosts((predata) => [newPost, ...predata]);
      }
    ).catch(
      err => toast.error("Oops. Seems like there is an error...")
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
  }, [myProfile])

  return (
    <div className='bg-main-bg-color dark:bg-[#212529]'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
          <Post addpost={addNewPost} />
          {
            posts.length != 0 && posts.map((post, index) => {
              return (
                <div key={index}>
                  <PostCard post={post} />
                </div>
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

export default Home;