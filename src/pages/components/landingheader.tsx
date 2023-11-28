"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import { signIn, getSession, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { UserContext } from '../../contexts/UserProvider';

const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin']
})


const LandingHeader = () => {
  const router = useRouter();
  const [navshow, setNavshow] = useState(false);

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);


  useEffect(() => {
    // @ts-ignore
    // const token = localStorage.getItem('token')

    // if (token) {
    //   router.push('/home')
    // }
  }, [])

  // const { data: session, status } = useSession();
  // const [profile, setProfile] = useState();
  // const [avatar, setAvatar] = useState('/avatars/default.svg');
  // const [username, setName] = useState();
  // const Fulldata = useContext(UserContext);

  // useEffect(() => {
  //   if (status == 'authenticated') {
  //     // @ts-ignore
  //     setProfile(session.token.token.profile);
  //   }
  // }, [session])

  // useEffect(() => {
  //   if (profile) {
  //     //@ts-ignore
  //     setAvatar(profile.profile_image_url_https)
  //     //@ts-ignore
  //     setName(profile.name)
  //     Fulldata?.setMyProfile(profile);
  //   }
  // }, [profile])

  useEffect(() => {
    console.log('my profile', myProfile)
  }, [])

  return (
    <div className='px-5 md:px-10 py-4 sm:py-[22px] flex justify-between items-center max-w-[1240px] w-full flex-wrap'>
      <div className='flex gap-2 items-center justify-center cursor-pointer' onClick={() => { router.push('/') }}>
        <Image src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
        <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary ${aclonica.className} w-[73px] sm:w-[94px]`}>
          The sahara
        </h1>
      </div>
      <div className='flex gap-6 max-sm:hidden'>
        <Link href={'/home'} className='text-primary font-medium leading-6 text-center cursor-pointer'>
          Home
        </Link>
        <span>.</span>
        <Link href={'/about'} className='text-primary font-medium leading-6 text-center cursor-pointer'>
          About
        </Link>
        <span>.</span>
        <Link href={'/inbox'} className='text-primary font-medium leading-6 text-center text-base cursor-pointer'>
          Community
        </Link>
      </div>
      <div className='flex gap-2'>
        {
          myProfile.avatar ? (
            <div className='flex gap-1 items-center'>
              <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary' onClick={() => { router.push('/home') }}>
                <div className='flex gap-2 items-center'>

                  <Image src={myProfile.avatar} width={100} height={100} alt='Twitter logo' className='w-[12px] sm:w-[24px] h-[12px] sm:h-[24px]' />
                  <h1 className='text-white font-medium leading-6 text-center text-[12px] sm:text-base'>
                    {myProfile.username}
                  </h1>
                </div>
              </button>
            </div>
          ) : (
            <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary' onClick={() => { signIn('twitter', { callbackUrl: '/home' }) }}>
              {/* <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary' onClick={() => { router.push('/home') }}> */}
              <div className='flex gap-2 items-center'>
                <Image src={'/icons/twitter_logo.png'} width={100} height={100} alt='Twitter logo' className='w-[12px] sm:w-[24px] h-[12px] sm:h-[24px]' />
                <h1 className='text-white font-medium leading-6 text-center text-[12px] sm:text-base'>
                  Login with X
                </h1>
              </div>
            </button>
          )
        }
        <span className='w-9 h-9 rounded-full flex justify-center items-center border border-[#E7EAF0] bg-[#F9FAFC] cursor-pointer sm:hidden' onClick={() => { setNavshow(!navshow) }}>
          <Image src={'/icons/dropdown.svg'} width={100} height={100} alt='Twitter logo' className='w-5 h-5' />
        </span>
      </div>
      <div className={`flex flex-col w-full sm:hidden mt-4 border-t-[2px] duration-100 ${!navshow ? 'opacity-0' : 'opacity-100'}`}>
        <Link href={'/home'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          Home
        </Link>
        <Link href={'/about'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          About
        </Link>
        <Link href={'/inbox'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          Community
        </Link>
      </div>
    </div>
  )
}

export default LandingHeader;