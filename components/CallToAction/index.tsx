"use client";
import React from "react";
import Image from "next/image";
export default function CallToAction() {
  const card = {
    image: "@/banner.jpg",
    title: "نُمكّن الجيل القادم من الطلاب والمهنيين لتحقيق طموحاتهم العالمية",
    description:
      "استشارات تعليمية متكاملة لمساعدتك على الدراسة في الخارج، وإيجاد فرص العمل المناسبة لتحقيق طموحاتك الأكاديمية والمهنية",
  };

  return (
    <section className="mb-16 w-full text-white">
      <div className="container relative mx-auto my-10 h-[50vh] overflow-hidden  rounded-3xl md:h-[50vh] lg:min-h-[550px]">
        <div className="relative h-full w-full min-w-full">
          {/* <Image
            src={"/assets/images/banner.jpg"}
            alt={card.title}
            sizes="100vw"
            style={{
              width: "100%",
              height: "100%",
              aspectRatio: "auto",
              objectFit: "cover",
              objectPosition: " 50% 50%",
            }}
            width={500}
            height={500}
          /> */}

          <Image
            src={"/images/banner/banner.jpg"}
            alt="logo"
            sizes="100vw"
            width={1200}
            height={200}
            className="w-full object-cover object-center dark:hidden	"
          />
          <div className=" absolute inset-0 flex flex-col items-end justify-center gap-2 bg-gradient-to-t from-black/60 to-transparent p-4 px-12 text-white">
            <h3
              dir="ltr"
              className="max-w-[500px] text-right text-2xl font-semibold md:text-4xl"
            >
              {card.title}
            </h3>
            <p className="text-md max-w-[400px] text-right md:text-xl">
              {card.description}
            </p>
            <button className=" mt-4 rounded-xl bg-blue-700 px-12 py-2 text-lg hover:bg-blue-800">
              أبدا معنا
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
