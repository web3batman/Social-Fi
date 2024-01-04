"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import styles from './header.module.css';
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserProvider';
import setAuthToken from '@/constants/setAuthToken';
import Link from 'next/link'

import Switcher from './button/Switcher';

import useDarkSide from '@/hooks/useDarkMode';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin']
})

const Header = () => {

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)
  const router = useRouter();
  const [avatar, setAvatar] = useState('/avatars/default_profile_normal.png');

  const [proper, setProper] = useState(false);
  // Assuming useDarkSide hook returns a 'light' or 'dark' string
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === 'light');

  const toggleDarkMode = (checked: boolean): void => {
    setTheme(colorTheme); // You might want to toggle the theme instead of setting it to the current value
    setDarkSide(checked);
  };

  // Sign out function
  const logout = () => {
    signOut();
    setAuthToken(false);
    // router.push('/');
  }

  useEffect(() => {
    console.log('darkside', darkSide)
  }, [darkSide])

  return (
    <div className='w-full dark:bg-dark-header-bg'>
      <div className='px-5 md:px-10 py-4 sm:py-[22px] flex justify-between max-sm:gap-6 items-center max-w-[1240px] bg-white dark:bg-[#2D3136] mx-auto'>
        <Link href={'/home'} className='flex gap-2 items-center justify-center cursor-pointer'>
          <Image quality={100} src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
          <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary dark:text-white ${aclonica.className} w-[73px] sm:w-[94px]`}>
            The sahara
          </h1>
        </Link>
        <div className='flex gap-2 items-center'>
          <input type="text" className={`max-md:hidden w-[300px] border px-8 py-2 rounded-[100px] border-solid border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg dark:text-dark-font-1 bg-[url("/icons/search.svg")] bg-no-repeat ${styles.searchinput}`} placeholder='Search' />
          <div className='md:hidden p-2 bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border rounded-full cursor-pointer hover:bg-border-color' onClick={() => { router.push('/notifications') }}>
            <Image quality={100} src={'/icons/side_ring.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6 cursor-pointer hover:border' />
          </div>
          <div className='max-md:hidden relative flex items-center gap-2 border pl-2 pr-4 py-2 rounded-[100px] border-solid border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg cursor-pointer'>
            <Image quality={100} src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
            <span className='text-center text-base not-italic font-semibold leading-6 text-primary dark:text-white'>
              {
                Math.floor(myProfile.balance * 100) / 100
              }
            </span>
          </div>
          <div className='relative flex gap-2 items-center' onMouseOver={() => { setProper(true) }} onMouseLeave={() => { setProper(false) }}>
            <Image quality={100} src={myProfile.avatar ? myProfile.avatar : avatar} width={'100'} height={'100'} alt='Default avatar' className='w-10 h-10 rounded-full border-2 border-solid border-[#E7EAF0] dark:border-dark-border cursor-pointer' />

            <div className={`absolute bottom-0 bg-slate-50 dark:bg-dark-header-bg translate-y-full -translate-x-[60%] ${proper ? "" : "hidden"} rounded-lg border border-gray-400`}>
              <ul className='text-center w-[150px] text-[14px] text-primary dark:text-white min-w-[100px]'>
                <li className='py-3 px-2 text-center hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer' onClick={() => router.push(`/keys/${myProfile._id}`)}>
                  <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full'>
                    My account
                  </div>
                </li>
                <li className='py-2 px-2 md:hidden hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer'>
                  <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full flex gap-2 items-center'>
                    <Image quality={100} src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
                    <span className='text-base not-italic font-semibold leading-6 text-primary dark:text-white'>
                      {
                        Math.floor(myProfile.balance * 100) / 100
                      }
                    </span>
                  </div>
                </li>
                <li className='py-2 px-2 md:hidden hover:bg-grey-4 dark:hover:bg-dark-body-bg cursor-pointer' onClick={() => toggleDarkMode(!darkSide)}>
                  <div className='w-full py-2 px-2 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-dark-border rounded-full flex gap-2 items-center'>
                    <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} moonColor='#E8E9E9' sunColor='#4B3A41' />
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
          <Switcher size='12px' />
        </div>
      </div>
    </div>
  )
}

export default Header;