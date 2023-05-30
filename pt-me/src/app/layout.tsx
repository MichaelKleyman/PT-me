/* eslint-disable react-hooks/exhaustive-deps */
'use client'; //this will be a client component
import { useEffect } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import { ThemeProvider } from 'next-themes';
import { Providers } from './Redux/provider';
import Layoutfile from '@/components/layoutfile';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang='en'>
        <body>
          <ThemeProvider enableSystem={true} attribute='class'>
            <Providers>
              <Layoutfile>{children}</Layoutfile>
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
