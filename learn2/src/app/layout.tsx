import Gnb from "./gnb";
import "./globals.scss";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Gnb />
        {children}
      </body>
    </html>
  );
}
