// "use client";
// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import { toast } from "react-hot-toast";

// // Firestore
// import { db } from "@/firebase";
// import { doc, setDoc, serverTimestamp } from "firebase/firestore";

// type FormValues = {
//   fullname: string;
//   email: string;
//   phoneNumber: string;
//   visaProgram: string;
//   specialization: string;
//   subject: string;
//   message: string;
// };

// const Contact = () => {
//   const [hasMounted, setHasMounted] = useState(false);
//   const [stepNumber, setStepNumber] = useState(1);
//   const [token, setToken] = useState("");

//   const form = useForm<FormValues>();
//   const { register, handleSubmit, formState, getValues, trigger } = form;
//   const { errors, isDirty, isValid, isSubmitting } = formState;

//   useEffect(() => {
//     setHasMounted(true);
//     // 1. Check localStorage for an existing token
//     let existingToken = localStorage.getItem("contactToken");
//     if (!existingToken) {
//       // If none, generate a new one
//       existingToken = crypto.randomUUID();
//       localStorage.setItem("contactToken", existingToken);
//     }
//     setToken(existingToken);
//   }, []);

//   if (!hasMounted) {
//     return null;
//   }

//   function isValidEmail(email: string) {
//     const emailRegex =
//       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return emailRegex.test(email);
//   }

//   const onSubmit = async (data: FormValues) => {
//     try {
//       await trigger(); // validate form
//       await setDoc(
//         doc(db, "contacts", token),
//         {
//           ...data,
//           createdAt: serverTimestamp(),
//         },
//         { merge: true },
//       );

//       toast.success("تم إرسال الرسالة بنجاح!");
//       form.reset();
//     } catch (error: any) {
//       toast.error("حدث خطأ أثناء إرسال النموذج: " + error.message);
//       console.error("Error saving form data:", error);
//     }
//   };

//   const handleNextStep = () => {
//     trigger();
//     switch (stepNumber) {
//       case 1:
//         if (getValues("fullname")) {
//           setStepNumber(stepNumber + 1);
//         }
//         break;
//       case 2:
//         if (
//           getValues("email") &&
//           getValues("phoneNumber") &&
//           isValidEmail(getValues("email"))
//         ) {
//           setStepNumber(stepNumber + 1);
//         }
//         break;
//       case 3:
//         if (getValues("visaProgram") && getValues("specialization")) {
//           setStepNumber(stepNumber + 1);
//         }
//         break;
//       default:
//         break;
//     }
//   };

//   const handlePreviousStep = () => {
//     if (stepNumber > 1) {
//       setStepNumber(stepNumber - 1);
//     }
//   };

//   return (
//     <>
//       <section id="support" className="my-20 px-4 md:px-8 2xl:px-0">
//         <div
//           dir="rtl"
//           className="relative mx-auto max-w-c-1390 px-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20"
//         >
//           <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
//           <div className="absolute bottom-[-255px] left-0 -z-1 h-full w-full">
//             <Image
//               src="./images/shape/shape-dotted-light.svg"
//               alt="شكل منقط"
//               className="dark:hidden"
//               fill
//             />
//             <Image
//               src="./images/shape/shape-dotted-dark.svg"
//               alt="شكل منقط"
//               className="hidden dark:block"
//               fill
//             />
//           </div>

//           <div className="flex flex-col-reverse flex-wrap gap-8 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: -20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 1, delay: 0.1 }}
//               viewport={{ once: true }}
//               className="animate_top w-full rounded-lg bg-white p-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black md:h-fit md:w-3/5 lg:w-3/4 xl:p-12"
//             >
//               <h2 className="pb-4 text-3xl text-black dark:text-white xl:text-sectiontitle2">
//                 تواصل معنا
//               </h2>

//               <form onSubmit={handleSubmit(onSubmit)} noValidate>
//                 {/* STEP 1 */}
//                 {stepNumber === 1 && (
//                   <div className="mb-6 flex flex-col md:min-h-[161px] md:justify-center lg:gap-14">
//                     <input
//                       type="text"
//                       placeholder="الاسم الكامل"
//                       id="fullname"
//                       {...register("fullname", {
//                         required: {
//                           value: true,
//                           message: "الاسم الكامل مطلوب",
//                         },
//                       })}
//                       className="entrance-animate h-fit w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                     />
//                     {errors.fullname?.message && (
//                       <p className="text-red-500">{errors.fullname.message}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* STEP 2 */}
//                 {stepNumber === 2 && (
//                   <div className="mb-6 flex flex-col gap-7.5 md:min-h-[161px] lg:justify-between lg:gap-14">
//                     <input
//                       placeholder="البريد الإلكتروني"
//                       id="email"
//                       {...register("email", {
//                         pattern: {
//                           value:
//                             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
//                           message: "صيغة البريد الإلكتروني غير صالحة",
//                         },
//                         required: {
//                           value: true,
//                           message: "البريد الإلكتروني مطلوب",
//                         },
//                       })}
//                       className="entrance-animate h-fit w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                     />
//                     {errors.email?.message && (
//                       <p className="text-red-500">{errors.email.message}</p>
//                     )}

//                     <input
//                       type="text"
//                       {...register("phoneNumber", {
//                         required: {
//                           value: true,
//                           message: "رقم الهاتف مطلوب",
//                         },
//                       })}
//                       id="phone-number"
//                       placeholder="رقم الهاتف"
//                       className="entrance-animate h-fit w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                     />
//                     {errors.phoneNumber?.message && (
//                       <p className="text-red-500">
//                         {errors.phoneNumber.message}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* STEP 3 */}
//                 {stepNumber === 3 && (
//                   <div className="mb-6 flex flex-col gap-7.5 md:min-h-[161px] lg:justify-between lg:gap-14">
//                     <div className="flex gap-2">
//                       <select
//                         id="visa-program"
//                         {...register("visaProgram", {
//                           required: {
//                             value: true,
//                             message: "مطلوب برنامج التأشيرات",
//                           },
//                         })}
//                         className="entrance-animate h-fit w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                       >
//                         <option value="">برنامج التأشيرة</option>
//                         <option value="Study">الدراسة</option>
//                         <option value="Language">اللغة</option>
//                         <option value="Nursing">التمريض</option>
//                         <option value="Doctors">الأطباء</option>
//                         <option value="Ausbildung">التعليم</option>
//                         <option value="Engineer">مهندس</option>
//                         <option value="Job Seeker">الباحث عن عمل</option>
//                       </select>
//                     </div>
//                     {errors.visaProgram?.message && (
//                       <p className="text-red-500">
//                         {errors.visaProgram.message}
//                       </p>
//                     )}

//                     <input
//                       type="text"
//                       id="specialization"
//                       placeholder="التخصص"
//                       {...register("specialization", {
//                         required: {
//                           value: true,
//                           message: "التخصص مطلوب",
//                         },
//                       })}
//                       className="entrance-animate h-fit w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                     />
//                     {errors.specialization?.message && (
//                       <p className="text-red-500">
//                         {errors.specialization.message}
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 {/* STEP 4 */}
//                 {stepNumber === 4 && (
//                   <div className="mb-6 grid gap-4">
//                     <div>
//                       <input
//                         type="text"
//                         placeholder="الموضوع"
//                         id="subject"
//                         {...register("subject", {
//                           required: {
//                             value: true,
//                             message: "الموضوع مطلوب",
//                           },
//                         })}
//                         className="entrance-animate w-full border-b border-stroke bg-transparent pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white lg:w-1/2"
//                       />
//                       {errors.subject?.message && (
//                         <p className="text-red-500">{errors.subject.message}</p>
//                       )}
//                     </div>
//                     <div className="flex">
//                       <textarea
//                         placeholder="الرسالة"
//                         id="message"
//                         {...register("message", {
//                           required: {
//                             value: true,
//                             message: "الرسالة مطلوبة",
//                           },
//                         })}
//                         rows={4}
//                         className="entrance-animate w-full border-b border-stroke bg-transparent focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:focus:border-manatee dark:focus:placeholder:text-white"
//                       ></textarea>
//                     </div>
//                     {errors.message?.message && (
//                       <p className="text-red-500">{errors.message.message}</p>
//                     )}
//                   </div>
//                 )}

//                 {/* Step Indicators & Navigation */}
//                 <div className="grid grid-flow-col gap-4 pt-6">
//                   <div className="self-center text-center">
//                     {Array.from({ length: 4 }).map((_, index) => (
//                       <span
//                         key={index}
//                         className={`mx-[2px] inline-block h-4 rounded-full ${
//                           index + 1 === stepNumber
//                             ? "w-6 bg-primary opacity-100"
//                             : "w-4 bg-gray-300 opacity-50"
//                         }`}
//                       ></span>
//                     ))}
//                   </div>

//                   <div className="grid grid-flow-col gap-4">
//                     {/* Previous Button */}
//                     {stepNumber > 1 ? (
//                       <button
//                         type="button"
//                         onClick={handlePreviousStep}
//                         disabled={stepNumber === 1}
//                         className={`max-w-36 rounded-lg px-4 py-2 font-medium ${
//                           stepNumber === 1
//                             ? "cursor-not-allowed bg-gray-300 text-gray-500"
//                             : "bg-waterloo text-white hover:bg-btndark"
//                         }`}
//                       >
//                         السابق
//                       </button>
//                     ) : (
//                       <div></div>
//                     )}

//                     {/* Next Button */}
//                     {stepNumber < 4 ? (
//                       <button
//                         type="button"
//                         onClick={() => {
//                           trigger();
//                           handleNextStep();
//                         }}
//                         disabled={stepNumber === 4}
//                         className={`max-w-36 rounded-lg px-4 py-2 font-medium ${
//                           stepNumber === 4
//                             ? "cursor-not-allowed bg-gray-300 text-gray-500"
//                             : "bg-waterloo text-white hover:bg-btndark"
//                         }`}
//                       >
//                         التالي
//                       </button>
//                     ) : (
//                       <div></div>
//                     )}
//                   </div>
//                 </div>

//                 {stepNumber === 4 && (
//                   <div className="entrance-animate flex flex-wrap items-center justify-between gap-4 pt-4">
//                     <div className="mb-4 flex md:mb-0">
//                       <input
//                         id="default-checkbox"
//                         type="checkbox"
//                         className="peer sr-only"
//                       />
//                       <span className="group mt-2 flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
//                         <svg
//                           className="opacity-0 peer-checked:group-[]:opacity-100"
//                           width="10"
//                           height="8"
//                           viewBox="0 0 10 8"
//                           fill="none"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             clipRule="evenodd"
//                             d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
//                             fill="white"
//                           />
//                         </svg>
//                       </span>
//                       <label
//                         htmlFor="default-checkbox"
//                         className="flex max-w-[425px] cursor-pointer select-none pr-5 pt-1"
//                       >
//                         بالنقر على المربع، فإنك توافق على شروط استخدام النموذج.
//                       </label>
//                     </div>

//                     {/* Final Submit Button */}
//                     <button
//                       type="submit"
//                       aria-label="send message"
//                       disabled={!isDirty || !isValid || isSubmitting}
//                       className="inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark"
//                     >
//                       أرسل الرسالة
//                       <svg
//                         className="fill-white"
//                         width="14"
//                         height="14"
//                         viewBox="0 0 14 14"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
//                           fill="white"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 )}
//               </form>
//             </motion.div>

//             {/* Right Side: Contact Info */}
//             <motion.div
//               variants={{
//                 hidden: { opacity: 0, y: -20 },
//                 visible: { opacity: 1, y: 0 },
//               }}
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 2, delay: 0.1 }}
//               viewport={{ once: true }}
//               className="animate_top w-full md:w-2/5 md:p-7.5 lg:w-[26%] xl:pt-15"
//             >
//               <h2 className="mb-12.5 text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
//                 تجدنا هنا
//               </h2>
//               <div className="5 mb-7">
//                 <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
//                   موقعنا
//                 </h3>
//                 <p>Berlin, Germany</p>
//               </div>
//               <div className="5 mb-7">
//                 <h3 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
//                   البريد الإلكتروني
//                 </h3>
//                 <p>
//                   <a href="#">contact@upskills.com</a>
//                 </p>
//               </div>
//               <div>
//                 <h4 className="mb-4 text-metatitle3 font-medium text-black dark:text-white">
//                   رقم الهاتف
//                 </h4>
//                 <p>
//                   <a dir="ltr" href="#">
//                     +009 42334 6343 843
//                   </a>
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Contact;
"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
// import Image from "../components/Image";
import { useToast } from "@/hooks/use-toast"; // This is the correct path // تم تعديل المسار هنا فقط لحل مشكلة الاستيراد

// Firebase Imports - تأكد من تثبيت Firebase SDK
// npm install firebase
// تأكد من أن ملفك @/firebase/index.ts (أو firebase.ts) موجود وصحيح
import { db } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type FormValues = {
  fullname: string;
  email: string;
  phoneNumber: string;
  visaProgram: string;
  specialization: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [stepNumber, setStepNumber] = useState(1);
  const [token, setToken] = useState("");
  const { toast } = useToast(); // استخدام useToast من Shadcn UI

  const form = useForm<FormValues>();
  const { register, handleSubmit, formState, getValues, trigger, reset } = form; // أضفت 'reset' لتفريغ النموذج بعد الإرسال
  const { errors, isDirty, isValid, isSubmitting } = formState;

  useEffect(() => {
    setHasMounted(true);
    if (typeof window !== 'undefined') {
      let existingToken = localStorage.getItem("contactToken");
      if (!existingToken) {
        existingToken = crypto.randomUUID();
        localStorage.setItem("contactToken", existingToken);
      }
      setToken(existingToken);
    }
  }, []);

  if (!hasMounted) {
    return null;
  }

  function isValidEmail(email: string) {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  const onSubmit = async (data: FormValues) => {
    try {
      await setDoc(
        doc(db, "contacts", token),
        {
          ...data,
          createdAt: serverTimestamp(),
        },
        { merge: true },
      );

      toast({
        title: "تم إرسال الرسالة بنجاح!",
        description: "سنتواصل معك قريباً.",
        variant: "default",
      });

      reset();
      setStepNumber(1);

    } catch (error: any) {
      toast({
        title: "حدث خطأ",
        description: "حدث خطأ أثناء إرسال النموذج: " + error.message,
        variant: "destructive",
      });
      console.error("Error saving form data to Firestore:", error);
    }
  };

  const handleNextStep = () => {
    trigger();
    switch (stepNumber) {
      case 1:
        if (getValues("fullname")) {
          setStepNumber(stepNumber + 1);
        }
        break;
      case 2:
        if (
          getValues("email") &&
          getValues("phoneNumber") &&
          isValidEmail(getValues("email"))
        ) {
          setStepNumber(stepNumber + 1);
        }
        break;
      case 3:
        if (getValues("visaProgram") && getValues("specialization")) {
          setStepNumber(stepNumber + 1);
        }
        break;
      default:
        break;
    }
  };

  const handlePreviousStep = () => {
    if (stepNumber > 1) {
      setStepNumber(stepNumber - 1);
    }
  };

  const stepTitles = [
    "المعلومات الشخصية",
    "بيانات التواصل",
    "تفاصيل البرنامج",
    "الرسالة والتأكيد",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <section id="support" className="py-20 px-4 md:px-8 2xl:px-0 mt-16"> {/* <--- إضافة mt-16 هنا للمسافة من الأعلى */}
        <div
          dir="rtl"
          className="relative mx-auto max-w-6xl"
        >
          {/* Background decorations - تم تعديل الألوان لتكون داكنة */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-slate-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-neutral-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>

          <div className="flex flex-col-reverse flex-wrap gap-12 md:flex-row md:flex-nowrap md:justify-between xl:gap-20">
            {/* Main Form - تم تعديل الألوان هنا */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 md:w-3/5 lg:w-3/4 xl:p-12"
            >
              {/* Header - لم يتم التعديل */}
              <div className="text-center mb-10">
                <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
                  تواصل معنا
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-lg">
                  {stepTitles[(stepNumber as number) - 1]}
                </p>
              </div>

              {/* Progress Bar - تم تعديل الألوان هنا */}
              <div className="mb-12">
                <div className="flex justify-between items-center mb-4">
                  {stepTitles.map((title, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        index + 1 <= stepNumber
                          ? "bg-slate-900 text-white shadow-lg" // <--- لون داكن للخلفية
                          : "bg-slate-200 text-slate-500"
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`text-xs mt-2 text-center transition-all duration-300 ${
                        index + 1 === stepNumber
                          ? "text-slate-900 font-medium" // <--- لون داكن للنص
                          : "text-slate-400"
                      }`}>
                        {title}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-slate-900 h-2 rounded-full transition-all duration-500 ease-out" // <--- لون داكن للشريط
                    style={{ width: `${(stepNumber / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* STEP 1 - تم تعديل ألوان الحدود في focus */}
                {stepNumber === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك الكامل"
                        id="fullname"
                        {...register("fullname", {
                          required: {
                            value: true,
                            message: "الاسم الكامل مطلوب",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                      {errors.fullname?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullname.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 - تم تعديل ألوان الحدود في focus */}
                {stepNumber === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        placeholder="example@email.com"
                        id="email"
                        {...register("email", {
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: "صيغة البريد الإلكتروني غير صالحة",
                          },
                          required: {
                            value: true,
                            message: "البريد الإلكتروني مطلوب",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                      {errors.email?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        رقم الهاتف *
                      </label>
                      <input
                        type="tel"
                        placeholder="+49 123 456 789"
                        id="phoneNumber"
                        {...register("phoneNumber", {
                          required: {
                            value: true,
                            message: "رقم الهاتف مطلوب",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                      {errors.phoneNumber?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 - تم تعديل ألوان الحدود في focus */}
                {stepNumber === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        برنامج التأشيرة *
                      </label>
                      <select
                        id="visaProgram"
                        {...register("visaProgram", {
                          required: {
                            value: true,
                            message: "مطلوب برنامج التأشيرات",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300"
                      >
                        <option value="">اختر برنامج التأشيرة</option>
                        <option value="Study">الدراسة</option>
                        <option value="Language">اللغة</option>
                        <option value="Nursing">التمريض</option>
                        <option value="Doctors">الأطباء</option>
                        <option value="Ausbildung">التعليم</option>
                        <option value="Engineer">مهندس</option>
                        <option value="Job Seeker">الباحث عن عمل</option>
                      </select>
                      {errors.visaProgram?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.visaProgram.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        التخصص *
                      </label>
                      <input
                        type="text"
                        id="specialization"
                        placeholder="أدخل تخصصك"
                        {...register("specialization", {
                          required: {
                            value: true,
                            message: "التخصص مطلوب",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                      {errors.specialization?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.specialization.message}</p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* STEP 4 - تم تعديل ألوان الحدود في focus ولون التشيك بوكس */}
                {stepNumber === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        الموضوع *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        placeholder="موضوع الرسالة"
                        {...register("subject", {
                          required: {
                            value: true,
                            message: "الموضوع مطلوب",
                          },
                        })}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400"
                      />
                      {errors.subject?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                        الرسالة *
                      </label>
                      <textarea
                        id="message"
                        placeholder="اكتب رسالتك هنا..."
                        {...register("message", {
                          required: {
                            value: true,
                            message: "الرسالة مطلوبة",
                          },
                        })}
                        rows={6}
                        className="w-full px-4 py-4 rounded-xl border-2 border-slate-200 bg-white/50 backdrop-blur-sm focus:border-slate-800 focus:outline-none transition-all duration-300 placeholder:text-slate-400 resize-none"
                      />
                      {errors.message?.message && (
                        <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div className="flex items-start space-x-3 rtl:space-x-reverse">
                      <input
                        id="terms-checkbox"
                        type="checkbox"
                        className="w-5 h-5 mt-1 text-slate-900 bg-white border-2 border-slate-300 rounded focus:ring-slate-800 focus:ring-2" // <--- لون داكن للتشيك بوكس
                      />
                      <label htmlFor="terms-checkbox" className="text-sm text-slate-600 dark:text-slate-300">
                        بالنقر على المربع، فإنك توافق على شروط استخدام النموذج وسياسة الخصوصية.
                      </label>
                    </div>
                    {/* لا توجد رسالة خطأ لهذا التشيك بوكس في الكود الأصلي، لذا لم تتم إضافتها */}
                  </motion.div>
                )}

                {/* Navigation Buttons - تم تعديل الألوان هنا */}
                <div className="flex justify-between items-center pt-8 mt-8 border-t border-slate-200">
                  {stepNumber > 1 ? (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 text-slate-600 hover:text-slate-800 transition-colors duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span>السابق</span>
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {stepNumber < 4 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-slate-900 to-gray-800 text-white rounded-xl hover:from-slate-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105" // <--- ألوان داكنة للزر التالي
                    >
                      <span>التالي</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isDirty || !isValid || isSubmitting}
                      className="flex items-center space-x-3 rtl:space-x-reverse px-8 py-4 bg-gradient-to-r from-slate-900 to-gray-800 text-white rounded-xl hover:from-slate-800 hover:to-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" // <--- ألوان داكنة لزر الإرسال
                    >
                      <span>أرسل الرسالة</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  )}
                </div>
              </form>
            </motion.div>

            {/* Contact Info Sidebar - تم تعديل تصميم رقم الهاتف وألوان الأيقونات */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 2, delay: 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-2/5 lg:w-1/4 space-y-8"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">
                  تجدنا هنا
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* <--- لون داكن للأيقونة */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">موقعنا</h4>
                      <p className="text-slate-600 dark:text-slate-300">Berlin, Germany</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* <--- لون داكن للأيقونة */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">البريد الإلكتروني</h4>
                      <p className="text-slate-600 dark:text-slate-300">
                        <a href="mailto:contact@upskills.com" className="hover:text-slate-700 transition-colors"> {/* <--- لون داكن للرابط */}
                          contact@upskills.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* <--- لون داكن للأيقونة */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-2">رقم الهاتف</h4>
                   <p className="text-slate-600 dark:text-slate-300 whitespace-nowrap overflow-auto">
  <a href="tel:+009423346343843" className="hover:text-slate-700 transition-colors" dir="ltr">
    +009 42334 6343 843
  </a>
</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;