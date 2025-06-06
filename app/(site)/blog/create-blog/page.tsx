"use client";
import React from "react";
import Tiptap from "@/components/Tiptap";
import { useState } from "react";

const CreateBlogPage = () => {
  interface BlogData {
    title: string;
    createdBy: string;
    date: string;
    content: string;
  }

  const [blogData, setBlogData] = useState<BlogData>({
    title: "",
    createdBy: "",
    date: new Date().toISOString().split("T")[0],
    content: "",
  });

  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [createdByErrorMessage, setCreatedByErrorMessage] = useState("");

  return (
    <div className="px-2 pb-8 pt-24 md:px-8">
      <h1 className="pb-4 pt-2 text-center text-2xl">إنشاء مقالة جديدة</h1>
      {/* divider */}
      <div className="mx-auto max-w-[70%] border-t border-gray-300 pb-2"></div>
      {/* title and author fields */}
      <div className="grid place-items-center gap-2 px-2 pb-4" dir="rtl">
        <div className="mb-2 w-full max-w-2xl">
          <label className="text-gray-700">العنوان:</label>
          <input
            type="text"
            value={blogData.title}
            onChange={(e) =>
              setBlogData({ ...blogData, title: e.target.value })
            }
            className="mt-1 w-full rounded border p-2"
            placeholder="أدخل عنوان المقالة"
          />
          {titleErrorMessage ? (
            <p className="pt-0.5 text-red-500">{titleErrorMessage}</p>
          ) : (
            ""
          )}
        </div>
        <div className="mb-2 w-full max-w-2xl">
          <label className="text-gray-700">المؤلف:</label>
          <input
            type="text"
            value={blogData.createdBy}
            onChange={(e) =>
              setBlogData({ ...blogData, createdBy: e.target.value })
            }
            className="mt-1 w-full rounded border p-2"
            placeholder="أدخل اسم المؤلف"
          />
          {createdByErrorMessage ? (
            <p className="pt-0.5 text-red-500">{createdByErrorMessage}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div dir="rtl">
        <Tiptap
          blogData={blogData}
          setBlogData={setBlogData}
          setCreatedByErrorMessage={setCreatedByErrorMessage}
          setTitleErrorMessage={setTitleErrorMessage}
        />
      </div>
    </div>
  );
};

export default CreateBlogPage;
