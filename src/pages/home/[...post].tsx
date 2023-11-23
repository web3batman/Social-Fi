import React, {useState, useEffect} from 'react'
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import PostCard from './postcard';
import BottomNav from '../components/bottom_nav';
import { Saira } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

const OpenPost = () => {

  const [posts, setPosts] = useState<{
    display_name: string, 
    username: string, 
    avatar: string, 
    created: string, 
    content: string, 
    reply: number, 
    exchange: number, 
    star: number, 
    bookmark: number, 
    price: number
  }[]>([
    {
      display_name: 'Elisabeth Olson',
      username: '@elisabetholson',
      avatar: '/avatars/default.svg',
      created: 'Just now',
      content: '',
      reply: 384,
      exchange: 1456,
      star: 790,
      bookmark: 201,
      price: 0.25
    },
    {
      display_name: 'Elisabeth Olson',
      username: '@elisabetholson',
      avatar: '/avatars/default.svg',
      created: 'Just now',
      content: 'its me',
      reply: 384,
      exchange: 1456,
      star: 790,
      bookmark: 201,
      price: 0.25
    }
  ]);

  const addNewPost = (post: object) => {
    // @ts-ignore
    setPosts((predata) => [...predata, post]);
  }

  return (
    <div className={saira.className}>
      <Header />
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
              posts && posts.map((post, index) => {
                return (
                  <PostCard display_name={post.display_name} username={post.username} avatar={post.avatar} created={post.created} content={post.content} reply={post.reply} exchange={post.exchange} star={post.star} bookmark={post.bookmark} price={post.price} key={index} />
                )
              })
            }
          </div>
          {/* <SideBarRight /> */}
        </div>
        <BottomNav />
      </div>
    </div>
  )
}

export default OpenPost;