import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import api from '@/constants/auth';
import toast from 'react-hot-toast';
import ConfirmModal from './confirmModal';
import { UserContext } from '@/contexts/UserProvider';
import {useRouter} from 'next/router'
import Link from 'next/link'

import { Saira } from 'next/font/google';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

export default function KeyModal(props: { show: boolean; closeModal: any; openModal: any; owner: object; keyCount: number }) {
  const { show, closeModal, openModal, owner, keyCount } = props;
  const [buyPrice, setBuyPrice] = useState();
  const [sellPrice, setSellPrice] = useState();
  const [isConfirm, setConfirm] = useState(false);
  const [buy, setBuy] = useState(false);
  const [canBuy, setCanBuy] = useState(false);

  const router = useRouter()

  //@ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

  const buykey = async () => {
    // @ts-ignore
    api.post('/keys', { seller: owner._id, count: 1, buy }).then(
      res => {
        if (res.status == 505) {
          toast.error("You don't have enough balance.")
        } else {
          if (buy) {
            toast.success('You bought key.');
          } else {
            toast.success('You sold key.');
          }
          closeModal()
          setConfirm(false);
          router.reload();
        }

      }
    ).catch(err => {
      toast.error(err.response.data.err);
    })
  }

  const confirmContract = (buysell: boolean) => {
    setBuy(buysell);
    setConfirm(true);
  }

  useEffect(() => {
    //@ts-ignore
    setBuyPrice(Math.floor(owner.price * 1.1 * 100) / 100)
    let tempSellPrice;
    //@ts-ignore
    if (owner.keyCount == 1) {
      tempSellPrice = 0.14;
      //@ts-ignore
    } else if(owner.keyCount == 0){
      tempSellPrice = 0;
    } else {
      //@ts-ignore
      tempSellPrice = 2 / 7 * Math.pow(owner.keyCount - 1, 2);
    }
    //@ts-ignore
    setSellPrice(Math.floor(tempSellPrice * 0.9 * 100) / 100)
  }, [])

  useEffect(() => {
    if (buyPrice) {
      if ((myProfile.balance - buyPrice) < 0) {
        setCanBuy(true);
      }
    }
  }, [buyPrice])

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
                      Trade Keys
                    </span>
                    <span className='px-3 py-1 rounded-lg border border-border-color dark:border-dark-border cursor-pointer hover:bg-main-bg-color dark:hover:bg-dark-body-bg' onClick={closeModal}>
                      X
                    </span>
                  </Dialog.Title>
                  <div className="p-5 flex flex-col gap-4">
                    <div className='flex w-full justify-center items-center'>
                      <div className='flex flex-col'>
                        <h1 className='text-[18px] font-bold leading-[24px] flex gap-2 items-center justify-end'>
                          <span>
                            {
                              Math.floor(myProfile.balance * 100) / 100
                            }
                          </span>
                          <Image quality={100} src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-5 h-5 rounded-full' />
                        </h1>
                        <h2 className='text-[16px] font-normal leading-[24px] text-[#738290]'>
                          <span>Your balance</span>
                        </h2>
                      </div>
                    </div>
                    <div className='flex w-full justify-between items-center'>
                      <div className='flex gap-4 items-center'>
                        <Image quality={100} src=
                          {
                            //@ts-ignore
                            owner.avatar ? owner.avatar : '/images/avatars/default.svg'
                          } width={100} height={100} alt='Default avatar' className='w-10 h-10 rounded-full' />
                        <div className='flex flex-col'>
                          <h1 className='text-base font-bold leading-[24px]'>
                            {
                              //@ts-ignore
                              owner.username
                            }
                          </h1>
                          <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                            <span>You own { keyCount } Keys</span>
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
                          <Image quality={100} src={'/icons/cardano.svg'} width={100} height={100} alt='Default avatar' className='w-4 h-4 rounded-full' />
                        </h1>
                        <h2 className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                          <span>Key Price</span>
                        </h2>
                      </div>
                    </div>
                    <h1 className='text-center text-[14px] font-normal leading-[18px] text-grey-2'>
                      Buy(Sell) Price:&nbsp;
                      {
                        buyPrice
                      }
                      &nbsp;
                      ({
                        sellPrice
                      })
                      &nbsp;
                      Ada
                    </h1>
                    <div className='flex justify-between gap-[10px] w-full'>
                      {
                        canBuy?<Link href={'/wallet'} className={`py-4 rounded-lg w-full ${keyCount != 0 && 'max-w-[219px]'} bg-secondary`}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='text-white font-medium leading-[24px] w-full text-center text-[16px]'>
                            Go to deposit
                          </h1>
                        </div>
                      </Link>:<button className={`py-4 rounded-lg w-full ${keyCount != 0 && 'max-w-[219px]'} bg-secondary`} onClick={() => confirmContract(true)}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='text-white font-medium leading-[24px] w-full text-center text-[16px]'>
                            Buy a key
                          </h1>
                        </div>
                      </button>
                      }
                      {
                        keyCount != 0?<button className='py-4 rounded-lg bg-main-bg-color dark:bg-dark-body-bg border border-border-color w-full max-w-[219px]' onClick={() => confirmContract(false)}>
                        <div className='flex gap-4 items-center justify-center sm:justify-start'>
                          <h1 className='font-medium leading-[24px] w-full text-center text-[16px]'>
                            Sell a key
                          </h1>
                        </div>
                      </button>:''
                      }
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <ConfirmModal show={isConfirm} closeModal={() => setConfirm(false)} buykey={buykey} />
    </>
  )
}
