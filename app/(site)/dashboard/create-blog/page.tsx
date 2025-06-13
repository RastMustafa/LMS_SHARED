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
// app/(site)/blog/create-blog/page.tsx

"use client"; // هذا الكومبوننت يعمل كـ Client Component

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // سنحتفظ بها لـ metadata فقط
import { collection, addDoc, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from "@/firebase"; // تأكد من استيراد storage أيضاً
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// استيرادات TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Image as TiptapImageExtension } from '@tiptap/extension-image';
import { Link as TiptapLinkExtension } from '@tiptap/extension-link';
import { TextAlign } from '@tiptap/extension-text-align';

// استيرادات أيقونات Lucide React
import { Bold, Italic, List, ListOrdered, Image as LucideImage, AlignLeft, AlignRight, AlignCenter, AlignJustify, Link as LucideLink, Unlink } from "lucide-react";

import { useToast } from "@/hooks/use-toast"; // استخدام useToast من shadcn/ui


interface BlogData {
  title: string;
  content: string; // المحتوى الآن سيكون HTML
  author: string;
  category: string;
  metadata: string;
  mainImage: string;
}

interface Errors {
  title?: string;
  author?: string;
  category?: string;
  mainImage?: string;
  content?: string;
  metadata?: string;
}

const CreateBlogPage = () => {
  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    content: "",
    author: "",
    category: "",
    metadata: "",
    mainImage: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false); // لحالة زر الإرسال

  const { toast } = useToast(); // استدعاء useToast hook


  // تهيئة محرر TipTap
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { HTMLAttributes: { class: "[all:revert]" } },
        paragraph: { HTMLAttributes: { class: "leading-relaxed mb-4" } },
      }),
      BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
      ListItem.configure({ HTMLAttributes: { class: "mb-1" } }),
      TiptapImageExtension.configure({ // استخدام الاسم المعدل
        inline: false,
        allowBase64: true,
        HTMLAttributes: { class: "rounded-md my-4 border-2 mx-auto max-w-full h-auto" },
      }),
      TiptapLinkExtension.configure({ // استخدام الاسم المعدل
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { class: "text-blue-500 underline hover:text-blue-700 hover:cursor-pointer" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
    ],
    content: "<p>أدخل محتوى المقالة هنا</p>", // المحتوى الأولي عند إنشاء مقال جديد
    onUpdate: ({ editor }) => {
      setBlogData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'min-h-[250px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 prose max-w-none dark:prose-invert dark:border-strokedark', // Tailwind classes لمنطقة التحرير
      },
    },
  });

  // لإدارة حالة عدم تهيئة المحرر بعد
  if (!editor) {
    return null; // لا تعرض أي شيء حتى يتم تهيئة المحرر
  }

  // دالة لإضافة صورة من URL
  const addImageUrl = () => {
    const url = window.prompt("أدخل رابط الصورة (URL)");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // دالة لإضافة صورة من Firebase Storage
  const addImageFromFile = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // السماح فقط بالصور

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      toast({ title: "جاري الرفع", description: "جاري رفع الصورة إلى التخزين...", variant: "default", duration: 999999 });

      const storageRef = ref(storage, `blogImages/${file.name}`);

      try {
        const snapshot = await uploadBytes(storageRef, file); // رفع الملف
        const imageUrl = await getDownloadURL(snapshot.ref); // الحصول على رابط التحميل

        editor.chain().focus().setImage({ src: imageUrl }).run(); // إدخال الصورة في المحرر
        toast({ title: "نجاح", description: "تم رفع الصورة بنجاح!", variant: "default" });
      } catch (error) {
        console.error("Image upload failed:", error);
        toast({ title: "خطأ", description: "فشل تحميل الصورة.", variant: "default" });
      }
    };
    input.click(); // فتح نافذة اختيار الملفات
  };

  // دالة لإضافة/تعديل رابط
  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) { return; } // ألغى المستخدم

    if (url === '') { // رابط فارغ، يتم إزالة الرابط من النص المحدد
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    // تحديث أو تعيين الرابط
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };


  const validateForm = () => {
    const newErrors: Errors = {};
    if (!blogData.title.trim()) newErrors.title = "الرجاء إدخال العنوان";
    if (!blogData.author.trim()) newErrors.author = "الرجاء إدخال اسم المؤلف";
    if (!blogData.category.trim()) newErrors.category = "الرجاء اختيار التصنيف";
    if (!blogData.mainImage.trim()) newErrors.mainImage = "الرجاء إدخال رابط الصورة الرئيسية";
    if (!editor || editor.isEmpty) newErrors.content = "الرجاء إدخال المحتوى الكامل للمقالة";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const contentToSave = editor.getHTML();

      await addDoc(collection(db, "blogs"), {
        ...blogData,
        content: contentToSave, // حفظ محتوى HTML من المحرر
        createdAt: serverTimestamp(), // استخدام serverTimestamp
      });

      toast({ title: "تم النشر بنجاح", description: "تم نشر المقالة بنجاح 🎉", variant: "default" });

      // تفريغ النموذج بعد الإضافة
      setBlogData({
        title: "", content: "", author: "", category: "", metadata: "", mainImage: "",
      });
      editor.commands.clearContent(); // مسح محتوى المحرر
      setErrors({});
    } catch (error) {
      console.error("خطأ في الحفظ:", error);
      toast({ title: "خطأ", description: "حدث خطأ أثناء الحفظ.", variant: "default" });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">✍️ إضافة مقالة جديدة</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">
            عنوان المقالة
          </label>
          <Input
            id="title"
            name="title"
            placeholder="عنوان المقالة"
            value={blogData.title}
            onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="author" className="block mb-1 font-medium">
            اسم المؤلف
          </label>
          <Input
            id="author"
            name="author"
            placeholder="اسم المؤلف"
            value={blogData.author}
            onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
          />
          {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-medium">
            التصنيف (category)
          </label>
          <select
            id="category"
            name="category"
            className="w-full border border-gray-300 rounded-md p-2 dark:bg-blacksection dark:text-white"
            value={blogData.category}
            onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
          >
            <option value="">اختر التصنيف</option>
            <option value="Blog">Blog</option>
            <option value="Events">Events</option>
            <option value="Grids">Grids</option>
            <option value="News">News</option>
            <option value="Rounded">Rounded</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="mainImage" className="block mb-1 font-medium">
            رابط الصورة الرئيسية
          </label>
          <Input
            id="mainImage"
            name="mainImage"
            placeholder="رابط الصورة الرئيسية"
            value={blogData.mainImage}
            onChange={(e) => setBlogData({ ...blogData, mainImage: e.target.value })}
          />
          {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
        </div>

        <div>
          <label htmlFor="metadata" className="block mb-1 font-medium">
            وصف مختصر (metadata)
          </label>
          <Textarea
            id="metadata"
            name="metadata"
            placeholder="وصف مختصر"
            value={blogData.metadata}
            onChange={(e) => setBlogData({ ...blogData, metadata: e.target.value })}
          />
        </div>

        {/* <--- محرر TipTap هنا بدلاً من Textarea للمحتوى الكامل للمقالة ---> */}
        <div>
          <label htmlFor="content" className="block mb-1 font-medium">
            المحتوى الكامل للمقالة
          </label>
          {/* شريط أدوات TipTap */}
          <div className="flex flex-wrap gap-2 p-2 border rounded-t-md border-gray-300 dark:border-strokedark bg-gray-100 dark:bg-blacksection">
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("bold")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Bold strokeWidth={3} />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("italic")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <Italic />
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("heading", { level: 1 })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              H1
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("heading", { level: 2 })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              H2
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("heading", { level: 3 })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              H3
            </button>

            <button
              type="button"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("bulletList")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <List />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`rounded px-3 py-1 ${
                editor.isActive("orderedList")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <ListOrdered />
            </button>

            {/* أزرار إضافة الصورة والرابط */}
            <button
              type="button"
              onClick={addImageFromFile} // استخدام وظيفة الرفع من ملف
              className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
            >
              <LucideImage />
            </button>
            <button
              type="button"
              onClick={setLink}
              className={`rounded p-2 ${
                editor.isActive("link")
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <LucideLink />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetLink().run()}
              disabled={!editor.isActive('link')}
              className="rounded p-2 bg-gray-200 hover:bg-gray-300"
            >
              <Unlink />
            </button>

            {/* أزرار المحاذاة */}
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={`rounded p-2 ${
                editor.isActive({ textAlign: "left" })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <AlignLeft />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("center").run()}
              className={`rounded p-2 ${
                editor.isActive({ textAlign: "center" })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <AlignCenter />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={`rounded p-2 ${
                editor.isActive({ textAlign: "right" })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <AlignRight />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().setTextAlign("justify").run()}
              className={`rounded p-2 ${
                editor.isActive({ textAlign: "justify" })
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              <AlignJustify />
            </button>

            </div>
            {/* منطقة تحرير TipTap */}
            <EditorContent editor={editor} />
            {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "جاري الحفظ..." : "نشر المقالة"}
          </Button>
        </form>
      </div>
    );
  };

  export default CreateBlogPage;