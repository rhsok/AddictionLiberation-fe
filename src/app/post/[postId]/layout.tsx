import Footer from '@/container/layout/Footer';
import ShortHeader from '@/container/layout/ShortHeader';
import React from 'react';

function PostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <ShortHeader />
      {children}
      <Footer />
    </div>
  );
}

export default PostLayout;
