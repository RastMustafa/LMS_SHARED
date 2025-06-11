// import RelatedPost from "@/components/Blog/RelatedPost";
// import SharePost from "@/components/Blog/SharePost";
// import { Metadata } from "next";
// import Image from "next/image";

// export const metadata: Metadata = {
//   title: "Blog Details Page - Solid SaaS Boilerplate",
//   description: "This is Blog details page for Solid Pro",
//   // other metadata
// };

// // Category is collection

// const blog = {
//   // categories: ["Blog", "...."],
//   category: "Event",
//   mainImage: "/images/blog/blog-02.png",
// };

// const SingleBlogPage = async () => {
//   return (
//     <>
//       <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
//         <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
//           <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
//             <div className="md:w-1/2 lg:w-[32%]">
//               <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
//                 <form
//                   action="https://formbold.com/s/unique_form_id"
//                   method="POST"
//                 >
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Search Here..."
//                       className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
//                     />

//                     <button
//                       className="absolute right-0 top-0 p-5"
//                       aria-label="search-icon"
//                     >
//                       <svg
//                         className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
//                         width="21"
//                         height="21"
//                         viewBox="0 0 21 21"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
//                       </svg>
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
//                 <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
//                   Categories
//                 </h4>

//                 <ul>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Blog</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Events</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Grids</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">News</a>
//                   </li>
//                   <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
//                     <a href="#">Rounded</a>
//                   </li>
//                 </ul>
//               </div>

//               <RelatedPost />
//             </div>

//             <div className="lg:w-2/3">
//               <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
//                 <div className="mb-10 w-full overflow-hidden ">
//                   <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
//                     <Image
//                       src={"/images/blog/blog-01.png"} // mainImage
//                       alt="Kobe Steel plant that supplied"
//                       fill
//                       className="rounded-md object-cover object-center"
//                     />
//                   </div>
//                 </div>

//                 <h2 className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2">
//                   Kobe Steel plant that supplied
//                 </h2>

//                 <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
//                   <li>
//                     <span className="text-black dark:text-white">Author: </span>{" "}
//                     Jhon Doe
//                   </li>
//                   <li>
//                     <span className="text-black dark:text-white">
//                       Published On: July 30, 2023
//                     </span>{" "}
//                   </li>
//                   <li>
//                     <span className="text-black dark:text-white">
//                       Category:
//                     </span>
//                     Events
//                   </li>
//                 </ul>

//                 <div className="blog-details">
//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Nunc quis nibh lorem. Duis sed odio lorem. In a efficitur
//                     leo. Ut venenatis rhoncus quam sed condimentum. Curabitur
//                     vel turpis in dolor volutpat imperdiet in ut mi. Integer non
//                     volutpat nulla. Nunc elementum elit viverra, tempus quam
//                     non, interdum ipsum.
//                   </p>

//                   <p>
//                     Aenean augue ex, condimentum vel metus vitae, aliquam porta
//                     elit. Quisque non metus ac orci mollis posuere. Mauris vel
//                     ipsum a diam interdum ultricies sed vitae neque. Nulla
//                     porttitor quam vitae pulvinar placerat. Nulla fringilla elit
//                     sit amet justo feugiat sodales. Morbi eleifend, enim non
//                     eleifend laoreet, odio libero lobortis lectus, non porttitor
//                     sem urna sit amet metus. In sollicitudin quam est,
//                     pellentesque consectetur felis fermentum vitae.
//                   </p>

//                   <div className="flex flex-wrap gap-5">
//                     <Image
//                       src={"/images/blog/blog-01.png"}
//                       width={350}
//                       height={200}
//                       alt="image"
//                     />
//                     <Image
//                       src={"/images/blog/blog-02.png"}
//                       width={350}
//                       height={200}
//                       alt="image"
//                     />
//                   </div>

//                   <h3 className="pt-8">
//                     Nunc elementum elit viverra, tempus quam non
//                   </h3>

//                   <p>
//                     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                     Nunc quis nibh lorem. Duis sed odio lorem. In a efficitur
//                     leo. Ut venenatis rhoncus quam sed condimentum. Curabitur
//                     vel turpis in dolor volutpat imperdiet in ut mi. Integer non
//                     volutpat nulla. Nunc elementum elit viverra, tempus quam
//                     non, interdum ipsum.
//                   </p>
//                 </div>

//                 <SharePost />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default SingleBlogPage;
// app/(site)/blog-details/[id]/page.tsx
// (أو المسار الذي اخترته، مثلاً app/(site)/blog/[id]/page.tsx)

// app/(site)/blog-details/[id]/page.tsx
// (أو المسار الذي اخترته لصفحة تفاصيل المقال)

// app/(site)/blog-details/[id]/page.tsx
// (أو المسار الذي اخترته لصفحة تفاصيل المقال)

// <--- إزالة "use client"; هنا لأنها ستصبح Server Component --->
// "use client";
// app/(site)/blog-details/[id]/page.tsx
// (أو المسار الذي اخترته لصفحة تفاصيل المقال)

// إزالة "use client"; لأن هذا Server Component

import React from "react"; // React فقط، بدون useState, useEffect
import { doc, getDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { Blog } from "@/types/blog";
import Image from "next/image";
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import { Metadata } from "next"; // استيراد Metadata

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id: blogId } = await params; // استخدام await لفك الـ Promise

  if (!blogId) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const docRef = doc(db, "blogs", blogId);
  const docSnap = await getDoc(docRef);
  const blogData = docSnap.exists() ? docSnap.data() : null;

  return {
    title: blogData?.title || "Blog Details - U-Skills",
    description: blogData?.metadata || "Details of a blog post from U-Skills.",
  };
}

interface SingleBlogPageProps {
  params: { id: string }; // تستقبل الـ ID كـ object مباشر في Server Component
}

const SingleBlogPage = async ({ params }: SingleBlogPageProps) => {
  const { id } = await params; // استخدام await لفك الـ Promise

  // لا يوجد useState, useEffect, loading, error هنا.
  // جلب البيانات يتم مباشرة في أعلى الكومبوننت.

  if (!id) {
    return (
      <section className="flex min-h-screen items-center justify-center py-20 text-red-500">
        <p className="text-xl">Blog ID is missing.</p>
      </section>
    );
  }

  let blogData: Blog | null = null;
  let hasError = false;

  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const createdAt =
        data.createdAt instanceof Timestamp
          ? data.createdAt.toDate().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : data.createdAt?.toString() || "Date N/A";

      blogData = {
        id: docSnap.id,
        title: data.title || "لا يوجد عنوان",
        author: data.author || "مجهول",
        createdAt: createdAt,
        content: data.content || "لا يوجد محتوى.",
        category: data.category,
        mainImage: data.mainImage || "/images/placeholder.png",
        metadata: data.metadata || "",
        excerpt: data.excerpt || "",
      } as Blog;
    } else {
      hasError = true;
    }
  } catch (err) {
    console.error("Error fetching blog post in Server Component:", err);
    hasError = true;
  }

  if (hasError || !blogData) {
    return (
      <section className="flex min-h-screen items-center justify-center py-20 text-red-500">
        <p className="text-xl">Blog post not found or failed to load.</p>
      </section>
    );
  }

  return (
    <>
      <section className="pb-20 pt-35 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
            {/* العمود الجانبي (Search, Categories, Related Posts) */}
            <div className="md:w-1/2 lg:w-[32%]">
              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-3.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <form
                  action="https://formbold.com/s/unique_form_id"
                  method="POST"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Here..."
                      className="w-full rounded-lg border border-stroke px-6 py-4 shadow-solid-12 focus:border-primary focus:outline-none dark:border-strokedark dark:bg-black dark:shadow-none dark:focus:border-primary"
                    />
                    <button
                      className="absolute right-0 top-0 p-5"
                      aria-label="search-icon"
                    >
                      <svg
                        className="fill-black transition-all duration-300 hover:fill-primary dark:fill-white dark:hover:fill-primary"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.031 14.617L20.314 18.899L18.899 20.314L14.617 16.031C13.0237 17.3082 11.042 18.0029 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18.0029 11.042 17.3082 13.0237 16.031 14.617ZM14.025 13.875C15.2941 12.5699 16.0029 10.8204 16 9C16 5.132 12.867 2 9 2C5.132 2 2 5.132 2 9C2 12.867 5.132 16 9 16C10.8204 16.0029 12.5699 15.2941 13.875 14.025L14.025 13.875Z" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>

              <div className="animate_top mb-10 rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
                <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
                  Categories
                </h4>
                <ul>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Blog</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Events</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Grids</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">News</a>
                  </li>
                  <li className="mb-3 transition-all duration-300 last:mb-0 hover:text-primary">
                    <a href="#">Rounded</a>
                  </li>
                </ul>
              </div>

              <RelatedPost
                currentBlogId={id}
                currentBlogCategory={blogData.category}
              />
            </div>

            {/* المحتوى الرئيسي للمقالة */}
            <div className="lg:w-2/3">
              <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-solid-13 dark:border-strokedark dark:bg-blacksection md:p-10">
                <div className="mb-10 w-full overflow-hidden ">
                  <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                    <Image
                      src={blogData.mainImage}
                      alt={blogData.title || "Blog Image"}
                      fill
                      className="rounded-md object-cover object-center"
                    />
                  </div>
                </div>

                <h2
                  dir="auto"
                  className="mb-5 mt-11 text-3xl font-semibold text-black dark:text-white 2xl:text-sectiontitle2"
                >
                  {blogData.title}
                </h2>

                <ul className="mb-9 flex flex-wrap gap-5 2xl:gap-7.5">
                  <li>
                    <span className="text-black dark:text-white">Author: </span>{" "}
                    {blogData.author}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Published On:{" "}
                    </span>
                    {blogData.createdAt}
                  </li>
                  <li>
                    <span className="text-black dark:text-white">
                      Category:
                    </span>
                    {blogData.category}
                  </li>
                </ul>

                <div className="blog-details">
                  {/* <--- التعديل هنا: استخدام dangerouslySetInnerHTML لعرض المحتوى HTML من TipTap ---> */}
                  {/* تطبيق dir="auto" ليتم الكشف عن الاتجاه ديناميكياً */}
                  <div
                    className="prose dark:prose-invert max-w-none"
                    dir="auto"
                    dangerouslySetInnerHTML={{ __html: blogData.content }}
                  />
                  {/* <------------------------------------------------------------------------------------> */}{" "}
                  {/* <------------------------------------------------------------------------------------> */}
                </div>

                <SharePost />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SingleBlogPage;
