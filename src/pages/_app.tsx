import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../contexts/UserProvider';
import { SocketProvider } from '@/contexts/SocketProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <SessionProvider session={session}>
        <UserProvider>
          <SocketProvider>
            <Component {...pageProps} />
          </SocketProvider>
        </UserProvider>
      </SessionProvider>
  )
}
