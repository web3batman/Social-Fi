"use client"
import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { Aclonica } from 'next/font/google';
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router';
import { UserContext } from '@/contexts/UserProvider';

import Modal from './walletmodal';

import Switcher from './button/Switcher';

const aclonica = Aclonica({
  weight: '400',
  subsets: ['latin']
})


const LandingHeader = () => {
  const router = useRouter();
  const [navshow, setNavshow] = useState(false);

  const [wallet, setWallet] = useState(true);
  const [dark, setDark] = useState(false);
  const [theme, setTheme] = useState<string>();

  // @ts-ignore
  const { myProfile } = useContext(UserContext);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme) {
      setTheme(theme);
    }
  }, [dark])

  const settheme = () => {
    setDark(!dark);
  }

  return (
    <div className='px-5 md:px-10 py-4 sm:py-[22px] flex justify-between items-center max-w-[1240px] w-full flex-wrap dark:text-white'>
      <div className='flex gap-2 items-center justify-center cursor-pointer' onClick={() => { router.push('/') }}>
        <Image quality={100} src={'/icons/logo.svg'} width={100} height={100} alt='logo' className='w-[43.243px] sm:w-[64.865px] h-8 sm:h-12' />
        <h1 className={`text-[14px] sm:text-[18px] font-normal leading-[normal] text-primary dark:text-white ${aclonica.className} w-[73px] sm:w-[94px]`}>
          The sahara
        </h1>
      </div>
      <div className='flex gap-6 max-sm:hidden'>
        {/* <Link href={'/home'} className='text-primary font-medium leading-6 text-center cursor-pointer'>
          Home
        </Link>
        <span>.</span> */}
        {/* <Link href={'/about'} className='text-primary dark:text-white font-medium leading-6 text-center cursor-pointer'>
          About
        </Link> */}
        {/* <span>.</span>
        <Link href={'/inbox'} className='text-primary font-medium leading-6 text-center text-base cursor-pointer'>
          Community
        </Link> */}
      </div>
      <div className='flex gap-2 items-center'>
      {
        myProfile.avatar && !myProfile.verified && <Image quality={100} src={theme == 'dark' ?'/icons/wallet.svg':'/icons/wallet_dark.svg'} width={'100'} height={'100'} alt='Cardano avatar' className='w-6 h-6 sm:w-10 sm:h-10 cursor-pointer' onClick={() => setWallet(true)} />
      }
        {
          myProfile.avatar ? (
            <div className='flex gap-1 items-center'>
              <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary'>
                <div className='flex gap-2 items-center'>
                  <Image quality={100} src={ myProfile.avatar} width={100} height={100} alt='Twitter logo' className='w-[12px] sm:w-[24px] h-[12px] sm:h-[24px]' />
                  <h1 className='text-white font-medium leading-6 text-center text-[12px] sm:text-base'>
                    {myProfile.username}
                  </h1>
                </div>
              </button>
            </div>
          ) : (
            // <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary' onClick={() => { signIn('twitter') }}>
            //   {/* <button className='px-2 sm:px-6 py-1 sm:py-3 rounded-lg bg-secondary' onClick={() => { router.push('/home') }}> */}
            //   <div className='flex gap-2 items-center'>
            //     <Image quality={100} src={'/icons/x_logo.svg'} width={100} height={100} alt='Twitter logo' className='w-[12px] sm:w-[24px] h-[12px] sm:h-[24px]' />
            //     <h1 className='text-white font-medium leading-6 text-center text-[12px] sm:text-base'>
            //       Login with X
            //     </h1>
            //   </div>
            // </button>
            <></>
          )
        }
        <Switcher size='18px' setDarkMode={settheme} />
        <span className='w-9 h-9 rounded-full flex justify-center items-center border border-[#E7EAF0] dark:border-dark-border bg-[#F9FAFC] dark:bg-dark-body-bg cursor-pointer sm:hidden' onClick={() => { setNavshow(!navshow) }}>
          <Image quality={100} src={'/icons/dropdown.svg'} width={100} height={100} alt='Twitter logo' className='w-5 h-5' />
        </span>
      </div>
      <div className={`flex flex-col w-full sm:hidden mt-4 border-t-[2px] duration-100 ${!navshow ? 'opacity-0' : 'opacity-100'}`}>
        {/* <Link href={'/home'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          Home
        </Link>
        <Link href={'/about'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          About
        </Link>
        <Link href={'/inbox'} className='text-primary font-medium leading-6 p-2 cursor-pointer hover:bg-secondary'>
          Community
        </Link> */}
      </div>
      {
        myProfile.avatar && !myProfile.verified && (
          <Modal show={wallet} closeModal={() => setWallet(false)} confirm={true} verify={true} />
        )
      }
    </div>
  )
}

export default LandingHeader;