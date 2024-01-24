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
// import { ReactionBarSelector } from '@charkour/react-reactions';

// Import the EmojiInput component from the react-input-emoji package
import EmojiInput from 'react-input-emoji';


import TextareaAutosize from 'react-textarea-autosize';
import EmojiPicker from 'emoji-picker-react';
import Link from 'next/link';

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
  const chatBarRef = useRef(null)

  // New message and is typing state.
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [otherTyping, setOtherTyping] = useState(false);
  const [typingUser, setTypingUser] = useState<string>();

  // Room owner
  const [roomOwner, setRoomOwner] = useState<{ avatar: string, username: string }>();

  let typingTimeout: string | number | NodeJS.Timeout | undefined;

  // State for tracking selected reaction
  const [selectedReaction, setSelectedReaction] = useState(null);

  const [chatbarHeight, setChatbarHeight] = useState(96);

  const [isuser, setUser] = useState(false);

  // Function to handle reaction selection
  const handleReactionSelect = (reaction: any) => {
    console.log('reaction', reaction)
    setSelectedReaction(reaction);
    // You can also send the selected reaction to the server if needed
    // Modify this function based on your server communication logic
    // socket.emit('send_reaction', { reaction, roomname, messageId: selectedMessageId });
  };

  // When user is typing new message.
  const handleTyping = (e: any) => {
    setScrollbottom(true)
    setMessage(e.target.value)

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
    const confirmarray = myProfile.holding.filter((item: any) => {
      return item.userid == roomname
    })
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
    socket.on('allusers', (data: any) => {
      if (data.indexOf(roomname) > -1) {
        setUser(true);
      } else {
        setUser(false);
      }
    })
  })

  useEffect(() => {
    if (router) {
      getRoomData()
    }
  }, [router])

  useEffect(() => {
    socket.emit('join_room', { roomname, sender: myProfile.username, avatar: myProfile.avatar, id: myProfile._id })
    return (() => {
      socket.emit('leave_room', { roomname, sender: myProfile.username, avatar: myProfile.avatar, id: myProfile._id })
    })
  })

  useEffect(() => {
    api.get(`/messages/${roomname}`).then(res => {
      setMessageList(res.data);
    })
  }, [router]);

  const getRoomData = async () => {
    await api.get(`/users/${roomname}`).then(
      res => {
        setRoomOwner(res.data);
      }
    ).catch(err => {
      // console.log("err", err)
    })

  }


  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [chosenEmoji, setChosenEmoji] = useState<any | null>(null);

  const handleEmojiClick = (emoji: any) => {
    setChosenEmoji(emoji);
    setMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  useEffect(() => {
    const element = chatBarRef.current;
    if (!element) return
    // @ts-ignore
    setChatbarHeight(element.scrollHeight + 16)
    // @ts-ignore

  }, [message])

  const elementRef = useRef(null);
  const emojiElRef = useRef(null);
  const handleClick = (e: any) => {
    if (showEmojiPicker == false) return
    const element2 = emojiElRef.current;
    //@ts-ignore
    if (e.target !== elementRef.current && !element2.contains(e.target)) {
      // Your logic for when any element except the excluded one is clicked
      setShowEmojiPicker(false);
    }
  }

  if (isloading) {
    return <Loading />
  } else {

    return (
      <div className='w-full bg-main-bg-color dark:bg-dark-body-bg dark:text-white' onClick={handleClick}>
        <div className='px-5 py-6 flex max-w-[1240px] mx-auto justify-between gap-4 max-md:flex-col max-sm:px-0 max-sm:py-0'>
          <Sidebar />
          <div className='flex flex-col gap-4 max-md:mb-28 w-[300px] max-md:hidden max-md:mb-100px min-w-[250px]'>
            <h2 className='font-medium text-[24px] leading-[32px]'>Messages</h2>
            <Message />
          </div>
          <div className='flex flex-col justify-between bg-white dark:bg-dark-header-bg flex-grow rounded-lg'>
            <div className='px-6 py-4 border border-l-0 border-r-0 border-t-0 border-border-color dark:border-dark-border flex justify-between'>
              <div className='flex gap-2 items-center'>
                <Link href={'/inbox'} className='bg-main-bg-color dark:bg-dark-body-bg border border-border-color dark:border-dark-body-bg p-2 rounded-full cursor-pointer hover:bg-white dark:hover:bg-border-color'>
                  <Image quality={100} src={'/icons/arrow-left.svg'} width={100} height={100} alt='Icon' className='w-6 h-6' />
                </Link>
                <Image quality={100} src={roomOwner ? roomOwner.avatar : '/avatars/default_profile_normal.png'} width={100} height={100} alt='Icon' className='w-10 h-10 rounded-full' />
                <div className='flex flex-col justify-between '>
                  <h1 className='text-[#2D3748] dark:text-white font-semibold text-[18px] leading-[24px]'>
                    {roomOwner?.username}&apos;s room
                  </h1>
                  <h1 className='flex items-center text-grey-2 font-normal text-[12px] leading-[18px] gap-1'>
                    <span className={`w-2 h-2 ${isuser ? 'bg-[#38C585]' : 'bg-[#e23d3d]'} rounded-full`}></span>
                    <span>
                      {isuser ? 'Online' : 'Offline'}
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
            <div className={`px-6 py-4 border-l-0 border-r-0 border-t-0 border-border-color overflow-y-auto`} ref={messagesEndRef} style={{ height: `calc(100vh - ${chatbarHeight + 170}px)` }}>
              <div className='flex flex-col gap-4 text-[14px] text-grey-5 max-md:pb-[70px]'>
                {messageList.length != 0 ? messageList.map((chat: any, index) => {
                  if (chat.avatar) {
                    if (chat.sender == myProfile.username) {
                      return (
                        <div className='flex gap-4 items-center flex-row-reverse' key={index}>
                          <div className='flex flex-col gap-1'>
                            <div className='p-3 rounded-[10px] bg-secondary text-white break-all whitespace-pre-wrap ml-[50px]'>
                              {chat.message}
                            </div>
                            {/* <span className='text-[#738290] text-[12px] leading-[18px]'>
                              Just now
                            </span> */}
                          </div>
                        </div>
                      )
                    } else {
                      return (
                        <div className='flex gap-2 items-end' key={index}>
                          <div className='flex flex-col gap-1 items-end'>
                            <div className='flex gap-2 items-start'>
                              <Image quality={100} src={chat.avatar} width={100} height={100} alt={chat.sender} className='w-8 h-8 rounded-full' />
                              <div className='flex gap-2 items-start'>
                                <div className='flex flex-col items-end gap-3'>
                                  <div className='p-3 rounded-[10px] relative bg-[#F5F6F8] dark:bg-dark-body-bg flex flex-col gap-2'>
                                    <div className='font-bold text-primary dark:text-white'>{chat.sender}</div>
                                    <div className='dark:text-white break-all whitespace-pre-wrap mr-[50px]'>
                                      {chat.message}
                                    </div>
                                    {/* <div className='absolute bg-white border px-2 py-1 rounded-full bottom-[-20%] right-0 shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgba(0,0,0,0.15)_0px_1px_2px'>
                                        ❤️
                                    </div> */}
                                  </div>
                                  {/* <span className='text-[#738290] text-[12px] leading-[18px]'>
                                    Just now
                                  </span> */}
                                </div>
                                {/* <div className='relative min-w-[20px]'>
                                  <Image src={'/icons/smilecircle.svg'} className='w-[18px] h-[18px] cursor-pointer' width={100} height={100} alt='smile face' />
                                  <ReactionBarSelector
                                    iconSize={16}
                                    reactions={[
                                      { label: 'thumbs-up', node: '👍' },
                                      { label: 'heart', node: '❤️' },
                                      { label: 'smile', node: '😊' },
                                      // Add more reactions as needed
                                    ]}
                                    
                                    style={{position: 'absolute', top: '-100%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                    onSelect={(reaction: any) => handleReactionSelect(reaction)}
                                  />
                                </div> */}
                              </div>
                            </div>

                          </div>
                        </div>
                      )
                    }
                  }
                }
                ) : (
                  <div className='flex w-full justify-center'>
                    <span className='p-3 rounded-[10px] bg-[#F5F6F8] dark:bg-dark-body-bg dark:text-white'>
                      No message yet
                    </span>
                  </div>
                )}
              </div>
              {/* <Picker data={data} onEmojiSelect={console.log} set='facebook' /> */}
            </div>
            <div className='px-6 py-4 border-l-0 border-r-0 border-t-0 border-border-color dark:border-dark-border flex flex-col gap-2 font-base text-primary dark:text-white leading-[24px] max-sm:px-2 max-[770px]:fixed max-[770px]:bottom-0 max-[770px]:w-full max-[770px]:dark:bg-dark-header-bg' ref={chatBarRef}>
              {/* <div className='min-h-[18px]'>.
                {
                  otherTyping && (
                    <h1 className='text-[12px] leading-[16px]'>{typingUser} is typing...</h1>
                  )
                }
              </div> */}
              <div className='flex gap-4 justify-between max-sm:gap-1 items-start'>

                <div className='relative flex gap-2 w-full items-start'>
                  {/* Textarea for typing messages */}
                  <button onClick={toggleEmojiPicker} ref={elementRef}>
                    <Image src={'/icons/emoji-happy.svg'} width={100} height={100} className='w-10 h-10' alt='Emoji happy face' />
                  </button>
                  <TextareaAutosize
                    minRows={1}
                    value={message}
                    maxRows={6}
                    onChange={(e) => { setMessage(e.target.value); handleTyping(e); }}
                    placeholder='Type reply here'
                    className={`px-2 py-3 bg-main-bg-color dark:bg-dark-body-bg rounded-lg bg-right bg-no-repeat resize-none w-[-webkit-fill-available] ${styles.inputtype}`}
                  />

                  {showEmojiPicker && (
                    <div className='absolute top-0 -translate-y-[102%]' ref={emojiElRef}>
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                </div>

                <button className='px-5 py-3 rounded-lg bg-secondary max-sm:w-[80px] max-sm:px-0 max-sm:py-2' onClick={handleSendMessage}>
                  <div className='flex gap-4 items-center justify-center sm:justify-start'>
                    <h1 className='text-white font-medium leading-[24px] text-center text-base'>
                      Send
                    </h1>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
        <div className='max-[770px]:hidden'>
          <BottomNav />
        </div>
      </div>
    )
  }
}


export default ChatInbox;