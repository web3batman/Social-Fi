import React, { useState, useEffect, useRef, useContext, useCallback } from 'react'
import Sidebar from '@/components/sidebar';
import Message from './message';
import BottomNav from '@/components/bottom_nav';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from './index.module.css'
import { UserContext } from '@/contexts/UserProvider';
import { SocketContext } from '@/contexts/SocketProvider';
import api from '../../constants/auth';
import toast from 'react-hot-toast';
import Loading from '@/pages/loading';

const ChatInbox = () => {
  const router = useRouter();
  const roomname = router.query.room;

  const [isloading, setLoading] = useState(true);

  const [messageList, setMessageList] = useState<object[]>([]);
  //@ts-ignore
  const { myProfile } = useContext(UserContext);
  //@ts-ignore
  const { socket } = useContext(SocketContext);
  // const [nickName, setNickName] = useState<string | null>(myProfile.username);

  // When scroll is at the bottom of element
  const [scrollbottom, setScrollbottom] = useState(true);

  const messagesEndRef = useRef(null)

  // New message and is typing state.
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>();

  // Room owner
  const [roomOwner, setRoomOwner] = useState<{ avatar: string, username: string }>();

  let typingTimeout: string | number | NodeJS.Timeout | undefined;

  // When user is typing new message.
  const handleTyping = (e: any) => {
    setMessage(e.target.value);
    setScrollbottom(true)

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { sender: myProfile.username, typing: true, roomname, avatar: myProfile.avatar, id: myProfile._id });
    }
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      setIsTyping(false);
      socket.emit('typing', { sender: myProfile.username, typing: false, roomname, avatar: myProfile.avatar, id: myProfile._id });
    }, 3000);
  }

  // Scroll moving function
  const scrollToBottom = () => {
    const element = messagesEndRef.current;
    if (element) {
      //@ts-ignore
      element.scrollTop = element.scrollHeight;
    }
  }

  // Send input message to server
  const handleSendMessage = () => {
    if (message != "") {
      // Send to server
      socket.emit("send_message", {
        message: message,
        sender: myProfile.username,
        roomname,
        avatar: myProfile.avatar,
        id: myProfile._id
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

  useEffect(() => {
    const confirmarray = myProfile.holding.filter((item: any) => {return item.userid == roomname
    })
    console.log('confirmarry', confirmarray)
    if (confirmarray.length == 0 && myProfile._id != roomname) {
      toast.error("You don't have permission to access this room!\nBuy a key to access.")
      setInterval(() => {
        router.push(`/keys/${roomname}`)
      }, 1500)
    } else {
      setLoading(false);
    }
  }, [])

  // When the scroll is at the end of element or not
  useEffect(() => {
    if (!isloading) {
      
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
    }
  }, [isScrollAtBottom]);

  // Scroll to the bottom of element
  useEffect(() => {
    console.log('message list', messageList)
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
    socket.on('typing', (data: { sender: string, typing: boolean, roomname: string, avatar: string, id: string }) => {
      if (data.sender != myProfile.username) {
        if (data.typing) {
          setOtherTyping(true);
          setTypingUser(data.sender)
        } else {
          setOtherTyping(false);
          setTypingUser('')
        }
      }
    });
  }, [])

  useEffect(() => {
    api.get(`/users/${roomname}`).then(
      res => {
        setRoomOwner(res.data);
      }
    )
  }, [router])

  useEffect(() => {
    socket.emit('join_room', { roomname, sender: myProfile.username, avatar: myProfile.avatar, id: myProfile._id })
  })

  useEffect(() => {
    api.get(`/messages/${roomname}`).then(res => {
       setMessageList(res.data);
    })
  }, [router]);


  if (isloading) {
    return <Loading />
  } else {

    return (
      <div className='w-full bg-main-bg-color dark:bg-dark-body-bg dark:text-white'>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-md:mb-28 w-[300px] max-md:hidden max-md:mb-100px'>
            <h2 className='font-medium text-[24px] leading-[32px]'>Messages</h2>
            <Message />
          </div>
          <div className='flex flex-col justify-between bg-white dark:bg-dark-header-bg flex-grow rounded-lg'>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color dark:border-dark-border flex justify-between'>
              <div className='flex gap-2 items-center'>
                <div className='bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-body-bg p-2 rounded-full cursor-pointer hover:bg-white dark:hover:bg-border-color' onClick={() => { router.push('/inbox') }}>
                  <Image quality={100} src={'/icons/arrow-left.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
                <Image quality={100} src={roomOwner ? roomOwner.avatar : '/avatars/default_profile_normal.png'} width={100} height={100} alt='Icon' className='w-10 h-10 rounded-full' />
                <div className='flex flex-col justify-between '>
                  <h1 className='text-[#2D3748] dark:text-white font-semibold text-[18px] leading-[24px]'>
                    {roomOwner?.username}&apos;s room
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
                <div className='bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border p-2 rounded-full cursor-pointer hover:bg-white'>
                  <Image quality={100} src={'/icons/search.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
                <div className='bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-border p-2 rounded-full cursor-pointer hover:bg-white'>
                  <Image quality={100} src={'/icons/dots-vertical.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </div>
              </div>
            </div>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color h-[calc(100vh-296px)] max-md:h-[calc(100vh-375px)] overflow-y-scroll' ref={messagesEndRef}>
              <div className='flex flex-col gap-4 text-[14px] text-grey-5'>
                { messageList.length != 0 ? messageList.map((chat: any, index) => {
                  if (chat.sender == myProfile.username) {
                    return (
                      <div className='flex gap-4 items-center flex-row-reverse' key={index}>
                        <span className='p-3 rounded-[10px] bg-secondary text-white'>
                          {chat.message}
                        </span>
                      </div>
                    )
                  } else {
                    return (
                      <div className='flex gap-2 items-end' key={index}>
                        <Image quality={100} src={chat.avatar} width={100} height={100} alt={chat.sender} className='w-8 h-8 rounded-full' />
                        <div className='p-3 rounded-[10px] bg-[#F5F6F8] dark:bg-dark-body-bg flex flex-col gap-2'>
                          <div className='font-medium text-primary dark:text-white'>{chat.sender}</div>
                          <div className='dark:text-white'>{chat.message}</div>
                        </div>
                      </div>
                    )
                  }
                }
                ):(
                  <div className='flex w-full justify-center'>
                    <span className='p-3 rounded-[10px] bg-[#F5F6F8] dark:bg-dark-body-bg dark:text-white'>
                      No message yet
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color dark:border-dark-border flex flex-col gap-2 font-base text-primary leading-[24px]'>

              <div className='flex gap-4 justify-between items-center'>
                {/* <input type="text" className={`px-2 py-3 bg-main-bg-color rounded-lg bg-[url("/icons/emoji-happy.svg")] bg-right bg-no-repeat w-[-webkit-fill-available] ${styles.inputtype}`} placeholder='Type reply here' value={message} onChange={handleTyping} autoFocus onKeyDown={(event) => { */}
                <input type="text" className={`px-2 py-3 bg-main-bg-color dark:bg-dark-body-bg rounded-lg bg-right bg-no-repeat w-[-webkit-fill-available] ${styles.inputtype}`} placeholder='Type reply here' value={message} onChange={handleTyping} autoFocus onKeyDown={(event) => {
                  if (event.key == 'Enter') {
                    handleSendMessage()
                  }
                }} />
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
                  <h1 className='text-[12px] leading-[16px]'>{typingUser} is typing...</h1>
                )
              }
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    )
  }
}


export default ChatInbox;