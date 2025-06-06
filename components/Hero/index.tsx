"use client";
import Image from "next/image";
import { useState } from "react";

const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="animate_right hidden md:w-2/3 lg:block">
              <div className="relative 2xl:-mr-7.5">
                <div className=" relative aspect-[700/444] w-full">
                  <Image
                    className="rounded-xl shadow-solid-l dark:hidden"
                    src="/images/banner/banner.jpg"
                    alt="Hero"
                    fill
                  />
                  <Image
                    className="hidden rounded-xl shadow-solid-l dark:block "
                    src="/images/banner/banner.jpg"
                    alt="Hero"
                    fill
                  />
                </div>
              </div>
            </div>
            <div className=" relative flex flex-col items-end justify-center text-right md:w-1/2">
              <h1 className="mb-5  text-3xl font-normal text-black dark:text-white xl:text-hero ">
                نُمكّن الجيل القادم من الطلاب والمهنيين لتحقيق طموحاتهم العالمية
              </h1>
              <p className="text-md max-w-[400px] text-right md:text-xl">
                استشارات تعليمية متكاملة لمساعدتك على الدراسة في الخارج، وإيجاد
                فرص العمل المناسبة لتحقيق طموحاتك الأكاديمية والمهنية
              </p>
              <Image
                src="/images/shape/shape-01.png"
                alt="shape"
                width={46}
                height={246}
                className="absolute -top-22 left-0 rotate-45"
              />
              <Image
                src="/images/shape/shape-02.svg"
                alt="shape"
                width={36.9}
                height={36.7}
                className="absolute bottom-28 left-28 z-10 rotate-45"
              />
              <Image
                src="/images/shape/shape-03.svg"
                alt="shape"
                width={21.64}
                height={21.66}
                className="absolute bottom-0 left-6.5 z-1"
              />
              <div className="mt-10">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap gap-5">
                    <button
                      aria-label="get started button"
                      className=" flex rounded-xl bg-black px-12  py-2.5 text-center text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                    >
                      أبدا معنا
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
