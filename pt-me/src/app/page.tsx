import AboutUs from '@/components/AboutUs';
import Services from '@/components/Services';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl mt-[10rem]'>
      <AboutUs />
      <Services />
    </main>
  );
}
