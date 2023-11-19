import { Oswald, Raleway } from "next/font/google";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], weight: ["600"] });
const rale = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

export const metadata = {
  title: "Treasure Hunt",
  description: "a blockchain based treasure hunt game for geekathon 1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@600&family=Raleway:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${oswald.className} ${rale.className} flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
