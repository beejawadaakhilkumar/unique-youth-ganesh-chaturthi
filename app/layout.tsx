import "./globals.css";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Gayatri Nagar Ganesh Mahostvam | Unique Youth Association",
  description: "Welcome to the official website of the Unique Youth Association. Join us in celebrating the Gayatri Nagar Ganesh Mahostvam with our community gallery, schedule, and events.",
  keywords: "gayatri nagar ganesh mahostvam, Unique Youth Association, Ganesh Chaturthi Gayatri Nagar, youth association ganesh",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <div className="container navin">
            <Link href="/" className="brand">
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/uniq.jpg"
                  alt="Unique Youth Logo"
                  width={50}
                  height={50}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>

              <span>Unique Youth Association</span>
            </Link>

            <nav className="links">
              <Link href="/">Home</Link>
              <Link href="/members">Members</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/admin">Admin</Link>
            </nav>

            <div className="mobile">
              <Link className="btn btn-primary" href="/members">
                Members
              </Link>
            </div>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}