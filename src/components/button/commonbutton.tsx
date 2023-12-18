import React from 'react';
import Image from 'next/image';

const CommonButton = () => {
  return (
    <button className='px-8 py-4 rounded-lg bg-secondary max-sm:w-full'>
      <div className='flex gap-4 items-center justify-center sm:justify-start'>
        <Image quality={100} src={'/icons/x_logo.svg'} width={100} height={100} alt='Twitter logo' className='w-[32px] h-[32px]' />
        <h1 className='text-white font-medium leading-[32px] text-center text-[24px]'>
          Login with X
        </h1>
      </div>
    </button>
  )
}

export default CommonButton