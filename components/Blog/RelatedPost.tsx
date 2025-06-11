// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import BlogData from "./blogData";

// const RelatedPost = async () => {
//   return (
//     <>
//       <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
//         <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
//           Related Posts
//         </h4>

//         <div>
//           {BlogData.slice(0, 3).map((post, key) => (
//             <div
//               className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
//               key={key}
//             >
//               <div className="max-w-45 relative h-18 w-45">
//                 {post.mainImage ? (
//                   <Image fill src={post.mainImage} alt="Blog" />
//                 ) : (
//                   "No image"
//                 )}
//               </div>
//               <h5 className="text-md font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
//                 <Link href={`/blog/blog-details`}>
//                   {" "}
//                   {post.title.slice(0, 40)}...
//                 </Link>
//               </h5>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default RelatedPost;
import React from "react";
import Image from "next/image";
import Link from "next/link";

// استيرادات Firebase Firestore (تم التعديل هنا)
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  documentId, // ✅ استيراد documentId مباشرة
  Timestamp,
} from "firebase/firestore"; // <--- أضف FieldPath هنا
import { db } from "@/firebase";
import { Blog } from "@/types/blog";

interface RelatedPostProps {
  currentBlogId: string;
  currentBlogCategory?: string;
}

const RelatedPost = async ({
  currentBlogId,
  currentBlogCategory,
}: RelatedPostProps) => {
  let relatedBlogs: Blog[] = [];
  const postsLimit = 3;

  try {
    const blogsCollection = collection(db, "blogs");
    let q;

    if (currentBlogCategory) {
      // 1. Fetch posts with the same category (we’ll filter out the current post manually)
      const q = query(
        blogsCollection,
        where("category", "==", currentBlogCategory),
        limit(5),
      );

      const categorySnapshot = await getDocs(q);

      relatedBlogs = categorySnapshot.docs
        .filter((docSnapshot) => docSnapshot.id !== currentBlogId) // Exclude current post
        .slice(0, 2) // Limit to 2 related posts after filtering
        .map((docSnapshot) => {
          const data = docSnapshot.data();
          const createdAt =
            data.createdAt instanceof Timestamp
              ? data.createdAt.toDate().toISOString().split("T")[0]
              : data.createdAt?.toString() || "Date N/A";

          return {
            id: docSnapshot.id,
            title: data.title,
            mainImage: data.mainImage,
            createdAt,
          } as Blog;
        });
    }

    relatedBlogs = [...relatedBlogs].slice(0, postsLimit);
  } catch (error) {
    console.error("Error fetching related posts:", error);
    // يمكن هنا إظهار رسالة خطأ بسيطة في الواجهة إذا أردت
  }

  return (
    <>
      <div className="animate_top rounded-md border border-stroke bg-white p-9 shadow-solid-13 dark:border-strokedark dark:bg-blacksection">
        <h4 className="mb-7.5 text-2xl font-semibold text-black dark:text-white">
          Related Posts
        </h4>

        <div>
          {relatedBlogs.length === 0 ? (
            <p className="text-gray-500">لا توجد مقالات ذات صلة حالياً.</p>
          ) : (
            relatedBlogs.map((post) => (
              <div
                className="mb-7.5 flex flex-wrap gap-4 xl:flex-nowrap 2xl:gap-6"
                key={post.id}
              >
                <div className="relative h-18 w-45 max-w-45 flex-shrink-0">
                  {post.mainImage ? (
                    <Image
                      fill
                      src={post.mainImage}
                      alt={post.title || "Blog Post Image"}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <Image
                      fill
                      src="/images/placeholder.jpg"
                      alt="Placeholder"
                      className="rounded-md object-cover"
                    />
                  )}
                </div>
                <h5 className="text-md flex-grow font-medium text-black transition-all duration-300 hover:text-primary dark:text-white dark:hover:text-primary">
                  <Link href={`/blog/blog-details/${post.id}`}>
                    {post.title
                      ? `${post.title.slice(0, 40)}...`
                      : "بدون عنوان"}
                  </Link>
                </h5>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default RelatedPost;
