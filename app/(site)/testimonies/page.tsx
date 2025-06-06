import React from "react";
import { testimonialData } from "@/components/Testimonial/testimonialData";
import SingleTestimonial from "@/components/Testimonial/SingleTestimonial";
import SectionHeader from "@/components/Common/SectionHeader";

const TestimoniesPage = () => {
  return (
    <div className="px-2 pb-8 pt-24 md:px-8">
      <div dir="rtl" className="animate_top mx-auto pb-6 text-center">
        <SectionHeader
          headerInfo={{
            title: `التوصيات`,
            subtitle: `آراء العملاء`,
            description: `نحن نفخر بما يقوله عملاؤنا عن خدماتنا. استمع إلى قصصهم وتجاربهم الرائعة معنا.`,
          }}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {testimonialData.map((review) => (
          <SingleTestimonial review={review} key={review?.id} />
        ))}
      </div>
    </div>
  );
};

export default TestimoniesPage;
