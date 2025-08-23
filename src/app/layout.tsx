import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import ThemeToggleButton from '@/components/ThemeToggleButton';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Rocbird Takehome',
    description: 'Staffing tool para gestión de talentos',
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} disableTransitionOnChange>
                    <main>{children}</main>
                    <Toaster richColors position="top-right" />
                    <ThemeToggleButton />
                </ThemeProvider>
            </body>
        </html>
    );
}
