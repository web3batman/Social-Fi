import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import Sidebar from '@/components/sidebar';
import Message from './message';
import BottomNav from '@/components/bottom_nav';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import { UserContext } from '@/contexts/UserProvider';
import { SocketContext } from '@/contexts/SocketProvider';


const ChatInbox = () => {
  const router = useRouter();

  const [messageList, setMessageList] = useState<object[]>([]);
  //@ts-ignore
  const { myProfile } = useContext(UserContext);
  //@ts-ignore
  const {socket} = useContext(SocketContext);
  // const [nickName, setNickName] = useState<string | null>(myProfile.screen_name);
  
  // When scroll is at the bottom of element
  const [scrollbottom, setScrollbottom] = useState(true);
  
  const messagesEndRef = useRef(null)
  
  // New message and is typing state.
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);

  let typingTimeout: string | number | NodeJS.Timeout | undefined;


  // When user is typing new message.
  const handleTyping = (e: any) => {
    setMessage(e.target.value); 
    setScrollbottom(true)

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { user: myProfile.screen_name, typing: true });
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', { user: myProfile.screen_name, typing: false });
    }, 3000);
  }

  // Scroll moving function
  const scrollToBottom = () => {
    const element = messagesEndRef.current;
    if (element) {
      //@ts-ignore
      element.scrollTop  = element.scrollHeight;
    }
  }

  // Send input message to server
  const handleSendMessage = () => {
    if (message != "") {      
      // Send to server
      socket.emit("send_message", {
        message: message,
        sender: myProfile.screen_name,
      });
  
      // Reset input after send
      setMessage("");
    }
  };

  // Receive message from server
  socket.on("received_message", (data: object) => {
    // Append to message list
    setMessageList([...messageList, data]);
  });

  // Identify if scroll is at the end of element or not
  const isScrollAtBottom = useCallback(() => {
    const current = messagesEndRef.current;
    if (!current) {
      return false;
    }
    // When the sum of scrollTop and clientHeight is equal (or greater, to handle some edge cases) to the scrollHeight, we're at the bottom
    //@ts-ignore
    return current.scrollTop + current.clientHeight >= current.scrollHeight;
  }, []);

  // When the scroll is at the end of element or not
  useEffect(() => {
    const scrollContainer = messagesEndRef.current; // step 2

    const handleScroll = () => {
      if (isScrollAtBottom()) {
        setScrollbottom(true);
      } else {
        setScrollbottom(false);
      }
    };

    // step 4
    // @ts-ignore
    scrollContainer.addEventListener('scroll', handleScroll);

    // step 5
    return () => {
      // @ts-ignore
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollAtBottom]);

  // Scroll to the bottom of element
  useEffect(() => {
    if (scrollbottom) {
      scrollToBottom()
    }
  }, [messageList])

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeout);
    };
  }, []);

  useEffect(() => {
    socket.on('typing', (data: { user:string, typing: boolean }) => {
      if (data.user != myProfile.screen_name) {
        if (data.typing) {
          setOtherTyping(true);
        } else {
          setOtherTyping(false);
        }
      }
    });
  }, [])

  return (
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
                <Image src={'/avatars/default_profile_normal.png'} width={100} height={100} alt='Icon' className='w-10 h-10 rounded-full' />
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
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color h-[calc(100vh-296px)] max-md:h-[calc(100vh-375px)] overflow-y-scroll' ref={messagesEndRef}>
              <div className='flex flex-col gap-4 text-[14px] text-grey-5'>
                {messageList.map((chat: any, index) => {
                  if (chat.sender == myProfile.screen_name) {
                    return (
                      <div className='flex gap-4 flex-col' key={index}>
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
                      <div className='flex gap-4 flex-col' key={index}>
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
                }
                )}
              </div>
            </div>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color flex flex-col gap-2 font-base text-primary leading-[24px]'>

              <div className='flex gap-4 justify-between items-center'>
                <input type="text" className={`px-2 py-3 bg-main-bg-color rounded-lg bg-[url("/icons/emoji-happy.svg")] bg-right bg-no-repeat w-[-webkit-fill-available] ${styles.inputtype}`} placeholder='Type reply here' value={message} onChange={handleTyping} autoFocus onKeyDown={(event) => {
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

              {
                otherTyping && (
                  <h1>is typing...</h1>
                )
              }
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
  )
}

export default ChatInbox;