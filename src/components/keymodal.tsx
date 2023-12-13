import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import api from '@/pages/api/auth';
import toast from 'react-hot-toast';

import { Saira } from 'next/font/google';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

export default function KeyModal(props: { show: boolean; closeModal: any; openModal: any; owner: object }) {
  const { show, closeModal, openModal, owner } = props;

  const buykey = (buy: boolean) => {
    //@ts-ignore
    api.post('/keys', {seller: owner._id, count: 1, buy}).then(
      res => {
        if (buy) {
          toast.success('You bought key.');
        } else {
          toast.success('You sold key.');
        }
        closeModal()
      }
    ).catch(err => console.log(err))
  }

  return (
    <>
      <Transition appear show={show || false} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                <Dialog.Panel className="w-full transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all max-w-[335px] sm:max-w-[488px]">
                  <Dialog.Title
                    as="h3"
                    className='text-lg text-[24px] font-semibold leading-8 text-primary p-5'
                  >
                    Trade Keys
                  </Dialog.Title>
                  <div className="p-5 flex flex-col gap-4">
                    <div className='flex w-full justify-between items-center'>
                      <div className='flex gap-4 items-center'>
                        <Image src=
                        {
                          //@ts-ignore
                          owner.avatar?owner.avatar:'/images/avatars/default.svg'
                        } width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full' />
                        <div className='flex flex-col'>
                          <h1 className='text-base font-bold leading-[24px]'>
                            {
                              //@ts-ignore
                              owner.username
                            }
                          </h1>
                          <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                            <span>You own 0 Keys</span>
                          </h2>
                        </div>
                      </div>
                      <div className='flex flex-col'>
                        <h1 className='text-base font-bold leading-[24px] flex gap-2 items-center'>
                          <span>
                            {
                              //@ts-ignore
                              owner.price
                            }
                          </span>
                          <Image src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
                        </h1>
                        <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                          <span>Ticket Price</span>
                        </h2>
                      </div>
                    </div>
                    <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2'>
                      Sell Price: 
                      {
                        //@ts-ignore
                        owner.price
                      }
                       Ada
                    </h1>
                    <div className='flex justify-between gap-[10px] w-full'>
                      <button className='py-4 rounded-lg bg-secondary w-full max-w-[219px]' onClick={() => buykey(true)}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='text-white font-medium leading-[24px] w-full text-center text-[16px]'>
                            Buy a key
                          </h1>
                        </div>
                      </button>
                      <button className='py-4 rounded-lg bg-main-bg-color border border-border-color w-full max-w-[219px]' onClick={() => buykey(false)}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='font-medium leading-[24px] w-full text-center text-[16px]'>
                            Sell a key
                          </h1>
                        </div>
                      </button>
                    </div>
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
