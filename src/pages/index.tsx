'use client'
import Image from 'next/image';
// import type Session
import { signIn } from 'next-auth/react'
import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>The Sahara - Your Digital Oasis</title>
        <meta name="description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta property="og:url" content="https://beta.sahara.social" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="The Sahara - Your Digital Oasis" />
        <meta property="og:description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta property="og:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="beta.sahara.social" />
        <meta property="twitter:url" content="https://beta.sahara.social" />
        <meta name="twitter:title" content="The Sahara - Your Digital Oasis" />
        <meta name="twitter:description" content="It's easier to connect with the world of Web3 with The Sahara" />

        <meta name="twitter:image" content="https://ogcdn.net/e4b8c678-7bd5-445d-ba03-bfaad510c686/v3/beta.sahara.social/The%20Sahara%20-%20Your%20Digital%20Oasis/https%3A%2F%2Fopengraph.b-cdn.net%2Fproduction%2Fdocuments%2Fb390c4c6-8e14-44a8-98c1-d0044f395955.png%3Ftoken%3D_TIUOPWQbhS6yEPfuj9XhjVOp4BbM5ZBTzs-a388oGQ%26height%3D720%26width%3D1200%26expires%3D33241297867/og.png" />
      </Head>
      <div className='px-5 md:px-10 flex justify-between items-center max-w-[1240px] w-full'>
        <div className='flex items-center w-full flex-col sm:flex-row'>
          <div className='flex flex-col gap-[56px] w-[100%] sm:w-[48%]'>
            <div className='flex flex-col gap-4'>
              <h1 className='text-[56px] sm:text-7xl font-bold leading-[64px] sm:leading-[81px] capitalize text-primary dark:text-white'>
                Your digital oasis
              </h1>
              <h2 className='text-primary-1 text-[24px] font-normal leading-8 dark:text-white'>
                It&apos;s easier to connect with the world of Web3 with The Sahara
              </h2>
            </div>
            <div className='flex w-full max-sm:mb-[56px]'>
              <button className='px-8 py-4 rounded-lg bg-secondary max-sm:w-full' onClick={() => signIn('twitter', { callbackUrl: "/home" })}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <Image quality={100} src={'/icons/x_logo.svg'} width={100} height={100} alt='Twitter logo' className='w-[32px] h-[32px]' />
                  <h1 className='text-white font-medium leading-[32px] text-center text-[24px]'>
                    Login with X
                  </h1>
                </div>
              </button>
            </div>
          </div>
          <div className='sm:bg-[url("/images/cardano_bg.png")] dark:sm:bg-[url("/images/cardano_bg_dark.svg")] bg-[top_right]'>
            <Image quality={100} src={'/images/ex_page.svg'} width={'100'} height={'100'} alt='example page' className='w-full dark:hidden' />
            <Image quality={100} src={'/images/ex_page_dark.svg'} width={'100'} height={'100'} alt='example page' className='w-full hidden dark:block' />
          </div>
        </div>
      </div>
    </>
  )
}
