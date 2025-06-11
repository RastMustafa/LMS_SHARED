// // app/(site)/dashboard/blog/edit/[id]/page.tsx

// "use client";

// import React, { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { collection, addDoc, Timestamp, doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@/firebase";
// import { useToast } from "@/hooks/use-toast"; // تأكد من مسار useToast
// import { useRouter } from "next/navigation"; // استيراد useRouter للتوجيه بعد الحفظ
//  import { Link } from "lucide-react";
// interface BlogData {
//   title: string;
//   content: string;
//   author: string;
//   category: string;
//   metadata: string;
//   mainImage: string;
// }

// interface EditBlogPageProps {
//   params: { id: string }; // هنا id إلزامي لأنه صفحة [id]
// }

// const EditBlogPage = ({ params }: EditBlogPageProps) => {
//   const router = useRouter();
//   const { toast } = useToast();

//   const blogId = params.id; // الحصول على ID المقال من الـ params
//   // لا يوجد هنا isEditMode لأن هذه الصفحة هي دائماً للتعديل

//   const [blogData, setBlogData] = useState<BlogData>({
//     title: "",
//     content: "",
//     author: "",
//     category: "",
//     metadata: "",
//     mainImage: "",
//   });

//   interface Errors {
//     title?: string;
//     author?: string;
//     category?: string;
//     mainImage?: string;
//     content?: string;
//   }

//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(true); // تعيينها إلى true لجلب البيانات
//   const [isSaving, setIsSaving] = useState(false); // لحالة زر الحفظ

//   // جلب بيانات المقال عند تحميل الصفحة
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       if (blogId) { // تأكد أن الـ ID موجود
//         try {
//           const docRef = doc(db, "blogs", blogId);
//           const docSnap = await getDoc(docRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             setBlogData({
//               title: data.title || "",
//               content: data.content || "",
//               author: data.author || "",
//               category: data.category || "",
//               metadata: data.metadata || "",
//               mainImage: data.mainImage || "",
//             });
//             setLoading(false);
//           } else {
//             console.error("No such document!");
//             toast({
//               title: "خطأ",
//               description: "المقالة المطلوبة غير موجودة.",
//               variant: "default",
//             });
//             router.push("/dashboard/d-blogs"); // التوجيه إلى صفحة لوحة التحكم إذا لم يتم العثور على المقال
//           }
//         } catch (error) {
//           console.error("Error fetching document:", error);
//           toast({
//             title: "خطأ في التحميل",
//             description: "فشل في تحميل بيانات المقالة.",
//             variant: "default",
//           });
//           setLoading(false);
//         }
//       } else {
//         // هذا السيناريو يجب ألا يحدث في صفحة [id] ولكن للتأكد
//         setLoading(false);
//         toast({
//           title: "خطأ",
//           description: "معرّف المقالة مفقود.",
//           variant: "default",
//         });
//         router.push("/dashboard/d-blogs");
//       }
//     };

//     fetchBlogData();
//   }, [blogId, router, toast]); // إضافة router و toast كـ dependencies

//   const validate = () => {
//     const newErrors: Errors = {};
//     if (!blogData.title.trim()) newErrors.title = "الرجاء إدخال العنوان";
//     if (!blogData.author.trim()) newErrors.author = "الرجاء إدخال اسم المؤلف";
//     if (!blogData.category.trim()) newErrors.category = "الرجاء اختيار التصنيف";
//     if (!blogData.mainImage.trim()) newErrors.mainImage = "الرجاء إدخال رابط الصورة";
//     if (!blogData.content.trim()) newErrors.content = "الرجاء إدخال المحتوى";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validate()) return;

//     setIsSaving(true);
//     try {
//       const docRef = doc(db, "blogs", blogId); // تحديث المقال الموجود باستخدام ID
//       await updateDoc(docRef, {
//         ...blogData,
//         // لا يتم تحديث createdAt هنا عادةً
//       });
//       toast({
//         title: "تم التحديث بنجاح",
//         description: "تم تعديل المقالة بنجاح 🎉",
//         variant: "default",
//       });
//       router.push("/dashboard/d-blogs"); // التوجيه إلى صفحة لوحة التحكم بعد الحفظ
//     } catch (error) {
//       console.error("خطأ في الحفظ:", error);
//       toast({
//         title: "خطأ",
//         description: "حدث خطأ أثناء حفظ التعديلات. يرجى المحاولة مرة أخرى.",
//         variant: "default",
//       });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   // عرض رسالة تحميل عند جلب بيانات المقال
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-xl text-gray-500">جاري تحميل بيانات المقالة...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6" dir="rtl">
//       <h1 className="text-3xl font-bold mb-6 text-center">
//         ✍️ تعديل المقالة
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block mb-1 font-medium">
//             عنوان المقالة
//           </label>
//           <Input
//             id="title"
//             name="title"
//             placeholder="عنوان المقالة"
//             value={blogData.title}
//             onChange={(e) => setBlogData({ ...blogData, title: e.target.value })}
//           />
//           {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
//         </div>

//         <div>
//           <label htmlFor="author" className="block mb-1 font-medium">
//             اسم المؤلف
//           </label>
//           <Input
//             id="author"
//             name="author"
//             placeholder="اسم المؤلف"
//             value={blogData.author}
//             onChange={(e) => setBlogData({ ...blogData, author: e.target.value })}
//           />
//           {errors.author && <p className="text-red-500 text-sm">{errors.author}</p>}
//         </div>

//         <div>
//           <label htmlFor="category" className="block mb-1 font-medium">
//             التصنيف (category)
//           </label>
//           <select
//             id="category"
//             name="category"
//             className="w-full border border-gray-300 rounded-md p-2 dark:bg-blacksection dark:text-white"
//             value={blogData.category}
//             onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
//           >
//             <option value="">اختر التصنيف</option>
//             <option value="Blog">Blog</option>
//             <option value="Events">Events</option>
//             <option value="Grids">Grids</option>
//             <option value="News">News</option>
//             <option value="Rounded">Rounded</option>
//           </select>
//           {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
//         </div>

//         <div>
//           <label htmlFor="mainImage" className="block mb-1 font-medium">
//             رابط الصورة الرئيسية
//           </label>
//           <Input
//             id="mainImage"
//             name="mainImage"
//             placeholder="رابط الصورة الرئيسية"
//             value={blogData.mainImage}
//             onChange={(e) => setBlogData({ ...blogData, mainImage: e.target.value })}
//           />
//           {errors.mainImage && <p className="text-red-500 text-sm">{errors.mainImage}</p>}
//         </div>

//         <div>
//           <label htmlFor="metadata" className="block mb-1 font-medium">
//             وصف مختصر (metadata)
//           </label>
//           <Textarea
//             id="metadata"
//             name="metadata"
//             placeholder="وصف مختصر"
//             value={blogData.metadata}
//             onChange={(e) => setBlogData({ ...blogData, metadata: e.target.value })}
//           />
//         </div>

//         <div>
//           <label htmlFor="content" className="block mb-1 font-medium">
//             المحتوى الكامل للمقالة
//           </label>
//           <Textarea
//             id="content"
//             name="content"
//             placeholder="المحتوى الكامل"
//             rows={8}
//             value={blogData.content}
//             onChange={(e) => setBlogData({ ...blogData, content: e.target.value })}
//           />
//           {errors.content && <p className="text-red-500 text-sm">{errors.content}</p>}
//         </div>

//       <Button type="submit" disabled={isSaving} className="w-full">
//   {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
// </Button>
//       </form>
//     </div>
//   );
// }; 

// export default EditBlogPage;
// app/(site)/dashboard/blog/edit/[id]/page.tsx
// components/EditBlogForm.tsx

// app/(site)/dashboard/blog/edit/[id]/page.tsx

// app/(site)/blog/edit/[id]/page.tsx

"use client"; // <--- يبقى Client Component كما هو

import React, { useState, useEffect } from "react"; // <--- تأكد من استيراد React هنا
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "@/firebase";
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

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface BlogData {
  title: string;
  content: string;
  author: string;
  category: string;
  metadata: string;
  mainImage: string;
}

interface EditBlogPageProps {
  params: { id: string };
}

const EditBlogPage = ({ params }: EditBlogPageProps) => {
  // <--- التعديل الحاسم هنا: استخدام React.use() لفك الوعد (Promise) الخاص بـ params --->
  const resolvedParams = React.use(params); // هنا يتم "انتظار" (await) الـ params
  const blogId = resolvedParams.id;        // الآن يمكنك الوصول إلى id مباشرةً
  // <------------------------------------------------------------------------------------>

  const router = useRouter();
  const { toast } = useToast();

  const [blogData, setBlogData] = useState<BlogData>({
    title: "", content: "", author: "", category: "", metadata: "", mainImage: "",
  });

  interface Errors {
    title?: string; author?: string; category?: string; mainImage?: string; content?: string;
  }

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);


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
      TiptapImageExtension.configure({
        inline: false, allowBase64: true,
        HTMLAttributes: { class: "rounded-md my-4 border-2 mx-auto max-w-full h-auto" },
      }),
      TiptapLinkExtension.configure({
        openOnClick: false, autolink: true,
        HTMLAttributes: { class: "text-blue-500 underline hover:text-blue-700 hover:cursor-pointer" },
      }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setBlogData(prev => ({ ...prev, content: editor.getHTML() }));
    },
    editorProps: {
      attributes: {
        class: 'min-h-[250px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 prose max-w-none dark:prose-invert dark:border-strokedark',
      },
    },
  });

  // جلب بيانات المقال عند تحميل الصفحة
  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogId) {
        toast({ title: "خطأ", description: "معرّف المقالة مفقود. سيتم توجيهك.", variant: "default", });
        router.push("/dashboard/d-blogs");
        return;
      }
      try {
        const docRef = doc(db, "blogs", blogId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBlogData({
            title: data.title || "", content: data.content || "", author: data.author || "",
            category: data.category || "", metadata: data.metadata || "", mainImage: data.mainImage || "",
          });
          setLoading(false);
          setTimeout(() => {
            if (editor && data.content) {
              editor.commands.setContent(data.content);
            }
          }, 100);
        } else {
          console.error("No such document!");
          toast({ title: "خطأ", description: "المقالة المطلوبة غير موجودة. سيتم توجيهك.", variant: "default", });
          router.push("/dashboard/d-blogs");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        toast({ title: "خطأ في التحميل", description: "فشل في تحميل بيانات المقالة.", variant: "default", });
        setLoading(false);
      }
    };

    fetchBlogData();
  }, [blogId, router, toast, editor]); // أبقِ 'editor' هنا لأنك تستخدمه في تعيين المحتوى بعد الجلب


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

    setIsSaving(true);
    try {
      const contentToSave = editor ? editor.getHTML() : blogData.content;
      if (!contentToSave || editor?.isEmpty) {
          setErrors(prev => ({ ...prev, content: "الرجاء إدخال المحتوى الكامل للمقالة" }));
          setIsSaving(false);
          return;
      }

      const dataToSave = { ...blogData, content: contentToSave };

      const docRef = doc(db, "blogs", blogId);
      await updateDoc(docRef, dataToSave);
      toast({ title: "تم التحديث بنجاح", description: "تم تعديل المقالة بنجاح 🎉", variant: "default", });
      // router.push("/dashboard/d-blogs"); // أبقِ هذا معلقاً لتبقى في نفس الصفحة كما طلبت

    } catch (error) {
      console.error("خطأ في الحفظ:", error);
      toast({ title: "خطأ", description: "حدث خطأ أثناء حفظ التعديلات. يرجى المحاولة مرة أخرى.", variant: "default", });
    } finally {
      setIsSaving(false);
    }
  };


  const addImageUrl = () => {
    const url = window.prompt("أدخل رابط الصورة (URL)");
    if (url) { editor.chain().focus().setImage({ src: url }).run(); }
  };

  const addImageFromFile = async () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      toast({ title: "جاري الرفع", description: "جاري رفع الصورة إلى التخزين...", variant: "default", duration: 999999 });

      const storageRef = ref(storage, `blogImages/${file.name}`);
      try {
        const snapshot = await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(snapshot.ref);

        editor.chain().focus().setImage({ src: imageUrl }).run();
        toast({ title: "نجاح", description: "تم رفع الصورة بنجاح!", variant: "default" });
      } catch (error) {
        console.error("Image upload failed:", error);
        toast({ title: "خطأ", description: "فشل تحميل الصورة.", variant: "default" });
      }
    };
    input.click();
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    if (url === null) return;
    if (url === '') { editor.chain().focus().extendMarkRange('link').unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };


  if (!editor || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500">جاري تحميل بيانات المقالة...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        ✍️ تعديل المقالة
      </h1>

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

        <Button type="submit" disabled={isSaving} className="w-full">
          {isSaving ? "جاري الحفظ..." : "حفظ التعديلات"}
        </Button>
      </form>
    </div>
  );
};

export default EditBlogPage;