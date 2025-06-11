// "use client";
// import { Blog } from "@/types/blog";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const BlogItem = ({ blog }: { blog: Blog }) => {
//   const { mainImage, title, metadata } = blog;

//   return (
//     <>
//       <motion.div
//         variants={{
//           hidden: {
//             opacity: 0,
//             y: -20,
//           },

//           visible: {
//             opacity: 1,
//             y: 0,
//           },
//         }}
//         initial="hidden"
//         whileInView="visible"
//         transition={{ duration: 1, delay: 0.5 }}
//         viewport={{ once: true }}
//         className="animate_top rounded-lg bg-white border-socialicon border p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
//       >
//         <Link href={`/blog/`} className="relative block aspect-[368/239]">
//           <Image src={mainImage} alt={title} fill />
//         </Link>

//         <div dir="rtl" className="px-4">
//           <h3 className="  mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
//             <Link href={`/blog/blog-details`}>
//               {`${title.slice(0, 40)}...`}
//             </Link>
//           </h3>
//           <p className="line-clamp-3">{metadata}</p>
//         </div>
//       </motion.div>
//     </>
//   );
// };

// export default BlogItem;
// "use client";
// import { Blog } from "@/types/blog";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const BlogItem = ({ blog }: { blog: Blog }) => {

//   const { mainImage, title, metadata } = blog;

//   // معالجة مصدر الصورة: إما رابط صحيح أو صورة افتراضية
//   const imageUrl =
//     typeof mainImage === "string" && mainImage.startsWith("http")
//       ? mainImage
//       : "/default.jpg"; // تأكد من وجود default.jpg داخل مجلد public

//   return (
//     <motion.div
//       variants={{
//         hidden: { opacity: 0, y: -20 },
//         visible: { opacity: 1, y: 0 },
//       }}
//       initial="hidden"
//       whileInView="visible"
//       transition={{ duration: 1, delay: 0.5 }}
//       viewport={{ once: true }}
//       className="animate_top rounded-lg bg-white border-socialicon border p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
//     >
//       {/* <Link href={`/blog/`} className="relative block aspect-[368/239]">
//         <Image src={imageUrl} alt={title} fill />
//       </Link> */}
//       <Link href={`/blog/blog-details/${blog.id}`} className="relative block aspect-[368/239]">
//     <Image src={imageUrl} alt={blog.title} fill />
// </Link>

//       <div dir="rtl" className="px-4">
//         {/* <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
//           <Link href={`/blog/blog-details`}>
//             {title?.slice(0, 40) ?? "بدون عنوان"}...
//           </Link>
//         </h3> */}
//         <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
//     <Link href={`/blog/blog-details/${blog.id}`}> {/* <--- هنا التعديل */}
//         {blog.title?.slice(0, 40) ?? "بدون عنوان"}...
//     </Link>
// </h3>
//         <p className="line-clamp-3">{metadata ?? "لا يوجد وصف."}</p>
//       </div>
//     </motion.div>
//   );
// };

// components/BlogItem.tsx

import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link"; // استيراد Link من next/link

const BlogItem = ({ blog }: { blog: Blog }) => {
  const { id, mainImage, title, metadata } = blog; // <--- تأكد من استخراج id هنا

  // معالجة مصدر الصورة: إما رابط صحيح أو صورة افتراضية
  const imageUrl =
    typeof mainImage === "string" && mainImage.startsWith("http")
      ? mainImage
      : "/images/placeholder.jpg"; // <--- تأكد من وجود default.jpg داخل مجلد public

  return (
    <div
      // motion.div
      // variants={{
      //   hidden: { opacity: 0, y: -20 },
      //   visible: { opacity: 1, y: 0 },
      // }}
      // initial="hidden"
      // whileInView="visible"
      // transition={{ duration: 1, delay: 0.5 }}
      // viewport={{ once: true }}
      className="animate_top rounded-lg border border-socialicon bg-white p-4 pb-9 shadow-solid-8 dark:bg-blacksection"
    >
      {/* <--- روابط المقالات هنا ---> */}
      {/* هذا الرابط يحيط بالصورة ويقود إلى صفحة تفاصيل المقال */}
      <Link
        href={`/blog/blog-details/${blog.id}`}
        className="relative block aspect-[368/239]"
      >
        {" "}
        {/* <--- استخدام id هنا */}
        <Image
          src={imageUrl}
          alt={title || "Blog Image"}
          fill
          className="rounded-md object-cover"
        />
      </Link>

      <div dir="rtl" className="px-4">
        {/* هذا الرابط يحيط بالعنوان ويقود إلى صفحة تفاصيل المقال */}
        <h3 className="mb-3.5 mt-7.5 line-clamp-2 inline-block text-lg font-medium text-black duration-300 hover:text-primary dark:text-white dark:hover:text-primary xl:text-itemtitle2">
          <Link href={`/blog/blog-details/${blog.id}`}>
            {" "}
            {/* <--- استخدام id هنا */}
            {title?.slice(0, 40) ?? "بدون عنوان"}...
          </Link>
        </h3>
        <p className="line-clamp-3">{metadata ?? "لا يوجد وصف."}</p>
      </div>
    </div>
  );
};

export default BlogItem;
