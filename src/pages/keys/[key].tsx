import React, {useState, useEffect, useContext} from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../api/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KeyModal from '@/components/keymodal';
import CardGroup from './cardgroup';

interface Profile {
  avatar?: string;
  username?: string;
  screen_name?: string;
  online_status?: boolean;
  price?: number;
  holding?: Holder[];
  holder?: Holder[];
}

interface Holder {
  avatar?: string;
  username?: string;
  onlin_status?: boolean;
}


const Key = () => {

  const router = useRouter();

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
  const { myProfile, setMyProfile } = useContext(UserContext);
  const [poster, setPoster] = useState<Profile>({});
  const [posteravatar, setPosteravatar] = useState('');
  const [customer, setCustomer] = useState<string>();

  const [modalshow, setModal] = useState<true | false>(false);
  
  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  const [currentTab, setCurrentTab] = useState(0);

  // Get post information
  useEffect(() => {
      const param = router.query.key;
      // @ts-ignore
      setCustomer(param);
      //@ts-ignore
      api.get(`/users/${param}`).then(res => {
        setPoster(res.data);
      })
  }, [poster])

  /**
   * Get all posts that posted by poster whose id is poster.
   */
  useEffect(() => {
      //@ts-ignore
      if (poster._id) {
        //@ts-ignore
        setPosteravatar(poster.avatar)
        //@ts-ignore
        api.get(`/posts/poster/${poster._id}`).then(res => {
          setPosts(res.data);
        }).catch(err => {
          console.log('Error', err);
        })
      }  
  }, [poster])

  if (posteravatar) {
    return (
      <div className='bg-main-bg-color'>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
          <Link href={'/keys'} className='border border-[#E7EAF0] rounded-lg py-2 px-4 flex items-center gap-2 w-fit bg-white'>
                  <Image src={'/icons/arrow-left.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 opacity-90' />
                  <h2 className='text-primary font-medium text-base leading-[24px]'>
                      Back
                  </h2>
              </Link>
              <div className='flex flex-col gap-4 p-4 bg-white w-full max-sm:justify-center'>
                <div className='flex justify-between w-full items-start max-sm:justify-center'>
                  <Image src={posteravatar} width={100} height={100} alt='Default avatar' className='w-25 h-25 rounded-full' />
                  <div className='flex gap-4 max-sm:hidden'>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/twitter.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/share.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                  </div>
                </div>
                <div className='flex justify-between items-center max-sm:justify-center max-sm:flex-col'>
                  <div className='flex flex-col gap-[7px] max-sm:justify-center'>
                    <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                      <span>{poster.username}</span>
                      <span className='bg-[#4C9B42] w-[7px] h-[7px] rounded-full'></span>
                    </div>
                    <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                      <div className="flex gap-2 max-sm:flex-col items-center">
                        <span>Last message sent 9d ago</span>
                        <span className='max-sm:hidden'>-</span>
                        <span>Keys <span className='text-[#9E2D2F] font-medium'>0.719 ADA</span> in the past 7 days</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-[7px] max-sm:hidden'>
                    <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                      <span>{poster.price}</span>
                      <Image src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
                    </div>
                    <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                      Key Price
                    </div>
                  </div>
                </div>
                <div className='flex justify-between w-full items-center'>
                  <div className='flex items-center gap-4 max-sm:gap-2'>
                    <div className='flex flex-col items-center text-center'>
                      <h1 className='font-bold text-base leading-6'>
                        { 
                          //@ts-ignore
                          poster.holding.length
                        }
                      </h1>
                      <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                        Holding
                      </h2>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                      <h1 className='font-bold text-base leading-6'>
                        {
                          //@ts-ignore
                          poster.holder.length
                        }
                      </h1>
                      <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                        Holder
                      </h2>
                    </div>
                    {/* <div className='flex flex-col items-center text-center'>
                      <h1 className='font-bold text-base leading-6'>
                        100
                      </h1>
                      <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                        WatchList
                      </h2>
                    </div> */}
                  </div>
                  <div className='flex gap-2 items-center max-sm:hidden'>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/side_inbox_active.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                    <button className='px-8 py-2 rounded-lg bg-secondary max-sm:w-full max-w-[200px]' onClick={ () => setModal(true)}>
                      <div className='flex gap-4 items-center justify-center sm:justify-start'>
                        <h1 className='text-white font-semibold leading-[24px] text-center text-base'>
                          Buy
                        </h1>
                      </div>
                    </button>
                  </div>
                  <div className='flex flex-col gap-[7px] min-[640px]:hidden'>
                    <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                      <span>10,890</span>
                      <Image src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
                    </div>
                    <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                      Key Price
                    </div>
                  </div>
                </div>
                <div className='flex w-full gap-2 items-center min-[640px]:hidden'>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                    <div className='p-2 rounded-lg border border-border-color'>
                      <Image src={'/icons/side_inbox_active.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </div>
                    <button className='px-8 py-2 rounded-lg bg-secondary max-sm:w-full' onClick={ () => setModal(true)}>
                      <div className='flex gap-4 items-center justify-center sm:justify-start'>
                        <h1 className='text-white font-semibold leading-[24px] text-center text-base'>
                          Buy
                        </h1>
                      </div>
                    </button>
                </div>
              </div>
  
              <div className='flex gap-2 overflow-x-auto'>
                <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 0? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(0)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='font-medium leading-[32px] text-center text-base'>
                      Post
                    </h1>
                  </div>
                </button>
                <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 1? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(1)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='font-medium leading-[32px] text-center text-base'>
                      Keys
                    </h1>
                  </div>
                </button>
                <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 2? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(2)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='font-medium leading-[32px] text-center text-base'>
                      Trades
                    </h1>
                  </div>
                </button>
                <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 3? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(3)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='font-medium leading-[32px] text-center text-base'>
                      Holders
                    </h1>
                  </div>
                </button>
                <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 4? 'bg-secondary text-white':' border-border-color border bg-white text-primary'}`} onClick={() => setCurrentTab(4)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='font-medium leading-[32px] text-center text-base'>
                      Holding
                    </h1>
                  </div>
                </button>
              </div>
  
            {
              posts.length != 0 && posts.map((post, index) => {
                return (
                  <div key={index}>
                    <PostCard display_name={post.poster_id.screen_name} username={post.poster_id.username} avatar={post.poster_id.avatar} created_at={post.created_at} content={post.content} />
                  </div>
                )
              })
            }
          </div>
          <SideBarRight />
        </div>
        <BottomNav />
        {
          poster && <KeyModal show={modalshow} closeModal={closeModal} openModal={openModal} owner={poster} />
        }
      </div>
    )
  }
}

export default Key;



