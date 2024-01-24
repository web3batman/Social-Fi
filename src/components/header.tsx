"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import styles from './header.module.css';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserProvider';
import { SearchContext } from '@/contexts/SearchProvider';
import setAuthToken from '@/constants/setAuthToken';
import Link from 'next/link'

import Switcher from './button/Switcher';
import { IoMdClose } from 'react-icons/io'

import useDarkSide from '@/hooks/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import api from '@/constants/auth';

import ReferModal from './referModal';

const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin']
})

const Header = () => {
  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)
  // @ts-ignore
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const [searchState, setSearchState] = useState(false);
  const router = useRouter();
  const [avatar, setAvatar] = useState('/avatars/default_profile_normal.png');

  const [proper, setProper] = useState(false);
  // Assuming useDarkSide hook returns a 'light' or 'dark' string
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'dark');
  const [referModal, setReferModal] = useState(false);

  const [needSearch, setNeedSearch] = useState(false);

  const [dark, setDark] = useState(colorTheme === 'light');

  const [isnoti, setNoti] = useState(false);


  useEffect(() => {
    if(router){
      getNotis()
    }
  }, [router])

  const getNotis = async()=>{
    const theme = localStorage.getItem('theme');
    setSearchInput('');
    if (theme) {
      setTheme(theme);
    }
    const currentPage = router.pathname;
    if (currentPage == '/search') {
      setNeedSearch(true);
    } else {
      setNeedSearch(false)
    }
    setSearchState(false)
    await api.get('/notifications/isnoti').then(
      res => {
        setNoti(res.data.state)
      }
    ).catch(err => {
      console.log("There is an error.", err)
    })
  }


  const settheme = () => {
    setDark(!dark);
  }

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme); // You might want to toggle the theme instead of setting it to the current value
    setDarkSide(checked);
  };

  // Sign out function
  const logout = () => {
    signOut();
    setAuthToken(false);
  }

  const openReferModal = () => {
    setReferModal(true)
  }

  const showSearchInput = () => {
    setSearchState(!searchState)
  }


  return (
    <div className='w-full dark:bg-dark-header-bg'>
      <div className={`px-5 md:px-10 py-4 ${!searchState ? 'max-sm:gap-6' : 'max-sm:gap-2'} sm:py-[22px] flex justify-between items-center max-w-[1240px] bg-white dark:bg-[#2D3136] mx-auto`}>
        {
          !searchState && (
            <Link href={'/home'} className='flex gap-2 items-center justify-center cursor-pointer'>
              <Image quality={100} src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
              <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary dark:text-white ${aclonica.className} w-[73px] sm:w-[94px]`}>
                The sahara
              </h1>
            </Link>
          )
        }
        {
          searchState && <input type="text" className={`w-full md:hidden border px-8 py-2 rounded-[100px] border-solid border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg dark:text-dark-font-1 bg-[url("/icons/search.svg")] bg-no-repeat ${styles.searchinput}`} placeholder='Search' name='Search input' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
        }
        <div className='flex gap-2 items-center'>
          {
            needSearch && <input type="text" className={`max-md:hidden w-[300px] border px-8 py-2 rounded-[100px] border-solid border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg dark:text-dark-font-1 bg-[url("/icons/search.svg")] bg-no-repeat ${styles.searchinput}`} placeholder='Search' name='Search input' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
          }
          <div className='max-md:hidden p-2 bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border rounded-full cursor-pointer hover:bg-border-color' onClick={openReferModal}>
            <Image quality={100} src={!dark ? '/icons/user-add-white.svg' : '/icons/user-add-dark.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
          </div>
          {
            searchState && (
              <div className='md:hidden p-2 bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border rounded-full cursor-pointer hover:bg-border-color w-[42px]' onClick={showSearchInput}>
                <IoMdClose size={24} color={dark ? 'white' : 'black'} />
              </div>
            )
          }
          {
            !searchState && needSearch && (
              <div className='md:hidden p-2 bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border rounded-full cursor-pointer hover:bg-border-color' onClick={showSearchInput}>
                <Image quality={100} src={'/icons/search.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6 cursor-pointer' />
              </div>
            )
          }
          {
            !searchState && (
              <div className='md:hidden p-2 bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border rounded-full cursor-pointer hover:bg-border-color relative' onClick={() => { router.push('/notifications') }}>
                <Image quality={100} src={'/icons/side_ring.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6 cursor-pointer' />
                {
                  isnoti && (
                    <div className='absolute rounded-full text-white text-[7px] border border-white top-0 right-0 bg-[#EB5757] text-center w-4 h-4'>

                    </div>
                  )
                }
              </div>
            )
          }
          <div className='max-md:hidden relative flex items-center gap-2 border pl-2 pr-4 py-2 rounded-[100px] border-solid border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg cursor-pointer'>
            <Image quality={100} src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
            <span className='text-center text-base not-italic font-semibold leading-6 text-primary dark:text-white'>
              {
                Math.floor(myProfile.balance * 100) / 100
              }
            </span>
          </div>
          {
            !searchState && (
              <div className='relative flex gap-2 items-center' onMouseOver={() => { setProper(true) }} onMouseLeave={() => { setProper(false) }}>
                <Image quality={100} src={myProfile.avatar ? myProfile.avatar : avatar} width={'100'} height={'100'} alt='Default avatar' className='w-10 h-10 rounded-full border-2 border-solid border-[#E7EAF0] dark:border-dark-border cursor-pointer' />

                <div className={`absolute z-10 bottom-0 bg-slate-50 dark:bg-dark-header-bg translate-y-full -translate-x-[70%] ${proper ? "" : "hidden"} rounded-lg border border-gray-400`}>
                  <ul className='text-center w-[180px] text-[14px] text-primary dark:text-white min-w-[100px]'>
                    <li className='py-3 px-2 text-center hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer' onClick={() => router.push(`/keys/${myProfile._id}`)}>
                      <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full'>
                        My account
                      </div>
                    </li>
                    <li className='py-2 px-2 md:hidden hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer' onClick={openReferModal}>
                      <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full flex gap-2 items-center'>
                        <Image quality={100} src={!dark ? '/icons/user-add-white.svg' : '/icons/user-add-dark.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
                        <span className='text-primary dark:text-white'>
                          Refer to Friends
                        </span>
                      </div>
                    </li>
                    <li className='py-2 px-2 md:hidden hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer'>
                      <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full flex gap-2 items-center'>
                        <Image quality={100} src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
                        <div className='w-full text-center text-primary dark:text-white'>
                          {
                            Math.floor(myProfile.balance * 100) / 100
                          }
                        </div>
                      </div>
                    </li>
                    <li className='py-2 px-2 md:hidden hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer'>
                      <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full flex gap-2 items-center'>
                        <DarkModeSwitch checked={dark} onChange={() => { toggleDarkMode(!dark); settheme() }} moonColor='#E8E9E9' sunColor='#4B3A41' />
                        <span>{darkSide ? 'Dark' : 'Light'} mode</span>
                      </div>
                    </li>
                    <li className='py-3 px-2 hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer' onClick={() => logout()}>
                      <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full'>
                        Sign Out
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )
          }
          <Switcher size='12px' setDarkMode={settheme} />
        </div>
      </div>
      <ReferModal show={referModal} closeModal={() => setReferModal(false)} />
    </div>
  )
}

export default Header;