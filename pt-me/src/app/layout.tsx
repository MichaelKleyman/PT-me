'use client'; //this will be a client component
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from 'next-themes';
import { Providers } from './Redux/provider';

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
              <Navbar />
              {children}
            </Providers>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
