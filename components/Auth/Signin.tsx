"use client";

import { useAuth } from "@/app/context/AuthContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Signin = () => {
  const form = useForm();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const { signIn } = useAuth();
  const router = useRouter();

  const onSubmit = (data: { email: string; password: string }) => {
    signIn(data)
      .then(() => {
        toast.success("تم تسجيل الدخول بنجاح!");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log("🚀 ~ onSubmit ~ err:", err);
        toast.error("حدث خطأ أثناء تسجيل الدخول");
      });
  };

  return (
    <>
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div
          dir="rtl"
          className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20"
        >
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="نقطة مزخرفة"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="نقطة مزخرفة"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              تسجيل الدخول إلى حسابك
            </h2>
            <div className="flex flex-col"></div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-12.5 lg:flex-row lg:justify-between lg:gap-14">
                <div className="w-full">
                  <input
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                    type="text"
                    placeholder="البريد الإلكتروني"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "مطلوب إدخال البريد الإلكتروني",
                      },
                    })}
                  />
                  <p className="error text-sm text-red-500">
                    {errors?.email?.message as string}
                  </p>
                </div>

                <div className="w-full">
                  <input
                    type="password"
                    placeholder="كلمة المرور"
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "مطلوب إدخال كلمة المرور",
                      },
                    })}
                  />
                  <p className="error text-sm text-red-500">
                    {errors?.password?.message as string}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
                <div className="flex flex-wrap gap-4 md:gap-10">
                  <div className="my-auto mb-4 flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="group mt-1 flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="opacity-0 peer-checked:group-[]:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      ></svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-3"
                    >
                      تذكرني
                    </label>
                  </div>

                  <a href="#" className="hover:text-primary">
                    هل نسيت كلمة المرور؟
                  </a>
                </div>

                <button
                  type="submit"
                  aria-label="تسجيل الدخول باستخدام البريد الإلكتروني وكلمة المرور"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  تسجيل الدخول
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                <p>
                  ليس لديك حساب؟{" "}
                  <Link
                    className="text-black hover:text-primary dark:text-white hover:dark:text-primary"
                    href="/auth/signup"
                  >
                    قم بإنشاء حساب
                  </Link>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Signin;
