import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sapphire Grand Hotel & Resort | Sapphire Hotel Management',
  description: 'The Art of Staying. Cinematic 3D Architectural Experience, Luxury Accommodations, Gastronomy, Thermal Spa & Hotel Management SaaS Platform.',
  keywords: ['Sapphire Grand', 'Luxury Hotel 3D', 'Sapphire Hotel Management', 'Digital Twin Hospitality', 'Hotel SaaS'],
  openGraph: {
    title: 'Sapphire Grand Hotel & Resort',
    description: 'The Art of Staying. Luxury hospitality reimagined with 3D Digital Twin technology.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-[#030712]">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
