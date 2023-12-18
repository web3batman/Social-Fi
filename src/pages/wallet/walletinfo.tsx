import React, { useState, useContext } from 'react';
import MessageCard from './walletcard';
import Image from 'next/image';
import WalletSatus from './walletstatus';
import Modal from '@/components/walletmodal';
import WithDrawModal from '@/components/withDrawModal';
import { UserContext } from '@/contexts/UserProvider';

import type { NextPage } from 'next';


const WalletInfo: NextPage = () => {
  const [modalshow, setModal] = useState<boolean>(false);
  const [wdModal, setwdModal] = useState<boolean>(false);

  //@ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext);
  
  function closeModal() {
    setModal(false);
  }

  function openModal() {
    setModal(true);
  }

  function openWdModal(){
    setwdModal(true)
  }

  function closeWdModal(){
    setwdModal(false);
  }
  return (
    <div className='flex flex-col gap-4 w-full'>
      <MessageCard />
      <div className='flex justify-between gap-4 max-lg:flex-col'>
        <WalletSatus title={'balace'} amount={Math.floor(myProfile.balance * 100) / 100} />
        <WalletSatus title={'Fees Earned'} amount={Math.floor(myProfile.fee_profit * 100) / 100} />
        <WalletSatus title={'Portfolio Value'} amount={'0'} />
      </div>
      <div className='flex justify-between gap-4'>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white border border-border-color w-1/2 cursor-pointer hover:bg-slate-300" onClick={() => { setModal(true) }}>
          <Image quality={100} src={'/icons/plus-circle.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary leading-[24px] font-semibold text-base'>
            Deposit
          </h3>
        </div>
        <div className="p-4 rounded-lg flex flex-col justify-between items-center bg-white border border-border-color w-1/2 cursor-pointer hover:bg-slate-300" onClick={() => { setwdModal(true) }}>
          <Image quality={100} src={'/icons/paper-airplane.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
          <h3 className='text-primary leading-[24px] font-semibold text-base'>
            Withdraw
          </h3>
        </div>
      </div>
      <Modal show={modalshow} closeModal={closeModal} openModal={openModal} />
      <WithDrawModal show={wdModal} closeModal={closeWdModal} openModal={openWdModal} />
    </div>
  )
}

export default WalletInfo