import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
// import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import MySessionProviders from "@/mysessionProvider/mySessionProviders";
import { CartContextProvider } from "@/context/CartContext";
import { WishlistProvider } from '@/context/wishlistContext';


export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <MySessionProviders>
          <CartContextProvider>
            <WishlistProvider>
              <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
                <div className="relative flex flex-col h-screen">
                  <Navbar />
                  <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                    <Providers>
                      {children}
                    </Providers>
                  </main>
                  <footer className="bg-gray-100 dark:bg-[#090909] my-5">
                    <div className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                      <Footer />
                    </div>
                  </footer>
                </div>
              </Providers>
            </WishlistProvider>
          </CartContextProvider>
        </MySessionProviders>
      </body>
    </html>
  );
}
