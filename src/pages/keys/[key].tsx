import React, { useState, useEffect, useContext } from 'react'
import Sidebar from '@/components/sidebar';
import SideBarRight from '@/components/sidebar_right';
import PostCard from './postcard';
import BottomNav from '@/components/bottom_nav';
import Link from 'next/link';
import { UserContext } from '@/contexts/UserProvider';
import api from '../../constants/auth';
import Image from 'next/image';
import { useRouter } from 'next/router';
import KeyModal from '@/components/keymodal';
import Keycard from './keycard';
import toast from 'react-hot-toast';

interface Profile {
  avatar?: string;
  username?: string;
  screen_name?: string;
  online_status?: boolean;
  price?: number;
  holding?: Holder[];
  holder?: Holder[];
  _id?: string;
  keyCount?: number;
  point?: number;
}

interface Holder {
  avatar?: string;
  username?: string;
  onlin_status?: boolean;
}


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
  view: string[]
}

const Key = () => {

  const router = useRouter();

  const [posts, setPosts] = useState<Post[]>([]);

  const [poster, setPoster] = useState<Profile>({});
  const [posteravatar, setPosteravatar] = useState('');
  const [customer, setCustomer] = useState<string>();

  const [holding, setHolding] = useState<{ count: number, userid: { avatar: string, _id: string, username: string, screen_name: string, price: number } }[]>();
  const [holder, setHolder] = useState<{ count: number, userid: { avatar: string, _id: string, username: string, screen_name: string, price: number } }[]>();

  const [modalshow, setModal] = useState<true | false>(false);

  //@ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

  const [keyCount, setKeyCount] = useState<number>();


  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  const [currentTab, setCurrentTab] = useState(0);

  const getKeyCount = () => {
    //@ts-ignore
    api.get(`/keys/${poster._id}`).then(res => {
      setKeyCount(res.data);
    }).catch(err => toast.error(err))
  }

  const toChatRoom = () => {
    if (keyCount == 0) {
      if (myProfile._id == poster._id) {
        router.push(`/inbox/${poster._id}`)
      } else {
        toast.error("You don't have any key. Please buy one.");
        setModal(true)
      }
    } else {
      router.push(`/inbox/${poster._id}`)
    }
  }


  // Get post information
  useEffect(() => {
    if (router) {
      getDate()
    }

  }, [router])
  useEffect(() => {
    if (poster && poster._id) {
      getPostData()
    }
  }, [poster])


  const getDate = async () => {
    const param = router.query.key;
    if (param) {
      // @ts-ignore
      setCustomer(param);
      //@ts-ignore
      await api.get(`/users/${param}`).then(res => {
        setPoster(res.data);
        setHolder(res.data.holder);
        setHolding(res.data.holding);
      })
    }
  }

  const getPostData = async () => {
    //@ts-ignore
    if (poster._id) {
      //@ts-ignore
      setPosteravatar(poster.avatar)
      //@ts-ignore
      await api.get(`/posts/poster/${poster._id}`).then(res => {
        setPosts(res.data);
      }).catch(err => {
        console.log('Error', err);
      })
      getKeyCount();
    }
  }



  if (posteravatar) {
    return (
      <div className='bg-main-bg-color dark:bg-dark-body-bg dark:text-white'>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-lg:grow max-md:mb-[110px] min-h-[calc(100vh-140px)] w-full'>
            <div onClick={() => {
              window.history.back()
            }} className='border border-[#E7EAF0] dark:border-dark-border dark:bg-dark-header-bg rounded-lg py-2 px-4 flex items-center gap-2 w-fit bg-white cursor-pointer'>
              <Image quality={100} src={'/icons/arrow-left.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 opacity-90' />
              <h2 className='text-primary dark:text-white font-medium text-base leading-[24px]'>
                Back
              </h2>
            </div>
            <div className='flex flex-col gap-4 p-4 bg-white dark:bg-dark-header-bg w-full max-sm:justify-center'>
              <div className='flex justify-between w-full items-start max-sm:justify-center'>
                <Image quality={100} src={posteravatar} width={100} height={100} alt='Default avatar' className='w-25 h-25 rounded-full' />
                <div className='flex gap-4 max-sm:hidden'>
                  <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <a href={`http://x.com/${poster.screen_name}`} target="_blank" rel="noopener noreferrer">
                      <Image quality={100} src={'/icons/twitter.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </a>
                  </div>
                </div>
              </div>
              <div className='flex justify-between items-center max-sm:justify-center max-sm:flex-col'>
                <div className='flex flex-col gap-[7px] max-sm:justify-center'>
                  <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                    <span>{poster.username}</span>
                    {/* <span className='bg-[#4C9B42] w-[7px] h-[7px] rounded-full'></span> */}
                  </div>
                  <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                    {/* <div className="flex gap-2 max-sm:flex-col items-center">
                        <span>Last message sent 9d ago</span>
                        <span className='max-sm:hidden'>-</span>
                        <span>Keys <span className='text-[#9E2D2F] font-medium'>0.719 ADA</span> in the past 7 days</span>
                      </div> */}
                  </div>
                </div>
                <div className='flex flex-col gap-[7px] max-sm:hidden'>
                  <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                    <span>{poster.price}</span>
                    <Image quality={100} src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
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
                      } / {
                        poster.keyCount
                      }
                    </h1>
                    <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                      Holder
                    </h2>
                  </div>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='font-bold text-base leading-6'>
                      {poster.point ? poster.point : '0'}
                    </h1>
                    <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                      Points
                    </h2>
                  </div>
                </div>
                <div className='flex gap-2 items-center max-sm:hidden'>
                  {/* <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <Image quality={100} src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                  </div> */}
                  <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <Image quality={100} src={'/icons/side_inbox_active.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full cursor-pointer' onClick={toChatRoom} />
                  </div>
                  <button className='px-8 py-2 rounded-lg bg-secondary max-sm:w-full max-w-[200px]' onClick={() => setModal(true)}>
                    <div className='flex gap-4 items-center justify-center sm:justify-start'>
                      <h1 className='text-white font-semibold leading-[24px] text-center text-base'>
                        Buy / Sell
                      </h1>
                    </div>
                  </button>
                </div>
                <div className='flex flex-col gap-[7px] min-[640px]:hidden'>
                  <div className='text-base font-bold leading-[24px] flex items-center gap-2'>
                    <span>{poster.price}</span>
                    <Image quality={100} src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
                  </div>
                  <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                    Key Price
                  </div>
                </div>
              </div>
              <div className='flex w-full justify-between items-center min-[640px]:hidden'>
                <div className='flex gap-2'>
                  {/* <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <Image quality={100} src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                  </div> */}
                  <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <Image quality={100} src={'/icons/side_inbox_active.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full cursor-pointer' onClick={toChatRoom} />
                  </div>
                  <div className='p-2 rounded-lg border border-border-color dark:border-dark-border'>
                    <a href={`http://x.com/${poster.screen_name}`} target="_blank" rel="noopener noreferrer">
                      <Image quality={100} src={'/icons/twitter.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 rounded-full' />
                    </a>
                  </div>
                </div>
                <button className='px-8 py-2 rounded-lg bg-secondary' onClick={() => setModal(true)}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='text-white font-semibold leading-[24px] text-center text-base'>
                      Buy / Sell
                    </h1>
                  </div>
                </button>
              </div>
            </div>

            <div className='flex gap-2 overflow-x-auto scrollbar-none'>
              <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 0 ? 'bg-secondary text-white' : ' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCurrentTab(0)}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='font-medium leading-[32px] text-center text-base'>
                    Post
                  </h1>
                </div>
              </button>
              <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 1 ? 'bg-secondary text-white' : ' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCurrentTab(1)}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='font-medium leading-[32px] text-center text-base'>
                    Keys
                  </h1>
                </div>
              </button>
              <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 2 ? 'bg-secondary text-white' : ' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCurrentTab(2)}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='font-medium leading-[32px] text-center text-base'>
                    Trades
                  </h1>
                </div>
              </button>
              <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 3 ? 'bg-secondary text-white' : ' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCurrentTab(3)}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='font-medium leading-[32px] text-center text-base'>
                    Holders
                  </h1>
                </div>
              </button>
              <button className={`px-2 lg:px-6 py-1 lg:py-2 rounded-lg max-sm:w-full ${currentTab == 4 ? 'bg-secondary text-white' : ' border-border-color dark:border-dark-border border bg-white dark:bg-dark-header-bg text-primary dark:text-white'}`} onClick={() => setCurrentTab(4)}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='font-medium leading-[32px] text-center text-base'>
                    Holding
                  </h1>
                </div>
              </button>
            </div>

            {
              currentTab == 0 && posts.length != 0 && posts.map((post, index) => {
                return (
                  <div key={index}>
                    <PostCard post={post} />
                  </div>
                )
              })
            }
            <div className='flex flex-col gap-4 w-full'>
              {
                currentTab == 2 && holder?.length != 0 && holder?.map((user: any, index) => {
                  if (user && user.userid && user.userid._id) {
                    return <Keycard key={index} id={user.userid._id} avatar={user.userid.avatar} username={user.userid.username} screen_name={user.userid.screen_name} price={user.userid.price} count={user.count} />
                  }
                })
              }
              {
                currentTab == 1 && holding?.length != 0 && holding?.map((user: any, index) => {
                  if (user && user.userid && user.userid._id) {
                    return <Keycard key={index} id={user.userid._id} avatar={user.userid.avatar} username={user.userid.username} screen_name={user.userid.screen_name} price={user.userid.price} count={user.count} />
                  }
                })
              }
              {
                currentTab == 3 && holder?.length != 0 && holder?.map((user: any, index) => {
                  if (user && user.userid && user.userid._id) {
                    return <Keycard key={index} id={user.userid._id} avatar={user.userid.avatar} username={user.userid.username} screen_name={user.userid.screen_name} price={user.userid.price} />
                  }
                })
              }
              {
                currentTab == 4 && holding?.length != 0 && holding?.map((user: any, index) => {
                  if (user && user.userid && user.userid._id) {
                    return <Keycard key={index} id={user.userid._id} avatar={user.userid.avatar} username={user.userid.username} screen_name={user.userid.screen_name} price={user.userid.price} />
                  }
                })
              }
            </div>
          </div>
          <SideBarRight />
        </div>
        <BottomNav />
        {
          poster && keyCount != undefined && <KeyModal show={modalshow} closeModal={closeModal} openModal={openModal} owner={poster} keyCount={keyCount} />
        }
      </div>
    )
  }
}

export default Key;



