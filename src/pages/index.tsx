'use client'
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
// import type Session
import { signIn } from 'next-auth/react'
import { UserContext } from '@/contexts/UserProvider';
import { useRouter } from 'next/router';


export default function Home() {
  return (
    <div className='px-5 md:px-10 flex justify-between items-center max-w-[1240px] w-full'>
      <div className='flex items-center w-full flex-col sm:flex-row'>
        <div className='flex flex-col gap-[24px] w-[100%] sm:w-[48%]'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-[56px] sm:text-7xl font-bold leading-[64px] sm:leading-[81px] capitalize text-primary dark:text-white'>
              Your digital oasis
            </h1>
            <h2 className='text-primary-1 text-[24px] font-normal leading-8 dark:text-white'>
              It&apos;s easier to connect with the world of Web3 with The Sahara
            </h2>
          </div>

          <div className='flex w-full max-sm:mb-[56px] text-secondary text-[24px]'>
            The Sahara is undergoing maintenance we will be live again soon
          </div>

        </div>
        <div className='sm:bg-[url("/images/cardano_bg.png")] dark:sm:bg-[url("/images/cardano_bg_dark.svg")] bg-[top_right]'>
          <Image quality={100} src={'/images/ex_page.svg'} width={'100'} height={'100'} alt='example page' className='w-full dark:hidden' />
          <Image quality={100} src={'/images/ex_page_dark.svg'} width={'100'} height={'100'} alt='example page' className='w-full hidden dark:block' />
        </div>
      </div>
    </div>
  )
}
