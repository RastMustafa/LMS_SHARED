"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

function SubmitReviewCard({ user }: any) {
  const [content, setContent] = useState<any>("");
  const submitting = false;
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "customerReviews"), {
        customerId: user.id,
        customerName: user.fullname,
        reviewContent: content,
        createdAt: serverTimestamp(),
        status: "published",
        published: false,
      });
      toast({
        title: "نجاح",
        description: "تم رفع الصورة بنجاح!",
        variant: "default",
      });
    } catch (error) {
      console.error("Error submitting review:", error);
      return { success: false, error: "فشل في إرسال التقييم" };
    }
  };

  return (
    <div>
      <section className="flex min-h-screen items-center justify-center bg-gray-100 py-20 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-blacksection">
          <h1 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
            مرحباً {user?.customerName}، شاركنا رأيك!
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSubmit();
            }}
            className="space-y-4"
          >
            <div>
              <label
                htmlFor="review"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                الرجاء كتابة رأيك عن خدمتنا:
              </label>
              <Textarea
                id="review"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="اكتب رأيك هنا..."
                className="w-full rounded-md border border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                required
              ></Textarea>
            </div>
            <Button
              type="submit"
              //   disabled={submitting}
              className="w-full rounded-md bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "جاري الإرسال..." : "إرسال الرأي"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default SubmitReviewCard;
