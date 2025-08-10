import "./index.css";
import YearDisplay from "@/components/YearDisplay";
import { AuthProvider } from "@/context/AuthContext";
import LenisProvider from "@/components/LenisProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical fonts to prevent buffering */}
        <link
          rel="preload"
          href="/src/styles/Assets/fonts/Gilroy-Medium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/src/styles/Assets/fonts/HelveticaNowDisplay-Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/src/styles/Assets/fonts/NeueMachina-Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/src/styles/Assets/fonts/BrocaRegular-BLXy5.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <LenisProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
