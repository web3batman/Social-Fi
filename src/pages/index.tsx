'use client'
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
// import type Session
import { signIn } from 'next-auth/react'
import { UserContext } from '@/contexts/UserProvider';
import { useRouter } from 'next/router';


export default function Home() {

  //@ts-ignore
  const { myProfile } = useContext(UserContext)
  const router = useRouter();

  const [loginBtn, setLoginBtn] = useState(true);

  useEffect(() => {
    const invite = router.query.invite;
    if (invite) {
      //@ts-ignore
      window.localStorage.setItem('inviter', invite)
      signIn('twitter', { callbackUrl: '/' })
    }
    if (myProfile) {
      if (myProfile.verified) {
        setLoginBtn(false);
      }
    }
  }, [])

  return (
    <div className='px-5 md:px-10 flex justify-between items-center max-w-[1240px] w-full'>
      <div className='flex items-center w-full flex-col sm:flex-row'>
        <div className='flex flex-col gap-[56px] w-[100%] sm:w-[48%]'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-[56px] sm:text-7xl font-bold leading-[64px] sm:leading-[81px] capitalize text-primary dark:text-white'>
              Your digital oasis
            </h1>
            <div className='flex w-full max-sm:mb-[56px] text-secondary text-[24px]'>
              The Sahara is undergoing maintenance we will be live again soon
            </div>
          </div>
          {
            loginBtn ? (
              <div className='flex w-full max-sm:mb-[56px]'>
                {/* <button className='px-8 py-4 rounded-lg bg-secondary max-sm:w-full' onClick={() => signIn('twitter')}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <Image quality={100} src={'/icons/x_logo.svg'} width={100} height={100} alt='Twitter logo' className='w-[32px] h-[32px]' />
                    <h1 className='text-white font-medium leading-[32px] text-center text-[24px]'>
                      Login with X
                    </h1>
                  </div>
                </button> */}
              </div>
            ) : (
              <div className='flex w-full max-sm:mb-[36px]'>
                <h2 className='text-primary-1 text-[24px] font-medium leading-8 dark:text-white'>
                  You have to deposit 10 Ada for verification
                </h2>
              </div>
            )
          }
        </div>
        <div className='sm:bg-[url("/images/cardano_bg.png")] dark:sm:bg-[url("/images/cardano_bg_dark.svg")] bg-[top_right]'>
          <Image quality={100} src={'/images/ex_page.svg'} width={'100'} height={'100'} alt='example page' className='w-full dark:hidden' />
          <Image quality={100} src={'/images/ex_page_dark.svg'} width={'100'} height={'100'} alt='example page' className='w-full hidden dark:block' />
        </div>
      </div>
    </div>
  )
}
