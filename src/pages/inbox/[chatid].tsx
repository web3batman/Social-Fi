import React, { useState, useEffect, useRef, useContext } from 'react'
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Message from './message';
import BottomNav from '../components/bottom_nav';
import { Saira } from 'next/font/google';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import { io } from "socket.io-client";
import { UserContext } from '../../contexts/UserProvider';


const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

const ChatInbox = () => {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<object[]>([]);
  const [nickName, setNickName] = useState<string | null>();

  //@ts-ignore
  const { myProfile } = useContext(UserContext);


  // Connect with server
  const socket = io(`${process.env.NEXT_PUBLIC_SERVER_URL}`);
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ })
  }

  // Send input message to server
  const handleSendMessage = () => {
    // Send to server
    socket.emit("send_message", {
      message: message,
      sender: nickName,
      createdAt: Date.now()
    });

    // Reset input after send
    setMessage("");
  };

  // Receive message from server
  socket.on("received_message", (data) => {
    // Append to message list
    setMessageList([...messageList, data]);
    // scrollToBottom()
  });

  
  useEffect(() => {
    setNickName(myProfile.screen_name);
  }, [myProfile]);

  useEffect(() => {
    console.log('nickname', nickName)
  }, [nickName])

  return (
    <div className={saira.className}>
      <Header />
      <div className='w-full bg-main-bg-color'>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-md:mb-28 w-[300px] max-md:hidden max-md:mb-100px'>
            <h2 className='font-medium text-[24px] leading-[32px]'>Messages</h2>
            <Message />
          </div>
          <div className='flex flex-col justify-between bg-white flex-grow rounded-lg'>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color flex justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='bg-main-bg-color border border-border-color p-2 rounded-full cursor-pointer hover:bg-white' onClick={() => { router.push('/inbox') }}>
                  <Image src={'/icons/arrow-left.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
                <Image src={'/avatars/default.svg'} width={100} height={100} alt='Icon' className='w-10 h-10 rounded-full' />
                <div className='flex flex-col justify-between '>
                  <h1 className='text-[#2D3748] font-semibold text-[18px] leading-[24px]'>
                    Trader Joe
                  </h1>
                  <h1 className='flex items-center text-grey-2 font-normal text-[12px] leading-[18px] gap-1'>
                    <span className='w-2 h-2 bg-[#38C585] rounded-full'></span>
                    <span>
                      Online
                    </span>
                  </h1>
                </div>
              </div>
              <div className='flex gap-2 items-center'>
                <div className='bg-main-bg-color border border-border-color p-2 rounded-full cursor-pointer hover:bg-white'>
                  <Image src={'/icons/search.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
                <div className='bg-main-bg-color border border-border-color p-2 rounded-full cursor-pointer hover:bg-white'>
                  <Image src={'/icons/dots-vertical.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
              </div>
            </div>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color h-[calc(100vh-296px)] max-md:h-[calc(100vh-375px)] overflow-y-scroll flex flex-col gap-4 text-[14px] text-grey-5'>
              {messageList.map((chat: any) => {
                if (chat.sender == nickName) {
                  return (
                    <div className='flex gap-4 flex-col' key={chat.index}>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-4 items-center flex-row-reverse'>
                          <span className='p-3 rounded-[10px] bg-secondary text-white'>
                            {chat.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className='flex gap-4 flex-col' key={chat.mmessage}>
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-4 items-center'>
                          <span className='p-3 rounded-[10px] bg-[#F5F6F8]'>
                            {chat.message}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }
                // if (chat.sender == nickName) {
                //   return (
                //     <div className={styles.chatArea} key={chat.message}>
                //       { chat.sender + "->"}{chat.message}
                //     </div>
                //   )
                // } else {
                //   return (
                //     <div className={styles.chatArea} key={chat.message}>
                //       { chat.sender + "->"}{chat.message}
                //     </div>
                //   )
                // }
              }
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color flex gap-4 justify-between items-center'>
              <input type="text" className={`px-2 py-3 bg-main-bg-color rounded-lg bg-[url("/icons/emoji-happy.svg")] bg-right bg-no-repeat w-[-webkit-fill-available] ${styles.inputtype}`} placeholder='Type reply here' value={message} onChange={(e) => setMessage(e.target.value)} autoFocus onKeyDown={(event) => {
                if (event.key == 'Enter') {
                  handleSendMessage()
                }
              }}/>
              <button className='px-5 py-3 rounded-lg bg-secondary max-sm:w-full' onClick={handleSendMessage}>
                <div className='flex gap-4 items-center justify-center sm:justify-start'>
                  <h1 className='text-white font-medium leading-[24px] text-center text-base'>
                    Send
                  </h1>
                </div>
              </button>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    </div>
  )
}

export default ChatInbox;