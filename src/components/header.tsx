"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import styles from './header.module.css';
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserProvider';
import setAuthToken from '@/pages/api/setAuthToken';
import Link from 'next/link'

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


  // Sign out function
  const logout = () => {
    signOut();
    setAuthToken(false);
    // router.push('/');
  }

  return (
    <div className='w-full'>
      <div className='px-5 md:px-10 py-4 sm:py-[22px] flex justify-between max-sm:gap-6 items-center max-w-[1240px] bg-white mx-auto'>
        <Link href={'/home'} className='flex gap-2 items-center justify-center cursor-pointer'>
          <Image src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
          <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary ${aclonica.className} w-[73px] sm:w-[94px]`}>
            The sahara
          </h1>
        </Link>
        <div className='flex gap-2 items-center'>
          <input type="text" className={`max-md:hidden w-[300px] border px-8 py-2 rounded-[100px] border-solid border-[#E7EAF0] bg-[#F9FAFC] bg-[url("/icons/search.svg")] bg-no-repeat ${styles.searchinput}`} placeholder='Search' />
          <div className='md:hidden p-2 bg-main-bg-color border border-border-color rounded-full cursor-pointer hover:bg-border-color' onClick={() => { router.push('/notifications') }}>
            <Image src={'/icons/side_ring.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6 cursor-pointer hover:border' />
          </div>
          <div className='relative flex items-center gap-2 border pl-2 pr-4 py-2 rounded-[100px] border-solid border-[#E7EAF0] bg-[#F9FAFC] cursor-pointer'>
            <Image src={'/icons/cardano.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6' />
            <span className='text-center text-base not-italic font-semibold leading-6 text-primary'>
              {
                Math.floor(myProfile.balance * 100) / 100
              }
            </span>
          </div>
          <div className='relative' onMouseOver={() => { setProper(true) }} onMouseLeave={() => { setProper(false) }}>
            <Image src={myProfile.avatar ? myProfile.avatar : avatar} width={'100'} height={'100'} alt='Default avatar' className='w-10 h-10 rounded-full border-2 border-solid border-[#E7EAF0] cursor-pointer' />
            <div className={`absolute bottom-0 bg-slate-50 translate-y-full -translate-x-[60%] ${proper ? "" : "hidden"}`}>
              <ul className='border border-gray-400 text-[12px] text-primary rounded-lg min-w-[100px]'>
                <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer' onClick={() => router.push(`/keys/${myProfile._id}`)}>
                  My account
                </li>
                <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer' onClick={() => logout()}>
                  Sign Out
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header;