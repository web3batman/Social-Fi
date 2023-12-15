import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import { Saira } from 'next/font/google';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

export default function ConfirmModal(props: { show: boolean; closeModal: any; buykey: any }) {
  const { show, closeModal, buykey } = props;


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
                <Dialog.Panel className="w-full transform overflow-hidden rounded-lg bg-white p-0 text-left align-middle shadow-xl transition-all max-w-[335px] sm:max-w-[488px]">
                  <Dialog.Title
                    as="h3"
                    className='text-lg text-[24px] font-semibold leading-8 text-primary p-5 flex justify-between items-center'
                  >
                    <span>
                      Confirm
                    </span>
                    <span className='px-3 py-1 rounded-lg border border-border-color cursor-pointer hover:bg-main-bg-color' onClick={closeModal}>
                      X
                    </span>
                  </Dialog.Title>
                  <div className="p-5 flex flex-col gap-8">
                    <div className='text-center'>
                      Are you sure?
                    </div>
                    <div className='flex justify-between gap-[10px] w-full'>
                      <button className='py-4 rounded-lg bg-secondary w-full max-w-[219px]' onClick={buykey}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='text-white font-medium leading-[24px] w-full text-center text-[16px]'>
                            Yes
                          </h1>
                        </div>
                      </button>
                      <button className='py-4 rounded-lg bg-main-bg-color border border-border-color w-full max-w-[219px]' onClick={closeModal}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='font-medium leading-[24px] w-full text-center text-[16px]'>
                            No
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
