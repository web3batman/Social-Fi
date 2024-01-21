import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { UserProvider } from '../contexts/UserProvider';
import { SocketProvider } from '@/contexts/SocketProvider';
import { SearchProvider } from '@/contexts/SearchProvider';
import Layout from '@/components/layout';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <SearchProvider>
          <SocketProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketProvider>
        </SearchProvider>
      </UserProvider>
    </SessionProvider>
  )
}
