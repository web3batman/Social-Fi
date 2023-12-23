import React, { useState, ReactNode, useEffect, useContext } from 'react'
import LandingHeader from './landingheader'
import Footer from './landingfooter'
import Header from './header'
import { Saira } from 'next/font/google';
import { usePathname } from 'next/navigation';

import api from '@/constants/auth';
import setAuthToken from '@/constants/setAuthToken';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react'
import { UserContext } from '@/contexts/UserProvider';
import Loading from '@/pages/loading';
import toast, {Toaster} from 'react-hot-toast';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

interface MyComponentProps {
  children: ReactNode;
}


const Layout = ({ children }: MyComponentProps) => {
  const path = usePathname();
  const [main, setMain] = useState(false);

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)
  const router = useRouter()

  // Get profile info
  const { status, data:session } = useSession();

  useEffect(() => {
    if(!session) return
    if (status == 'authenticated') {
      //@ts-ignore
      const twitterid = session.token.sub;
      console.log('twitterid', twitterid)
      const userinfo = localStorage.getItem('token');
      if (userinfo) {
        setAuthToken(userinfo);
        api.get('/users').then((res) => {
          if (res.data.user) {
            setMyProfile(res.data.userdata);
            router.push(path == "/"?'/home':path);
          } else {
            setAuthToken(false);
            router.push('/');
          }
        }).catch(
          err => {
            setAuthToken(false);
            router.push('/');
          }
        )
      } else {
        api.post('/users', {signin: twitterid}).then(
          res => {
            const { token, user } = res.data;
            setAuthToken(token);
            setMyProfile(user);
            router.push('/home');
          }
        ).catch(err => {
          router.push('/');
        })
      }
    } else {
        router.push('/');
    }
  }, [path, status])

  useEffect(() => {
    if (path == '/') {
      setMain(true)
    } else {
      setMain(false)
    }
  }, [path])

  if (status == 'loading') {
    return <Loading />
  } else {
    if (!main) {
      if (myProfile.avatar) {
        return (
          <div className={saira.className}>
            <Header />
            {children}
            <Toaster 
              position="top-right"
              reverseOrder={false}
             />
          </div>
        )
      }
    } else {
        return (
          <main className="flex min-h-screen flex-col items-center justify-between">
            <LandingHeader />
            {children}
            <Footer />
          </main>
        )
    }
  }

}

export default Layout