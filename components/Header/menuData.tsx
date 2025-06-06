import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 3,
    title: "الصفحات",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "شبكة المدونة",
        newTab: false,
        path: "/blog",
      },
      {
        id: 34,
        title: "تسجيل الدخول",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 35,
        title: "إنشاء حساب",
        newTab: false,
        path: "/auth/signup",
      },
      {
        id: 35,
        title: "التوثيق",
        newTab: false,
        path: "/docs",
      },
      {
        id: 35.1,
        title: "الدعم",
        newTab: false,
        path: "/support",
      },
      {
        id: 36,
        title: "404 (غير موجود)",
        newTab: false,
        path: "/error",
      },
    ],
  },
  {
    id: 2.3,
    title: "آراء العملاء",
    newTab: false,
    path: "/testimonies",
  },
  {
    id: 2.1,
    title: " مقالات و اخبار",
    newTab: false,
    path: "/blog",
  },
  {
    id: 2,
    title: "خدماتنا",
    newTab: false,
    path: "/#features",
  },
  {
    id: 1,
    title: "الرئيسية",
    newTab: false,
    path: "/",
  },
];

export default menuData;
