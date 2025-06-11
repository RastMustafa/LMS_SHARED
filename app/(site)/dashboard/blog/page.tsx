// // app/dashboard/blog/page.tsx
// "use client";

// import { db } from "@/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useState } from "react";
// import { toast } from "react-hot-toast";

// export default function BlogPage() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleCreatePost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !content) {
//       toast.error("يجب ملء الحقول المطلوبة");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         title,
//         content,
//         createdAt: new Date().toISOString(),
//       });
//       toast.success("تم إنشاء التدوينة بنجاح!");
//       setTitle("");
//       setContent("");
//     } catch (error: any) {
//       toast.error("فشل في إنشاء التدوينة: " + error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-xl font-bold">إنشاء تدوينة جديدة</h1>
//       <form onSubmit={handleCreatePost} className="space-y-4">
//         <div>
//           <label className="mb-1 block">العنوان</label>
//           <input
//             type="text"
//             className="w-full border p-2"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="أدخل عنوان التدوينة"
//           />
//         </div>
//         <div>
//           <label className="mb-1 block">المحتوى</label>
//           <textarea
//             className="w-full border p-2"
//             rows={5}
//             value={content}
//             onChange={(e) => setContent(e.target.value)}
//             placeholder="أدخل محتوى التدوينة"
//           />
//         </div>
//         <button type="submit" className="rounded bg-black px-4 py-2 text-white">
//           حفظ
//         </button>
//       </form>
//     </div>
//   );
// }
// "use client";

// import { db } from "@/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
// import Image from "@tiptap/extension-image";
// import Link from "@tiptap/extension-link";
// import TextAlign from "@tiptap/extension-text-align";

// export default function BlogPage() {
//   const [title, setTitle] = useState("");

//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Underline,
//       Image,
//       Link.configure({ openOnClick: false }),
//       TextAlign.configure({ types: ["heading", "paragraph"] }),
//     ],
//     content: "",
//   });

//   const handleCreatePost = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!title || !editor?.getHTML().trim()) {
//       toast.error("يجب ملء الحقول المطلوبة");
//       return;
//     }

//     try {
//       await addDoc(collection(db, "posts"), {
//         title,
//         content: editor.getHTML(),
//         createdAt: new Date().toISOString(),
//       });
//       toast.success("تم إنشاء التدوينة بنجاح!");
//       setTitle("");
//       editor.commands.setContent("");
//     } catch (error: any) {
//       toast.error("فشل في إنشاء التدوينة: " + error.message);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="mb-4 text-xl font-bold">إنشاء تدوينة جديدة</h1>
//       <form onSubmit={handleCreatePost} className="space-y-4">
//         <div>
//           <label className="mb-1 block">العنوان</label>
//           <input
//             type="text"
//             className="w-full border p-2"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="أدخل عنوان التدوينة"
//           />
//         </div>

//         <div>
//           <label className="mb-1 block">المحتوى</label>
//           {/* محرر Tiptap */}
//           <div className="border p-2 min-h-[200px] bg-white rounded">
//             <EditorContent editor={editor} />
//           </div>
//         </div>

//         <button type="submit" className="rounded bg-black px-4 py-2 text-white">
//           حفظ
//         </button>
//       </form>
//     </div>
//   );
// }
