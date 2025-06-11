// "use client";

// import React, { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { collection, addDoc, Timestamp } from "firebase/firestore";
// import Tiptap from "@/components/Tiptap";
// import { useRouter } from "next/navigation";
// import { db } from "@/firebase";

// const CreateBlogPage = () => {
//   interface BlogData {
//     title: string;
//     createdBy: string;
//     date: string;
//     content: string;
//   }

//   const [blogData, setBlogData] = useState<BlogData>({
//     title: "",
//     createdBy: "",
//     date: new Date().toISOString().split("T")[0],
//     content: "",
//   });

//   const [titleErrorMessage, setTitleErrorMessage] = useState("");
//   const [createdByErrorMessage, setCreatedByErrorMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const router = useRouter();

//   const handleSubmit = async () => {
//     // التحقق من الحقول المطلوبة
//     let valid = true;

//     if (!blogData.title.trim()) {
//       setTitleErrorMessage("يرجى إدخال عنوان المقالة.");
//       valid = false;
//     } else {
//       setTitleErrorMessage("");
//     }

//     if (!blogData.createdBy.trim()) {
//       setCreatedByErrorMessage("يرجى إدخال اسم المؤلف.");
//       valid = false;
//     } else {
//       setCreatedByErrorMessage("");
//     }

//     if (!valid) return;

//     setLoading(true);

//     try {
//       await addDoc(collection(db, "blogs"), {
//         title: blogData.title,
//         createdBy: blogData.createdBy,
//         content: blogData.content,
//         date: Timestamp.fromDate(new Date()),
//       });

//       // router.push("/blogs"); // اختياري: إعادة توجيه بعد الحفظ
//     } catch (error) {
//       console.error("Error saving blog:", error);
//       alert("حدث خطأ أثناء حفظ المقالة.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="mx-auto max-w-4xl px-4 py-20 md:px-10">
//       <h1 className="mb-6 text-center text-3xl font-bold">
//         ✍️ إنشاء مقالة جديدة
//       </h1>

//       <div className="space-y-4" dir="rtl">
//         <div>
//           <label className="font-medium text-gray-700">عنوان المقالة:</label>
//           <Input
//             value={blogData.title}
//             onChange={(e) =>
//               setBlogData({ ...blogData, title: e.target.value })
//             }
//             placeholder="اكتب عنوان المقالة هنا"
//           />
//           {titleErrorMessage && (
//             <p className="mt-1 text-sm text-red-500">{titleErrorMessage}</p>
//           )}
//         </div>

//         <div>
//           <label className="font-medium text-gray-700">اسم المؤلف:</label>
//           <Input
//             value={blogData.createdBy}
//             onChange={(e) =>
//               setBlogData({ ...blogData, createdBy: e.target.value })
//             }
//             placeholder="اسم الكاتب"
//           />
//           {createdByErrorMessage && (
//             <p className="mt-1 text-sm text-red-500">{createdByErrorMessage}</p>
//           )}
//         </div>

//         <div>
//           <label className="font-medium text-gray-700">المحتوى:</label>
//           <Tiptap
//             blogData={blogData}
//             setBlogData={setBlogData}
//             setCreatedByErrorMessage={setCreatedByErrorMessage}
//             setTitleErrorMessage={setTitleErrorMessage}
//           />
//         </div>

//         <div className="pt-6 text-left">
//           <Button onClick={handleSubmit} disabled={loading}>
//             {loading ? "يتم الحفظ..." : "نشر المقالة"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateBlogPage;
