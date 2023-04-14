'use client'; //this will be a client component
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <ThemeProvider enableSystem={true} attribute='class'>
          {/* <Provider> */}
          <Navbar />
          {children}
          {/* </Provider> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
