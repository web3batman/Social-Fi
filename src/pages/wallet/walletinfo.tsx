import React, { useState, useContext, useEffect } from 'react';
import MessageCard from './walletcard';
import Image from 'next/image';
import WalletSatus from './walletstatus';
import Modal from '@/components/walletmodal';
import WithDrawModal from '@/components/withDrawModal';
import { UserContext } from '@/contexts/UserProvider';

import type { NextPage } from 'next';
import api from '@/constants/auth';


const WalletInfo: NextPage = () => {
  const [modalshow, setModal] = useState<boolean>(false);
  const [wdModal, setwdModal] = useState<boolean>(false);

  //@ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);

  const [portFolioBalance, setPortBalance] = useState(0);

  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  function openWdModal() {
    setwdModal(true)
  }

  function closeWdModal() {
    setwdModal(false);
  }

  const getprofileBalance = async () => {
    api.post('/users/profilebalance').then(res => {
      setPortBalance(res.data)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    getprofileBalance()
  }, [])

  return (
    <div className='flex flex-col gap-4 w-full'>
      <MessageCard />
      <div className='flex justify-between gap-4 max-lg:flex-col'>
        <WalletSatus title={'Balance'} amount={Math.floor(myProfile.balance * 100) / 100} />
        <WalletSatus title={'Fees Earned'} amount={Math.floor(myProfile.fee_profit * 100) / 100} />
        <WalletSatus title={'Portfolio Value'} amount={portFolioBalance} />
      </div>
      <div className='flex justify-between gap-4'>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white dark:bg-dark-header-bg border border-border-color dark:border-dark-border w-1/2 cursor-pointer hover:bg-slate-300" onClick={() => { setModal(true) }}>
          <Image quality={100} src={'/icons/plus-circle.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary dark:text-white leading-[24px] font-semibold text-base'>
            Deposit
          </h3>
        </div>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white dark:bg-dark-header-bg border border-border-color dark:border-dark-border w-1/2 cursor-pointer hover:bg-slate-300" onClick={() => { setwdModal(true) }}>
          <Image quality={100} src={'/icons/paper-airplane.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary dark:text-white leading-[24px] font-semibold text-base'>
            Withdraw
          </h3>
        </div>
      </div>
      <Modal show={modalshow} closeModal={closeModal} />
      <WithDrawModal show={wdModal} closeModal={closeWdModal} openModal={openWdModal} />
    </div>
  )
}

export default WalletInfo