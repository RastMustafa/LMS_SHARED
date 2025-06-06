"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { Bold } from "lucide-react";
import { Italic } from "lucide-react";
import { List } from "lucide-react";
import { ListOrdered } from "lucide-react";
import { Image as LucideImage } from "lucide-react";
import { AlignLeft } from "lucide-react";
import { AlignRight } from "lucide-react";
import { AlignCenter } from "lucide-react";
import { AlignJustify } from "lucide-react";
import { Link as LucideLink } from "lucide-react";
import { db, storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

const Tiptap = ({
  blogData,
  setBlogData,
  setTitleErrorMessage,
  setCreatedByErrorMessage,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          HTMLAttributes: {
            class: "[all:revert]",
          },
        },
      }),
      BulletList.configure({
        HTMLAttributes: { class: "list-disc pl-6" },
      }),
      OrderedList.configure({
        HTMLAttributes: { class: "list-decimal pl-6" },
      }),
      ListItem.configure({
        HTMLAttributes: { class: "mb-1" },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md my-2 border-2 mx-auto",
        },
      }),
      Link.configure({
        HTMLAttributes: {
          class:
            "text-blue-500 underline hover:text-blue-700 hover:cursor-pointer",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "rounded-md bg-white border border-slate-400 px-4 py-2 mt-4 focus:outline-none focus:border-primary min-h-[170px]",
      },
    },
    content: "<p>أدخل محتوى المقالة هنا</p>",
  });

  if (!editor) {
    return null; // Prevent errors while the editor initializes
  }

  // Function to insert an image with link
  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // const addImage = async () => {
  //   const input = document.createElement("input");
  //   input.type = "file";
  //   input.accept = "image/*"; // Allow only images

  //   input.onchange = async (event) => {
  //     const file = (event.target as HTMLInputElement).files?.[0];
  //     if (!file) return;

  //     const storageRef = ref(storage, `blogImages/${file.name}`);

  //     try {
  //       // Upload file to Firebase Storage
  //       const snapshot = await uploadBytes(storageRef, file);

  //       // Get the download URL
  //       const imageUrl = await getDownloadURL(snapshot.ref);

  //       // Insert image into Tiptap editor
  //       editor.chain().focus().setImage({ src: imageUrl }).run();
  //     } catch (error) {
  //       console.error("Image upload failed:", error);
  //       toast.error("فشل تحميل الصورة");
  //     }
  //   };

  //   input.click(); // Open file picker
  // };

  const addLink = () => {
    let url = prompt("Enter the URL");

    if (url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const handleSubmit = async () => {
    const updatedBlog = {
      ...blogData,
      content: editor.getHTML(),
      timestamp: serverTimestamp(),
    };

    if (!blogData.title) {
      setTitleErrorMessage("يرجى ملء هذا الحقل");
    } else {
      if (!blogData.createdBy) {
        setCreatedByErrorMessage("يرجى ملء هذا الحقل");
        setTitleErrorMessage("");
      } else {
        setCreatedByErrorMessage("");
        try {
          await addDoc(collection(db, "blogs"), updatedBlog);
          toast.success("تم إرسال المقالة بنجاح!");

          setBlogData({
            title: "",
            createdBy: "",
            date: new Date().toISOString().split("T")[0],
            content: "",
          });
          editor.commands.clearContent();
        } catch (error) {
          console.error("Error submitting blog:", error);
          toast.error("فشل في إرسال المقال.");
        }
      }
    }
  };

  return (
    <div className="mx-auto max-w-[1100px] rounded-lg border border-strokedark bg-gray-50 p-4 shadow-md">
      <h2 className="pb-2 text-center text-2xl">محتوى المقالة</h2>
      {/* Toolbar */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-6" dir="ltr">
        <div className="flex flex-wrap gap-2">
          <button
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
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`rounded px-3 py-1 ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <Italic />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`rounded px-3 py-1 ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            H1
          </button>

          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`rounded px-3 py-1 ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            H2
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`rounded px-3 py-1 ${
              editor.isActive("heading", { level: 3 })
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            H3
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
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
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded px-3 py-1 ${
              editor.isActive("orderedList")
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <ListOrdered />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={addImage}
            className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          >
            <LucideImage />
          </button>
          <button
            onClick={addLink}
            className="rounded bg-gray-200 p-2 hover:bg-gray-300"
          >
            <LucideLink />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
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
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
      <div dir="ltr">
        <button
          onClick={handleSubmit}
          className="mt-3 rounded  bg-waterloo px-4 py-2 text-white hover:bg-btndark"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default Tiptap;
