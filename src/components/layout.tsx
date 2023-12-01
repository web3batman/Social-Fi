import React, { useState, ReactNode, useEffect } from 'react'
import LandingHeader from './landingheader'
import Footer from './landingfooter'
import Header from './header'
import { Saira } from 'next/font/google';
import { usePathname } from 'next/navigation';

const saira = Saira({
  weight: '400',
  subsets: ['latin']
})

interface MyComponentProps {
    children: ReactNode;
}

const Layout = ({ children }: MyComponentProps) => {
    const router = usePathname();
    const [main, setMain] = useState(false);

    useEffect(() => {
        if (router == '/') {
            setMain(true)
        } else {
            setMain(false)
        }
    }, [router])

    if (!main) {
        return(
            <div className={saira.className}>
                <Header />
                {children}
            </div>  
        ) 
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

export default Layout