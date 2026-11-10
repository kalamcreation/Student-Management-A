import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Student Management System",
  description: "CRUD application with Next.js and MongoDB",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-6">
            <Link href="/students" className="text-xl font-bold text-gray-800">
              Student Manager
            </Link>
            <Link
              href="/students"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              All Students
            </Link>
            <Link
              href="/students/create"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Add Student
            </Link>
          </div>
        </nav>
        <main className="py-6">{children}</main>
      </body>
    </html>
  );
}