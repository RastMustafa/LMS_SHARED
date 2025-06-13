// // app/(site)/dashboard/d-blog/page.tsx

// "use client";

// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, orderBy, query, doc, deleteDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { Blog } from "@/types/blog"; // استيراد النوع الموحد
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';


// const BlogDashboardPage = () => {
//     const [posts, setPosts] = useState<Blog[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // 1. جلب البيانات عند تحميل الصفحة
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const postsCollection = collection(db, "blogs");
//                 const q = query(postsCollection, orderBy("createdAt", "desc"));
//                 const querySnapshot = await getDocs(q);
//                 const allPosts: Blog[] = querySnapshot.docs.map(doc => ({
//                     id: doc.id,
//                     ...(doc.data() as Omit<Blog, 'id'>)
//                 }));
//                 setPosts(allPosts);
//             } catch (err) {
//                 setError("حدث خطأ أثناء جلب المقالات.");
//                 console.error(err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPosts();
//     }, []);


//     // 2. دالة لحذف مقال محدد
//     const handleDelete = async (id: string) => {
//         // رسالة تأكيد قبل الحذف
//         if (!window.confirm("هل أنت متأكد من أنك تريد حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء.")) {
//             return;
//         }

//         try {
//             const postDocRef = doc(db, "blogs", id);
//             await deleteDoc(postDocRef);

//             // تحديث الواجهة مباشرة بعد الحذف
//             setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
            
//         } catch (err) {
//             alert("حدث خطأ أثناء حذف المقال.");
//             console.error(err);
//         }
//     };

//     if (loading) return <p className="text-center mt-10">جاري تحميل المقالات...</p>;
//     if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

//     return (
//         <div className="max-w-7xl mx-auto p-6" dir="rtl">
//             <div className="flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">إدارة المقالات</h1>
//                 <Link href="/blog/create-blog">
//                     <Button>إضافة مقال جديد</Button>
//                 </Link>
//             </div>

//             {/* 3. الجدول لعرض المقالات مع زر الحذف */}
//             <div className="bg-white dark:bg-blacksection shadow-md rounded-lg overflow-hidden">
//                 <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                     <thead className="bg-gray-50 dark:bg-gray-800">
//                         <tr>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المؤلف</th>
//                             <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
//                         </tr>
//                     </thead>
//                     <tbody className="bg-white dark:bg-blacksection divide-y divide-gray-200 dark:divide-gray-700">
//                         {posts.map(post => (
//                             <tr key={post.id}>
//                                 <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap">{post.author}</td>
//                                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                     <Link href={`/dashboard/blog/edit/${post.id}`} className="text-indigo-600 hover:text-indigo-900 ml-4">تعديل</Link>
//                                     <button
//                                         onClick={() => handleDelete(post.id)}
//                                         className="text-red-600 hover:text-red-900"
//                                     >
//                                         حذف
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default BlogDashboardPage;
// app/(site)/dashboard/d-blog/page.tsx

// app/(site)/dashboard/d-blog/page.tsx

// app/(site)/dashboard/d-blog/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { Blog } from "@/types/blog"; // تأكد من مسار ونوع Blog
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"; // <--- تأكد من مسار useToast

const BlogDashboardPage = () => {
    const [posts, setPosts] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsCollection = collection(db, "blogs");
                const q = query(postsCollection, orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);

                const allPosts: Blog[] = querySnapshot.docs.map(docSnapshot => {
                    const data = docSnapshot.data();
                    const createdAt = data.createdAt instanceof Timestamp
                        ? data.createdAt.toDate().toISOString().split('T')[0]
                        : data.createdAt;

                    return {
                        id: docSnapshot.id,
                        title: data.title || 'بلا عنوان',
                        author: data.author || 'غير معروف',
                        createdAt: createdAt || 'غير محدد',
                        excerpt: data.excerpt || '',
                    } as Blog;
                });
                setPosts(allPosts);
            } catch (err) {
                setError("حدث خطأ أثناء جلب المقالات.");
                console.error("Error fetching blog posts from Firestore:", err);
                toast({
                    title: "خطأ في التحميل",
                    description: "فشل في تحميل المقالات. يرجى التحقق من اتصالك بالإنترنت.",
                    variant: "default",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [toast]);

    const handleDelete = async (id: string, title: string) => {
        toast({
            title: "تأكيد الحذف",
            description: `هل أنت متأكد من أنك تريد حذف المقال "${title}"؟ لا يمكن التراجع عن هذا الإجراء.`,
            variant: "default",
            action: (
                <Button
                    variant="outline"
                    onClick={async () => {
                        try {
                            const postDocRef = doc(db, "blogs", id);
                            await deleteDoc(postDocRef);

                            setPosts(prevPosts => prevPosts.filter(post => post.id !== id));

                            toast({
                                title: "تم الحذف بنجاح",
                                description: `تم حذف المقال "${title}" بنجاح.`,
                                variant: "default",
                            });
                        } catch (err) {
                            toast({
                                title: "خطأ في الحذف",
                                description: `حدث خطأ أثناء حذف المقال "${title}". يرجى المحاولة مرة أخرى.`,
                                variant: "default",
                            });
                            console.error("Error deleting blog post from Firestore:", err);
                        }
                    }}
                    className="shrink-0"
                >
                    تأكيد الحذف
                </Button>
            ),
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-center text-lg text-gray-500">جاري تحميل المقالات...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-center text-lg text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6" dir="rtl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">إدارة المقالات</h1>
                <Link href="/dashboard/create-blog" passHref>
                    <Button asChild>
                        <span>إضافة مقال جديد</span>
                    </Button>
                </Link>
            </div>

            {posts.length === 0 ? (
                <div className="text-center mt-20">
                    <p className="text-xl text-gray-500 dark:text-gray-400">لا توجد مقالات لعرضها حالياً.</p>
                    <Link href="/blog/create-blog" passHref>
                        <Button className="mt-5">
                            <span>إنشاء أول مقال لك</span>
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">المؤلف</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تاريخ النشر</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {posts.map(post => (
                                <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 dark:text-gray-100 font-medium">{post.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{post.author}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600 dark:text-gray-300">{post.createdAt}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {/* <--- هذا هو الرابط إلى صفحة التعديل الجديدة ---> */}
                                        <Link href={`/dashboard/blog/edit/${post.id}`} passHref>
                                            <Button variant="link" className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 ml-4 p-0 h-auto">تعديل</Button>
                                        </Link>
                                        <Button
                                            variant="link"
                                            onClick={() => handleDelete(post.id, post.title)}
                                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 p-0 h-auto"
                                        >
                                            حذف
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BlogDashboardPage;