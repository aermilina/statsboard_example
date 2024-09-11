import React from 'react';
import Header from '@/components/Header';

interface Props {
  children: React.ReactNode;
}

/*  The layout of the interface*/

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
