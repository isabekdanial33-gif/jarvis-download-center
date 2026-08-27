import "./styles.css";

export const metadata = {
  title: "JARVIS — Download Center",
  description: "Download JARVIS Desktop for Windows, portable builds, and JARVIS Mobile APK releases."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
