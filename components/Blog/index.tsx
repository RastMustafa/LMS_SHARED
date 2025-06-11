// import React from "react";
// import SectionHeader from "../Common/SectionHeader";
// import BlogItem from "./BlogItem";
// import BlogData from "./blogData";

// const Blog = async () => {
//   return (
//     <section className="py-20 lg:py-25 xl:py-30">
//       <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
//         {/* <!-- Section Title Start --> */}
//         <div className="animate_top mx-auto text-center">
//           <SectionHeader
//             headerInfo={{
//               title: `الأخبار والمدونات`,
//               subtitle: `آخر الأخبار والمدونات`,
//               description: `ابقَ على اطلاع بأحدث الأخبار حول المنح الدراسية، تأشيرات الدراسة، وفرص التعليم المختلفة. نحن نقدم لك كل ما تحتاج معرفته.`,
//             }}
//           />
//         </div>
//         {/* <!-- Section Title End --> */}
//       </div>

//       <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
//         <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
//           {BlogData.slice(0, 3).map((blog, key) => (
//             <BlogItem blog={blog} key={key} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Blog;
import React from "react";
import SectionHeader from "../Common/SectionHeader";
import BlogItem from "./BlogItem"; // تأكد من المسار الصحيح لـ BlogItem
// import BlogData from "./blogData"; // <--- إزالة هذا الاستيراد لأنه لم يعد ضرورياً

// استيرادات Firebase Firestore
import { collection, getDocs, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/firebase"; // تأكد من مسار تهيئة Firebase
import { Blog as BlogType } from "@/types/blog"; // استيراد نوع Blog وتغيير اسمه لتجنب التعارض


// <--- الكومبوننت أصبح async لجلب البيانات مباشرة --->
const Blog = async () => {
  let blogs: BlogType[] = []; // تعريف مصفوفة للمقالات
  let loadingError: string | null = null; // لرسائل الخطأ

  try {
    const blogsCollection = collection(db, "blogs");
    // جلب آخر 3 مقالات مرتبة حسب تاريخ الإنشاء تنازلياً
    const q = query(blogsCollection, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);

    blogs = querySnapshot.docs.map(docSnapshot => {
      const data = docSnapshot.data();
      const createdAt = data.createdAt instanceof Timestamp
        ? data.createdAt.toDate().toISOString().split('T')[0] // تنسيق YYYY-MM-DD
        : data.createdAt?.toString() || "Date N/A";

      return {
        id: docSnapshot.id, // <--- مهم جداً: الـ ID لاستخدامه في الروابط
        title: data.title || "بدون عنوان",
        metadata: data.metadata || "لا يوجد وصف.",
        mainImage: data.mainImage || "/images/placeholder.jpg", // <--- تأكد من وجود صورة placeholder.jpg في مجلد public
        author: data.author || "غير معروف",
        createdAt: createdAt,
        content: data.content || "",
        category: data.category || "عام",
        excerpt: data.excerpt || "",
      } as BlogType;
    });

    // إذا أردت عرض 3 مقالات فقط كما كان في السابق، استخدم slice هنا
    blogs = blogs.slice(0, 3);

  } catch (err) {
    console.error("Error fetching blogs in Server Component:", err);
    loadingError = "حدث خطأ أثناء تحميل المقالات. يرجى المحاولة لاحقاً.";
  }

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
        {/* */}
        <div className="animate_top mx-auto text-center">
          <SectionHeader
            headerInfo={{
              title: `آخر الأخبار والمدونات`,
              subtitle: `آخر الأخبار والمدونات`,
              description: `ابقَ على اطلاع بأحدث الأخبار حول المنح الدراسية، تأشيرات الدراسة، وفرص التعليم المختلفة. نحن نقدم لك كل ما تحتاج معرفته.`,
            }}
          />
        </div>
        {/* */}
      </div>

      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        {loadingError ? ( // <--- عرض رسالة الخطأ إذا حدث
          <div className="text-center py-20 text-red-500">
            <p className="text-xl">{loadingError}</p>
          </div>
        ) : blogs.length === 0 ? ( // <--- عرض رسالة عدم وجود مقالات
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl">لا توجد مقالات لعرضها حالياً.</p>
            {/* يمكنك إضافة زر لإنشاء مقال جديد إذا أردت */}
          </div>
        ) : ( // <--- عرض المقالات إذا وجدت
          <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {blogs.map((blog) => (
              <BlogItem blog={blog} key={blog.id} /> // استخدام blog.id كـ key
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;