import { Orbitron, Montserrat, Rajdhani, Permanent_Marker } from 'next/font/google';
import '../styles/globals.css';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-display'
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans'
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-syne'
});

const marker = Permanent_Marker({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script'
});

export const metadata = {
  title: 'Rahul Sharma — Video Editor & Visual Storyteller',
  description: 'Creative Video Editor & Visual Storyteller based in Rajasthan, India. Specializing in Adobe Premiere Pro, After Effects, CapCut, and motion graphics.',
  keywords: 'video editor, creative, motion graphics, after effects, premiere pro, content creator, India',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${montserrat.variable} ${rajdhani.variable} ${marker.variable}`}>
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
