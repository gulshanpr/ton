"use client";
import "./globals.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <script src="https://telegram.org/js/telegram-web-app.js"></script>
      <body>
        <TonConnectUIProvider manifestUrl="https://lime-worthy-gorilla-1.mypinata.cloud/ipfs/QmYGEC76zcUMA2w2uuvzH3SimjJGLXLEwCgeM1FcR654PP">
          {children}
        </TonConnectUIProvider>
      </body>
    </html>
  );
}
