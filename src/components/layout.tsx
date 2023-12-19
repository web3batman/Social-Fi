import React, { useState, ReactNode, useEffect, useContext } from 'react'
import LandingHeader from './landingheader'
import Footer from './landingfooter'
import Header from './header'
import { Saira } from 'next/font/google';
import { usePathname } from 'next/navigation';

import api from '@/pages/api/auth';
import setAuthToken from '@/pages/api/setAuthToken';
import { jwtDecode } from 'jwt-decode';
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
  const [checked, setChecked] = useState(false);

  // @ts-ignore
  const { myProfile, setMyProfile } = useContext(UserContext)
  const router = useRouter()

  // Get profile info
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      // @ts-ignore
      const profile = session.token.token.profile;
      const userinfo = localStorage.getItem('token');

      if (!userinfo) {
        if (profile) {
          api.post('/users', { profile: profile }).then((res: { data: { token: any, user: any }; }) => {
            setAuthToken(res.data.token);
            setMyProfile(res.data.user);
            router.push(path == "/"?'/home':path);
          }).catch((err: any) => {
            console.log('register error', err);
          })
        } else {
          router.push('/');
        }
      } else {
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
      }
    } else if (status == 'unauthenticated') {
      router.push('/');
    }
  }, [status, path])

  useEffect(() => {
    console.log("Env test");
    console.log('NEXTAUTH_URL', process.env.NEXTAUTH_URL)
    console.log('NEXT_PUBLIC_TWITTER_CONSUMER_KEY',  process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY)
    console.log('NEXT_PUBLIC_TWITTER_CONSUMER_SECRET',  process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET)
    console.log('NEXTAUTH_SECRET', process.env. NEXTAUTH_SECRET)
    console.log('NEXT_PUBLIC_SERVER_URL',  process.env.NEXT_PUBLIC_SERVER_URL)
    console.log('NEXT_PUBLIC_WALLET_ADDRESS',  process.env.NEXT_PUBLIC_WALLET_ADDRESS)
  }, [])

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
      } else {
        return <Loading />
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