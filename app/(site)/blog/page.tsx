import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import BlogItem from "@/components/Blog/BlogItem";

export default async function BlogPage() {
  const querySnapshot = await getDocs(collection(db, "blogs"));

  const blogs: any = querySnapshot.docs.map((doc) => {
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
