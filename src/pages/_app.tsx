import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MeshProvider } from '@meshsdk/react';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <MeshProvider>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MeshProvider>
  )
}
