import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import SiteHeader from "~/components/site-header";
import { ThemeProvider } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Toaster } from "~/components/ui/sonner";
import { Muted } from "~/components/ui/typography";
import { siteConfig } from "~/config/site";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans antialiased ${inter.variable} flex min-h-screen w-full flex-col bg-muted/40`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SiteHeader></SiteHeader>
          <TRPCReactProvider>
            <div className="min-h-[calc(100vh-6rem)] px-4 sm:ps-20">
              {children}
            </div>
          </TRPCReactProvider>
          <div className="flex w-full items-center justify-between bg-background p-4 sm:ps-20">
            <Muted>© Ugurly 2024</Muted>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="space-x-1 text-muted-foreground"
                  >
                    <p>Legal</p>
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Legal</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/legal/privacy-policy">Privacy Policy</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/legal/terms-of-service">Terms of Service</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
