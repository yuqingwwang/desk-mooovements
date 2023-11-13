import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import { Theme } from '@radix-ui/themes';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'DeskMooovement',
  description: 'A place to find your next workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={inter.variable}>
      <body>
        <Theme accentColor='purple' radius='small'>
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  );
}
