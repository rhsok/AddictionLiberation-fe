import Footer from '@/container/layout/Footer';
import Header from '@/container/layout/Header';
import React from 'react';

function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default MainLayout;
