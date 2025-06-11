// // import BlogData from "@/components/Blog/blogData";
// import BlogItem from "@/components/Blog/BlogItem";
// // import { BlogItem } from "@/components/Blog/BlogItem";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Blog Page - Solid SaaS Boilerplate",
//   description: "This is Blog page for Solid Pro",
//   // other metadata
// };

// const BlogPage = async () => {
//   return (
//     <>
//       {/* <!-- ===== Blog Grid Start ===== --> */}
//       <section className="py-20 lg:py-25 xl:py-30">
//         <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
//           <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
//             {BlogData.map((post, key) => (
//               <BlogItem key={key} blog={post} />
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* <!-- ===== Blog Grid End ===== --> */}
//     </>
//   );
// };

// export default BlogPage;
// app/dashboard/blog/page.tsx أو ملف مشابه
import {
  collection,
  getDocs,
  getFirestore,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/firebase"; // Make sure this is server-safe
import BlogItem from "@/components/Blog/BlogItem";
import { Blog } from "@/types/blog";

// ✅ This is a Server Component
export default async function BlogPage() {
  const querySnapshot = await getDocs(collection(db, "blogs"));

  const blogs: Blog[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title ?? "بدون عنوان",
      metadata: data.metadata ?? "",
      body: data.body ?? "",
      mainImage: data.mainImage ?? "",
      author: data.author ?? {},
      tags: data.tags ?? [],
      publishedAt:
        data.publishedAt instanceof Timestamp
          ? data.publishedAt.toDate().toISOString()
          : (data.publishedAt ?? ""),
    };
  });

  return (
    <section className="py-20 lg:py-25 xl:py-30">
      <div className="mx-auto mt-15 max-w-c-1280 px-4 md:px-8 xl:mt-20 xl:px-0">
        <div className="grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {blogs.map((post) => (
            <BlogItem key={post.id} blog={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
