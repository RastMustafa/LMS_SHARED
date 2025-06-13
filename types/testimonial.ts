// export type Testimonial = {
//   id: number;
//   name: string;
//   destination?: string;
//   image: any;
//   content: string;
//   designation: string;
// };
// types/testimonial.ts
// types/testimonial.ts
import { Timestamp } from "firebase/firestore";

export interface Testimonial {
  id: string;
  customerId: string;
  customerName: string;
  reviewContent: string;
  status: 'pending' | 'published' | 'hidden';
  createdAt: Timestamp | string; // يمكن أن يكون Timestamp أو string
  designation?: string; // (اختياري)
  image?: string; // (اختياري)
}