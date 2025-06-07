"use client";

import { ReactNode, useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, userLoading } = useAuth();
  const router = useRouter();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/auth/signin");
    }
  }, [user, router, userLoading]);

  if (!user) {
    return <p className="p-5">جاري التحقق من المستخدم...</p>;
  }

  return (
    <>
      <div className="mt-4 flex min-h-[90vh] bg-gray-100 pt-16">
        <aside
          className={`
            fixed
            left-0
            top-16
            z-40
            mt-4
            flex
            flex-col
            border-r
            border-gray-300
            bg-white
            shadow
            transition-all
            duration-300
            md:static
            md:translate-x-0
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            ${isCollapsed ? "md:w-20" : "md:w-64"}
            default for mobile w-[75%]
          `}
        >
          <div className="flex items-center justify-between border-b bg-gray-100 p-4">
            <button
              onClick={() => setIsCollapsed((prev) => !prev)}
              className="hidden text-gray-600 md:block"
            >
              {isCollapsed ? <ArrowRightCircle /> : <ArrowLeftCircle />}
            </button>
            <button
              className="text-gray-600 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            >
              إغلاق
            </button>
          </div>

          <nav className="flex-1 overflow-auto">
            <ul className="px-2 pt-2">
              <li className="my-2">
                <Link
                  href="/dashboard"
                  className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-200"
                >
                  الصفحة الرئيسية
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/dashboard/table"
                  className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-200"
                >
                  بيانات الجدول
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/blog/create-blog"
                  className="block rounded px-3 py-2 text-gray-700 hover:bg-gray-200"
                >
                  إنشاء مقالة جديدة
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <div className="flex items-center justify-between bg-white px-4 py-3 shadow md:hidden">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-gray-600"
            >
              <Menu />
            </button>
            <span className="font-bold">لوحة التحكم</span>
            <div />
          </div>

          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </div>
    </>
  );
}
