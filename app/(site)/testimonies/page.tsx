// app/testimonies/page.tsx

import React from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import SingleTestimonial from "@/components/Testimonial/SingleTestimonial";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase";

export default async function TestimoniesPage() {
  const q = query(
    collection(db, "customerReviews"),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const reviews = snap.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as any,
  );

  if (reviews.length === 0) {
    return (
      <div className="px-2 py-24 text-center">
        <SectionHeader
          headerInfo={{
            title: "التوصيات",
            subtitle: "آراء العملاء",
            description: "لا يوجد تقييمات منشورة حتى الآن.",
          }}
        />
      </div>
    );
  }

  return (
    <div className="px-2 pb-8 pt-24 md:px-8">
      <div dir="rtl" className="animate_top mx-auto pb-6 text-center">
        <SectionHeader
          headerInfo={{
            title: "التوصيات",
            subtitle: "آراء العملاء",
            description:
              "نحن نفخر بما يقوله عملاؤنا عن خدماتنا. استمع إلى قصصهم وتجاربهم الرائعة معنا.",
          }}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {reviews.map((review) => (
          <SingleTestimonial
            key={review.id}
            review={{
              name: review.customerName,
              designation: "",
              image: "/placeholder-avatar.png",
              content: review.reviewContent,
            }}
          />
        ))}
      </div>
    </div>
  );
}
