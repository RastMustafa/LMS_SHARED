// import { Testimonial } from "@/types/testimonial";
// import Image from "next/image";

// const SingleTestimonial = ({ review }: { review: Testimonial }) => {
//   const { name, designation, image, content } = review;
//   return (
//     <div
//       dir="rtl"
//       className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 border-socialicon border dark:border-strokedark dark:bg-blacksection dark:shadow-none  h-[300px] flex flex-col justify-between"
//     >
//       <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
//         <div>
//           <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
//             {name}
//           </h3>
//           <p>{designation}</p>
//         </div>
//         <Image width={60} height={50} className="" src={image} alt={name} />
//       </div>

//       <p>{content}</p>
//     </div>
//   );
// };

// export default SingleTestimonial;
import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ review }: { review: Testimonial }) => {
  const { name, designation, image, content } = review;
  return (
    <div
      dir="rtl"
      className="rounded-lg bg-white p-9 pt-7.5 shadow-solid-9 border-socialicon border dark:border-strokedark dark:bg-blacksection dark:shadow-none
                 h-[300px] flex flex-col justify-between" // <--- تم إضافة هذه الكلاسات هنا
    >
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
        </div>
        {/* الكود الخاص بالصورة (الذي تم تعديله مسبقاً لجعلها دائرية وبحجم ثابت) */}
        <div className="relative h-16 w-16 overflow-hidden rounded-full border border-gray-200">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* قم بتغليف المحتوى لجعله يأخذ مساحة محددة ويدعم التجاوز إذا لزم الأمر */}
      <p className="flex-grow overflow-y-auto text-sm">{content}</p> {/* <--- تعديل هنا أيضاً */}
    </div>
  );
};

export default SingleTestimonial;
