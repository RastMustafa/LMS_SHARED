// "use client";
// import SectionHeader from "../Common/SectionHeader";

// import { Autoplay, Pagination } from "swiper";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Swiper, SwiperSlide } from "swiper/react";

// import { motion } from "framer-motion";
// import SingleTestimonial from "./SingleTestimonial";
// import { testimonialData } from "./testimonialData";
// import Link from "next/link";

// const Testimonial = () => {
//   return (
//     <>
//       <section>
//         <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
//           {/* <!-- Section Title Start --> */}
//           <div dir="rtl" className="animate_top mx-auto text-center">
//             <SectionHeader
//               headerInfo={{
//                 title: `التوصيات`,
//                 subtitle: `آراء العملاء`,
//                 description: `نحن نفخر بما يقوله عملاؤنا عن خدماتنا. استمع إلى قصصهم وتجاربهم الرائعة معنا.`,
//               }}
//             />
//           </div>
//           {/* <!-- Section Title End --> */}
//         </div>

//         <motion.div
//           variants={{
//             hidden: {
//               opacity: 0,
//               y: -20,
//             },

//             visible: {
//               opacity: 1,
//               y: 0,
//             },
//           }}
//           initial="hidden"
//           whileInView="visible"
//           transition={{ duration: 1, delay: 0.1 }}
//           viewport={{ once: true }}
//           className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-20 xl:px-0"
//         >
//           {/* <!-- Slider main container --> */}
//           <div className="swiper testimonial-01 mb-4 pb-22.5">
//             {/* <!-- Additional required wrapper --> */}
//             <Swiper
//               spaceBetween={50}
//               slidesPerView={2}
//               autoplay={{
//                 delay: 2500,
//                 disableOnInteraction: false,
//               }}
// // <--- أضف هذا السطر لجعل الحركة دائرية ومستمرة --->
//               loop={true}
//               // <--------------------------------------------------->

//               pagination={{
//                 clickable: true,
//               }}
//               modules={[Autoplay, Pagination]}
//               breakpoints={{
//                 // when window width is >= 640px
//                 0: {
//                   slidesPerView: 1,
//                 },
//                 // when window width is >= 768px
//                 768: {
//                   slidesPerView: 2,
//                 },
//               }}
//             >
//               {testimonialData.map((review) => (
//                 <SwiperSlide key={review?.id}>
//                   <SingleTestimonial review={review} />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//             <div className="grid justify-center pb-4">
//               <Link href={"/testimonies"} className="hover:text-primary">
//                 المزيد من الآراء
//               </Link>
//             </div>
//           </div>
//         </motion.div>
//       </section>
//     </>
//   );
// };

// export default Testimonial;
// components/Testimonial/Testimonial.tsx
// components/Testimonial/Testimonial.tsx
"use client"; // يبقى Client Component بسبب Swiper

import React, { useState, useEffect } from 'react';
import SectionHeader from "../Common/SectionHeader";
import { Autoplay, Pagination } from "swiper";
import "swiper/css"; import "swiper/css/navigation"; import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import SingleTestimonial from "./SingleTestimonial";
import Link from "next/link";
import { collection, getDocs, orderBy, query, where, Timestamp } from "firebase/firestore"; // استيراد orderBy
import { db } from "@/firebase";
import { Testimonial as TestimonialType } from "@/types/testimonial";

const Testimonial = () => {
  const [reviews, setReviews] = useState<TestimonialType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPublishedReviews = async () => {
      try {
        const reviewsCollection = collection(db, "customerReviews");
        // <--- الاستعلام عن الآراء المنشورة مع ترتيب من Firestore (يتطلب فهرس) --->
        const q = query(
          reviewsCollection,
          where("status", "==", "published"), // فلترة الآراء المنشورة
          orderBy("createdAt", "desc") // ترتيب حسب تاريخ الإنشاء
        );
        const querySnapshot = await getDocs(q);

        let fetchedReviews: TestimonialType[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toString() : data.createdAt;
          return {
            id: doc.id, name: data.customerName || "عميلنا العزيز", designation: data.designation || "عميل",
            image: data.image || "/images/user/default-user.png", content: data.reviewContent || "لا يوجد رأي",
            createdAt: createdAt,
          } as TestimonialType;
        });
        // لا حاجة لترتيب إضافي في جانب العميل هنا
        setReviews(fetchedReviews);
      } catch (err) {
        console.error("Error fetching published reviews:", err);
        setError("حدث خطأ أثناء تحميل آراء العملاء. يتطلب هذا الاستعلام فهرس في Firestore.");
      } finally { setLoading(false); }
    };
    fetchPublishedReviews();
  }, []);

  if (loading) { return ( <section className="py-20 flex items-center justify-center"> <p className="text-xl text-gray-600">جاري تحميل آراء العملاء...</p> </section> ); }
  if (error) { return ( <section className="py-20 flex items-center justify-center text-red-500"> <p className="text-xl">{error}</p> </section> ); }
  return (
    <>
      <section>
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0">
          <div dir="rtl" className="animate_top mx-auto text-center">
            <SectionHeader headerInfo={{ title: `التوصيات`, subtitle: `آراء العملاء`, description: `نحن نفخر بما يقوله عملاؤنا عن خدماتنا. استمع إلى قصصهم وتجاربهم الرائعة معنا.`, }} />
          </div>
        </div>
        <motion.div variants={{ hidden: { opacity: 0, y: -20 }, visible: { opacity: 1, y: 0 } }} initial="hidden" whileInView="visible" transition={{ duration: 1, delay: 0.1 }} viewport={{ once: true }} className="animate_top mx-auto mt-15 max-w-c-1235 px-4 md:px-8 xl:mt-20 xl:px-0">
          {reviews.length === 0 ? ( <div className="text-center py-20 text-gray-500"> <p className="text-xl">لا توجد آراء عملاء منشورة حالياً.</p> </div> ) : (
            <div className="swiper testimonial-01 mb-4 pb-22.5">
              <Swiper spaceBetween={50} slidesPerView={2} autoplay={{ delay: 2500, disableOnInteraction: false }} loop={true} pagination={{ clickable: true }} modules={[Autoplay, Pagination]} breakpoints={{ 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, }} >
                {reviews.map((review) => ( <SwiperSlide key={review.id}> <SingleTestimonial review={review} /> </SwiperSlide> ))}
              </Swiper>
              <div className="grid justify-center pb-4">
                <Link href={"/testimonies"} className="hover:text-primary"> المزيد من الآراء </Link>
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
};
export default Testimonial;
