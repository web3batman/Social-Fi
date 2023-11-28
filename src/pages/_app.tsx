import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../contexts/UserProvider';
import { SocketProvider } from '@/contexts/SocketProvider';
import Layout from './components/layout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
      <SessionProvider session={session}>
        <UserProvider>
          <SocketProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketProvider>
        </UserProvider>
      </SessionProvider>
  )
}
