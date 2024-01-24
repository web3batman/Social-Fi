import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../../constants/auth';
import Image from 'next/image'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import Post from './post';

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
    price: string
  },
  view: string[],

}

const OpenPost = () => {
  const [post, setPost] = useState<Post>();
  const [replys, setReply] = useState<Post[]>([]);

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)

  const router = useRouter();
  const postid = router.query.post;

  /**
   * Get post by id
   */
  useEffect(() => {
    if (!postid) return;

    // get the post info by postid
    api.get(`/posts/${postid}`).then(
      res => {
        setPost(res.data);
      }
    ).catch(
      err => {
        // toast.error('Oops there is an error!');
      }
    )

    // get the post reply count by id
    api.get(`/posts/getreply/${postid[0]}`).then(
      res => {
        setReply(res.data);
      }
    ).catch(err => {
      // toast.error('Oops there is an error!');
    })
  }, [postid])

  const addNewPost = (newpost: object) => {
    //@ts-ignore
    api.post(`/posts`, { content: newpost.content, reply: newpost.reply, posterid: post?.poster_id._id }).then(
      res => {
        if (res.data) {
          let newdata = [res.data, ...replys];
          setReply(newdata);
        }
        toast.success('Successfly posted.')
        // @ts-ignore
        
      }
    ).catch(
      // err => toast.error("Oops. Seems like there is an error...")
    )
  }


  return (
    <div className='bg-main-bg-color dark:bg-dark-body-bg'>
      <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
        <Sidebar />
        <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
          <div onClick={() => {
            window.history.back()
          }} className='border border-[#E7EAF0] dark:border-dark-border rounded-lg py-2 px-4 flex items-center gap-2 w-fit bg-white dark:bg-dark-header-bg cursor-pointer'>
            <Image quality={100} src={'/icons/arrow-left.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 opacity-90' />
            <h2 className='text-primary dark:text-white font-medium text-base leading-[24px]'>
              Back
            </h2>
          </div>
          {
            post && <PostCard post={post} nolink={true} toprofile={true} />
          }
          {
            //@ts-ignore
            postid && <Post addpost={addNewPost} reply={postid} />
          }
          <div className='flex flex-col'>
            {
              replys && replys.length > 0 && replys.map((post, index) => {
                if(post){
                  return <PostCard post={post} noreplay={true} key={index} />

                }
              })
            }
          </div>
        </div>
        <SideBarRight />
      </div>
      <BottomNav />
    </div>
  )
}

export default OpenPost;



