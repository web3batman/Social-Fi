import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'
import api from '@/constants/auth';
import toast from 'react-hot-toast';
import { UserContext } from '@/contexts/UserProvider';
import Link from 'next/link';
import ConfirmModal from '@/components/confirmModal';

interface Post {
  _id: string,
  content: string,
  vote: string[],
  created_at: string,
  updated_at: string,
  poster_id: {
    _id: string,
    twitter_id: string,
    avatar: string,
    username: string,
    screen_name: string,
    price: string
  },
  view: string[]
}

const PostCard = (props: {
  post: Post,
  noreplay?: boolean,
  nolink?: boolean,
  toprofile?: boolean
}) => {
  const { post, noreplay, nolink, toprofile } = props;
  const router = useRouter();
  const [createdTime, setTime] = useState<string>('1 m');

  const [post1, setPost] = useState<Post>();
  const [likeit, setLikeIt] = useState(false);
  const [replyCount, setReplyCount] = useState(0);

  const [confirm, setConfirm] = useState(false);

  //@ts-ignore
  const { myProfile } = useContext(UserContext);

  useEffect(() => {
    setPost(post)
  }, [post])

  useEffect(() => {
    if (post1 && post && post._id) {
      handlePostTime()
    }
  }, [post1, post])

  const handlePostTime = async () => {
    if (post1) {
      const timestamp: any = new Date(post.created_at);
      const currentTimestamp: any = new Date();
      const timeDifference = currentTimestamp - timestamp;
      const minutesDifference = timeDifference / (1000 * 60);
      const minute = Math.floor(minutesDifference);
      const hour = Math.floor(minute / 60);
      const day = Math.floor(hour / 24);
      const month = Math.floor(day / 30);
      const createTime = post1.created_at.split('T')[0];

      if (minute < 60) {
        setTime(`${minute + 1} m`)
      }
      if (hour > 0) {
        if (hour < 24) {
          setTime(`${hour} h`)
        }
      }
      if (day > 0) {
        if (day < 30) {
          setTime(`${day} d`)
        }
      }
      if (month > 0) {
        setTime(createTime);
      }

      // set like or not
      const isstar = post1.vote.filter(posterid => {
        return posterid == myProfile._id
      })
      if (isstar.length != 0) {
        setLikeIt(true);
      } else {
        setLikeIt(false)
      }

      // get reply count
      await api.get(`/posts/getreplycount/${post._id}`).then(
        res => {
          setReplyCount(res.data);
        }
      ).catch(err => {
        // toast.error('Oops there is an error!');
      })
    }
  }

  const likePost = async (postid: any) => {
    const res = await api.post('/posts/likepost', { postId: postid });
    if (res.data.state) {
      toast.success(res.data.msg);
      setPost(res.data.post)
    } else {
      toast.error(res.data.msg)
    }
  }

  const toReplyPage = (e: any) => {
    e.preventDefault();
    if ((!noreplay || nolink) && post1) {
      router.push(`/home/${post1._id}`)
    }
    if (toprofile) {
      if (post1) {
        router.push(`/keys/${post1.poster_id._id}`)
      }
    }
  }

  const removePost = () => {
    api.delete(`/posts/${post._id}`).then(
      res => {
        toast.success(res.data.msg)
        router.reload();
      }
    ).catch(
      err => console.log('Server error')
    )
  }

  // const toProfile = () => {
  //   if (post1) {
  //     router.push(`/keys/${post1.poster_id._id}`)
  //   }
  // }

  return (
    <div className='bg-white dark:bg-dark-header-bg p-4 rounded-[15px] flex flex-col gap-4 dark:text-white border-b-2 border-border-color dark:border-dark-border'>
      <div className='flex flex-col gap-1 cursor-pointer' onClick={toReplyPage}>
        {
          post1 &&
          <>
            <div className='flex items-center justify-between w-full'>
              <div className='flex gap-[10px] items-center'>
                <div>
                  <Image quality={100} src={post.poster_id.avatar} width={100} height={100} alt='Default avatar' className='w-8 h-8 rounded-full cursor-pointer' />
                </div>
                <div className='flex flex-col'>
                  <h1 className='text-base font-bold leading-[24px]'>{post1.poster_id.username}</h1>
                  <div className='text-[12px] font-normal leading-[18px] text-[#738290]'>
                    <div className="flex gap-2">
                      <span>@{post1.poster_id.screen_name}</span>
                      <span>-</span>
                      <span>{createdTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className='text-[14px] font-normal leading-5 break-all whitespace-pre-wrap'>
              {post1.content}
            </h3>
          </>
        }
      </div>
      {
        !noreplay && post1 && (
          <div className='flex justify-between gap-4'>
            <div className='flex gap-4'>
              {/* <div className='flex gap-1 items-center'>
                <Image quality={100} src={'/icons/chat.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
                <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{0}</h3>
              </div> */}
              <div className='flex gap-1 items-center cursor-pointer' onClick={toReplyPage}>
                <Image quality={100} src={'/icons/Comment.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
                {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{exchange}</h3> */}
                <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{replyCount}</h3>
              </div>
              <div className='flex gap-1 items-center'>
                <Image quality={100} src={likeit ? '/icons/star.svg' : '/icons/post_star.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90 cursor-pointer' onClick={() => likePost(post1._id)} />
                {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{star}</h3> */}
                <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{post1.vote.length}</h3>
              </div>
              {/* <div className='flex gap-1 items-center'>
                <Image quality={100} src={'/icons/bookmark.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
                <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{post1.view.length}</h3>
              </div> */}
            </div>
            <div className="flex gap-4">
              {
                post.poster_id._id == myProfile._id && (
                  <div className='flex gap-1 items-center cursor-pointer'>
                    {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{price}</h3> */}
                    <Image quality={100} src={'/icons/trash.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' onClick={() => setConfirm(true)} />
                  </div>
                )
              }
              <div className='flex gap-1 items-center'>
                {/* <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{price}</h3> */}
                <h3 className='text-grey-2 font-normal text-[13px] leading-[20px]'>{post.poster_id.price}</h3>
                <Image quality={100} src={'/icons/currency-dollar.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90' />
              </div>
              {/* <Image quality={100} src={'/icons/dots-vertical.svg'} width={100} height={100} alt='Default avatar' className='w-6 h-6 opacity-90 max-sm:hidden' /> */}
            </div>
          </div>
        )
      }
      <ConfirmModal show={confirm} closeModal={() => setConfirm(false)} buykey={removePost} />
    </div>
  )
}


export default PostCard;