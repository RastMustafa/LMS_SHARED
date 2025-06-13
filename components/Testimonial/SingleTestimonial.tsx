import { Testimonial } from "@/types/testimonial";
import Image from "next/image";

const SingleTestimonial = ({ review }: { review: Testimonial }) => {
  const { name, designation, image, content } = review;
  return (
    <div
      dir="rtl"
      className="flex h-[300px] flex-col justify-between rounded-lg border border-socialicon bg-white p-9 pt-7.5  shadow-solid-9 dark:border-strokedark dark:bg-blacksection dark:shadow-none"
    >
      <div className="mb-7.5 flex justify-between border-b border-stroke pb-6 dark:border-strokedark">
        <div>
          <h3 className="mb-1.5 text-metatitle3 text-black dark:text-white">
            {name}
          </h3>
          <p>{designation}</p>
        </div>
        <Image width={60} height={50} className="" src={image} alt={name} />
      </div>

      <p>{content}</p>
    </div>
  );
};

export default SingleTestimonial;

// components/Testimonial/SingleTestimonial.tsx
// components/Testimonial/SingleTestimonial.tsx
