import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import api from '@/constants/auth';
import toast from 'react-hot-toast';
import ConfirmModal from './confirmModal';
import { UserContext } from '@/contexts/UserProvider';
import {useRouter} from 'next/router'
import Link from 'next/link'
import { useCopyToClipboard } from "@uidotdev/usehooks";

import { Saira } from 'next/font/google';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

export default function ReferModal(props: { show: boolean; closeModal: any; }) {
  const { show, closeModal } = props;

  const router = useRouter()
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [shareTxt, setShareTxt] = useState('');

  //@ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

  
  const getCopiedTxt = () => {
    copyToClipboard(shareTxt);
    toast.success('Your referral link copied!', { duration: 5000 });
  }

  useEffect(() => {
    setShareTxt(window.location.protocol + "//" + window.location.host + "?invite=" + myProfile.screen_name);
  }, [])

  return (
    <>
      <Transition appear show={show || false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className={`fixed inset-0 overflow-y-auto ${saira.className}`}>
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-lg bg-white dark:bg-dark-header-bg dark:text-white p-0 text-left align-middle shadow-xl transition-all max-w-[335px] sm:max-w-[488px]">
                  <Dialog.Title
                    as="h3"
                    className='text-lg text-[24px] font-semibold leading-8 text-primary dark:text-white p-5 flex justify-between items-center'
                  >
                    <span>
                    Your Referral Code
                    </span>
                    <span className='px-3 py-1 rounded-lg border border-border-color dark:border-dark-border cursor-pointer hover:bg-main-bg-color dark:hover:bg-dark-body-bg' onClick={closeModal}>
                      X
                    </span>
                  </Dialog.Title>
                  <div className="px-5 flex flex-col gap-4">
                    <div className='flex w-full justify-center items-center px-4'>
                        <h2 className='text-[16px] font-normal leading-[24px] text-[#738290] text-center'>
                          <span>Receive 10 points for each friend you invite that joins the Sahara using your link down below.</span>
                        </h2>
                    </div>
                    <div className='flex w-full justify-between items-center p-2 mb-6 bg-[#F9FAFC] dark:bg-[#212529] border border-[#E7EAF0] dark:border-[#3C3E41] rounded-full gap-2'>
                      <h1 className='text-black dark:text-white text-base pl-2 whitespace-nowrap text-ellipsis overflow-hidden'>
                        {shareTxt}
                      </h1>
                      <div className='px-4 py-2 flex items-center gap-2 bg-white dark:bg-[#2D3136] border-[#676A71] dark:border-[#3C3E41] rounded-full border min-w-[100px] cursor-pointer hover:bg-grey-3' onClick={getCopiedTxt}>
                          <Image src={'/icons/duplicate.svg'} width={100} height={100} alt='duplicate' className='w-4 h-4' />
                          <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2 dark:text-white'>
                            Copy
                          </h1>
                        </div>
                    </div>
                    {/* <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2'>
                      or share to socials
                    </h1>
                    <div className='flex justify-between gap-[10px] w-full px-2 pb-4'>
                      <div className='flex items-center flex-col rounded-2xl py-4 w-[106px] bg-[#F9FAFC] dark:bg-[#2D3136] border-[#676A71] dark:border-[#3C3E41] border cursor-pointer hover:bg-[#E7EAF0]'>
                        <Image src={'/icons/mail.svg'} width={100} height={100} alt='duplicate' className='w-4 h-4' />
                        <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2 dark:text-white'>
                          Email
                        </h1>
                      </div>
                      <div className='flex items-center flex-col rounded-2xl py-4 w-[106px] bg-[#F9FAFC] dark:bg-[#2D3136] border-[#676A71] dark:border-[#3C3E41] border cursor-pointer hover:bg-[#E7EAF0]'>
                        <Image src={'/icons/FGB.svg'} width={100} height={100} alt='duplicate' className='w-4 h-4' />
                        <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2 dark:text-white'>
                          Facebook
                        </h1>
                      </div>
                      <div className='flex items-center flex-col rounded-2xl py-4 w-[106px] bg-[#F9FAFC] dark:bg-[#2D3136] border-[#676A71] dark:border-[#3C3E41] border cursor-pointer hover:bg-[#E7EAF0]'>
                        <Image src={'/icons/twitter.svg'} width={100} height={100} alt='duplicate' className='w-4 h-4' />
                        <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2 dark:text-white'>
                          Twitter
                        </h1>
                      </div>
                      <div className='flex items-center flex-col rounded-2xl py-4 w-[106px] bg-[#F9FAFC] dark:bg-[#2D3136] border-[#676A71] dark:border-[#3C3E41] border cursor-pointer hover:bg-[#E7EAF0]'>
                        <Image src={'/icons/Telegram.svg'} width={100} height={100} alt='duplicate' className='w-4 h-4' />
                        <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2 dark:text-white'>
                          Telegram
                        </h1>
                      </div>
                    </div> */}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
