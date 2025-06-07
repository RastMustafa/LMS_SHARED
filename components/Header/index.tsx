"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import menuData from "./menuData";
import { Menu } from "lucide-react";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [dropdownToggler, setDropdownToggler] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);

  const pathUrl = usePathname();

  const { user, logOut } = useAuth();

  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("تم تسجيل الخروج بنجاح!");
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ أثناء تسجيل الخروج");
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 z-999 w-full py-5 ${
        stickyMenu
          ? "bg-white !py-5 shadow transition duration-100 dark:bg-black"
          : "bg-[#dee2e6]"
      }`}
    >
      <div className="relative mx-auto max-w-c-1390 items-center justify-between px-4 md:px-8 xl:flex 2xl:px-0">
        <div className="flex w-full items-center justify-between xl:w-1/4">
          <Link href="/">
            <Image
              src="/images/logo/Group1.svg"
              alt="logo"
              width={100}
              height={24}
              className="w-[70%] dark:hidden"
            />
            {/* If you have a separate dark mode logo, include it here */}
          </Link>

          {/* Hamburger Toggle BTN (mobile) */}
          <button
            aria-label="hamburger Toggler"
            className="block xl:hidden"
            onClick={() => setNavigationOpen(!navigationOpen)}
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <Menu />
            </span>
          </button>
        </div>
        {/* End Logo / Hamburger */}

        {/* Nav Menu Start */}
        <div
          className={`invisible h-0 w-full items-center justify-center xl:visible xl:flex xl:h-auto xl:w-full ${
            navigationOpen &&
            "navbar !visible mt-4 h-auto max-h-[400px] rounded-md bg-white p-7.5 shadow-solid-5 dark:bg-blacksection xl:h-auto xl:p-0 xl:shadow-none xl:dark:bg-transparent"
          }`}
        >
          <nav className="mx-auto">
            <ul className="flex flex-col gap-5 self-end xl:flex-row xl:items-end xl:gap-10">
              {menuData.map((menuItem, key) => (
                <li key={key} className={menuItem.submenu && "group relative"}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() => setDropdownToggler(!dropdownToggler)}
                        className="flex cursor-pointer items-center justify-between gap-3 hover:text-primary"
                      >
                        {menuItem.title}
                        <span>
                          <svg
                            className="h-3 w-3 cursor-pointer fill-waterloo group-hover:fill-primary"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                          </svg>
                        </span>
                      </button>

                      <ul
                        className={`dropdown ${dropdownToggler ? "flex" : ""}`}
                      >
                        {menuItem.submenu.map((item, subKey) => (
                          <li
                            key={subKey}
                            className="font-semibold hover:text-primary"
                          >
                            <Link href={item.path || "#"}>{item.title}</Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={`${menuItem.path}`}
                      className={
                        pathUrl === menuItem.path
                          ? "font-semibold text-primary hover:text-primary"
                          : "hover:text-primary"
                      }
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Right side: If user logged in, show user email + Dashboard link + logout; otherwise show login button */}
          <div className="ml-auto mt-7 flex items-center gap-6 xl:mt-0">
            {user ? (
              <div className="flex items-center gap-3">
                {/* Dashboard Link */}
                <Link
                  href="/dashboard"
                  className="flex rounded-lg bg-blue-600 px-4.5 py-1 text-white duration-300 ease-in-out hover:bg-blue-700"
                >
                  لوحة التحكم
                </Link>

                {/* Show user email (optional) */}
                <span className="font-semibold">{user.email}</span>

                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  className="flex rounded-lg bg-black px-4.5 py-1 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex rounded-lg bg-black px-4.5 py-1 text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
