import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/container/layout/Header';
import Footer from '@/container/layout/Footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* <Header /> */}
        <Head>
          <script
            async
            src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7991043744509425'
            crossOrigin='anonymous'
          ></script>
        </Head>
        <main className=''>{children}</main>
        <div id='modal-root'></div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
