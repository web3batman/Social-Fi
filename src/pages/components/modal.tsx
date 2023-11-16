import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { Saira, Aclonica } from 'next/font/google';

const people = [
  { name: 'Cardino (ADA)' },
  { name: 'Cardino (ADA)' },
  { name: 'Cardino (ADA)' },
]
const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

export default function Modal(props: { show: boolean; closeModal: any; openModal: any; }) {
  const { show, closeModal, openModal } = props;

  const [selected, setSelected] = useState(people[0])

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
                    Fund your Wallet
                  </Dialog.Title>
                  <hr />
                  <div className="p-5">
                    <h1 className='text-grey-2 font-normal text-[14px] leading-[18px]'>
                      Select Network
                    </h1>
                    <Listbox value={selected} onChange={setSelected}>
                      <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                          <span className="block truncate">{selected.name}</span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                              <Listbox.Option
                                key={personIdx}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                  }`
                                }
                                value={person}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                      {person.name}
                                    </span>
                                    {selected ? (
                                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                      </span>
                                    ) : null}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                    <h1 className='py-4 text-primary font-medium'>
                      Transfer ADA to the address below to deposit ADA to your wallet.
                    </h1>
                    <div className='flex justify-center py-4'>
                      <Image src={'/images/default_zip_code.svg'} width={100} height={100} alt='Default zip code' className='w-[250px] h-[250px]' />
                    </div>
                    <h1 className='text-grey-2 font-normal text-[14px] leading-[18px]'>
                      Wallet Address
                    </h1>
                    <div className='flex justify-between py-3 px-4 border border-border-color bg-main-bg-color rounded-lg mt-2'>
                      <h1 className='font-medium truncate ...'>
                      addradfasdfasdf...adsfadfasdf
                      </h1>
                      <Image src={'/icons/duplicate.svg'} width={100} height={100} alt='Duplicate' className='w-[24px] h-[24px] cursor-pointer' />
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
