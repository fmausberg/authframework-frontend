"use client"
import Navbar from '../components/navbar-component/navbar';
import Footer from '../components/footer-component/footer';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}