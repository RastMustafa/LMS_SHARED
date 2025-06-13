// // app/(site)/dashboard/customer-reviews/page.tsx
// "use client";

// import React, { useState, useEffect } from 'react';
// import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
// import { db } from '@/firebase';
// import { useToast } from '@/hooks/use-toast';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // إذا كنت تستخدم Shadcn Card

// // تعريف نوع لـ Review
// interface CustomerReview {
//   id: string;
//   customerId: string;
//   customerName: string;
//   reviewContent: string;
//   status: 'pending' | 'published' | 'hidden'; // الحالة: معلق، منشور، مخفي
//   createdAt: Timestamp; // تاريخ الإنشاء
// }

// const CustomerReviewsDashboard = () => {
//   const [reviews, setReviews] = useState<CustomerReview[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const { toast } = useToast();

//   const fetchReviews = async () => {
//     try {
//       const reviewsCollection = collection(db, "customerReviews");
//       const q = query(reviewsCollection, orderBy("createdAt", "desc"));
//       const querySnapshot = await getDocs(q);

//       const fetchedReviews: CustomerReview[] = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         customerId: doc.data().customerId || 'N/A',
//         customerName: doc.data().customerName || 'اسم غير معروف',
//         reviewContent: doc.data().reviewContent || 'محتوى فارغ',
//         status: doc.data().status || 'pending',
//         createdAt: doc.data().createdAt, // تبقى Timestamp
//       }));
//       setReviews(fetchedReviews);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//       setError("حدث خطأ أثناء جلب آراء العملاء.");
//       toast({ title: "خطأ", description: "فشل في تحميل آراء العملاء.", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const updateReviewStatus = async (id: string, newStatus: 'pending' | 'published' | 'hidden') => {
//     try {
//       const reviewRef = doc(db, "customerReviews", id);
//       await updateDoc(reviewRef, { status: newStatus });
//       setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
//       toast({ title: "تم التحديث", description: `تم تحديث حالة الرأي إلى: ${newStatus}`, variant: "default" });
//     } catch (error) {
//       console.error("Error updating review status:", error);
//       toast({ title: "خطأ", description: "فشل تحديث حالة الرأي.", variant: "destructive" });
//     }
//   };

//   const deleteReview = async (id: string) => {
//     if (!window.confirm("هل أنت متأكد من حذف هذا الرأي نهائياً؟")) {
//       return;
//     }
//     try {
//       const reviewRef = doc(db, "customerReviews", id);
//       await deleteDoc(reviewRef);
//       setReviews(prev => prev.filter(r => r.id !== id));
//       toast({ title: "تم الحذف", description: "تم حذف الرأي بنجاح.", variant: "default" });
//     } catch (error) {
//       console.error("Error deleting review:", error);
//       toast({ title: "خطأ", description: "فشل حذف الرأي.", variant: "destructive" });
//     }
//   };

//   if (loading) return <div className="text-center py-10">جاري تحميل آراء العملاء...</div>;
//   if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

//   return (
//     <div className="p-6 max-w-7xl mx-auto" dir="rtl">
//       <h1 className="text-3xl font-bold mb-6 text-center">إدارة آراء العملاء</h1>

//       {reviews.length === 0 ? (
//         <p className="text-center text-gray-500">لا توجد آراء عملاء لعرضها حالياً.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {reviews.map(review => (
//             <Card key={review.id} className="shadow-md">
//               <CardHeader>
//                 <CardTitle className="text-lg">{review.customerName}</CardTitle>
//                 <CardDescription className="text-sm">العميل ID: {review.customerId}</CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <p className="mb-4 text-gray-700">"{review.reviewContent}"</p>
//                 <p className="text-xs text-gray-500 mb-2">أرسل بتاريخ: {review.createdAt.toDate().toLocaleString()}</p>
//                 <div className="flex flex-wrap gap-2">
//                   {review.status === 'pending' && (
//                     <Button onClick={() => updateReviewStatus(review.id, 'published')} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">نشر</Button>
//                   )}
//                   {review.status === 'published' && (
//                     <Button onClick={() => updateReviewStatus(review.id, 'hidden')} variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">إخفاء</Button>
//                   )}
//                   {review.status === 'hidden' && (
//                     <Button onClick={() => updateReviewStatus(review.id, 'published')} variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">إعادة النشر</Button>
//                   )}
//                   <Button onClick={() => deleteReview(review.id)} variant="destructive">حذف</Button>
//                 </div>
//                 <p className={`mt-2 text-sm font-semibold ${review.status === 'published' ? 'text-green-600' : review.status === 'hidden' ? 'text-yellow-600' : 'text-gray-600'}`}>
//                     الحالة: {review.status === 'pending' ? 'معلق' : review.status === 'published' ? 'منشور' : 'مخفي'}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerReviewsDashboard;
// app/(site)/dashboard/customer-reviews/page.tsx

"use client";

import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase'; // تأكد من أن مسار تهيئة Firebase صحيح
import { useToast } from '@/hooks/use-toast'; // تأكد من مسار useToast
import { Button } from '@/components/ui/button'; // تأكد من استيراد Button
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // تأكد من استيراد مكونات Card من Shadcn UI


// تعريف نوع لـ Review
interface CustomerReview {
  id: string;
  customerId: string; // معرف العميل (من الـ contacts collection)
  customerName: string; // اسم العميل
  reviewContent: string; // محتوى الرأي
  status: 'pending' | 'published' | 'hidden'; // حالة الرأي
  createdAt: Timestamp; // تاريخ ووقت إرسال الرأي
}

const CustomerReviewsDashboard = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // دالة لجلب آراء العملاء من Firestore
  const fetchReviews = async () => {
    try {
      const reviewsCollection = collection(db, "customerReviews");
      // جلب الآراء مرتبة حسب تاريخ الإنشاء تنازلياً
      const q = query(reviewsCollection, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const fetchedReviews: CustomerReview[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        customerId: doc.data().customerId || 'N/A',
        customerName: doc.data().customerName || 'اسم غير معروف',
        reviewContent: doc.data().reviewContent || 'محتوى فارغ',
        status: doc.data().status || 'pending', // حالة افتراضية
        createdAt: doc.data().createdAt, // يبقى Timestamp
      }));
      setReviews(fetchedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      setError("حدث خطأ أثناء جلب آراء العملاء.");
      toast({ title: "خطأ", description: "فشل في تحميل آراء العملاء.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // جلب الآراء عند تحميل الكومبوننت
  useEffect(() => {
    fetchReviews();
  }, [toast]); // أضف toast كـ dependency لتشغيل الجلب مرة واحدة

  // دالة لتحديث حالة الرأي (معلق، منشور، مخفي)
  const updateReviewStatus = async (id: string, newStatus: 'pending' | 'published' | 'hidden') => {
    try {
      const reviewRef = doc(db, "customerReviews", id);
      await updateDoc(reviewRef, { status: newStatus });
      // تحديث الحالة في الواجهة مباشرة
      setReviews(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
      toast({ title: "تم التحديث", description: `تم تحديث حالة الرأي إلى: ${newStatus}`, variant: "default" });
    } catch (error) {
      console.error("Error updating review status:", error);
      toast({ title: "خطأ", description: "فشل تحديث حالة الرأي.", variant: "destructive" });
    }
  };

  // دالة لحذف الرأي نهائياً
  const deleteReview = async (id: string) => {
    // تأكيد الحذف
    if (!window.confirm("هل أنت متأكد من حذف هذا الرأي نهائياً؟ لا يمكن التراجع عن هذا الإجراء.")) {
      return;
    }
    try {
      const reviewRef = doc(db, "customerReviews", id);
      await deleteDoc(reviewRef);
      // إزالة الرأي من الواجهة مباشرة
      setReviews(prev => prev.filter(r => r.id !== id));
      toast({ title: "تم الحذف", description: "تم حذف الرأي بنجاح.", variant: "default" });
    } catch (error) {
      console.error("Error deleting review:", error);
      toast({ title: "خطأ", description: "فشل حذف الرأي.", variant: "destructive" });
    }
  };

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-600">جاري تحميل آراء العملاء...</p>
      </div>
    );
  }

  // عرض حالة الخطأ
  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">إدارة آراء العملاء</h1>

      {reviews.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">لا توجد آراء عملاء لعرضها حالياً.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map(review => (
            <Card key={review.id} className="shadow-md dark:bg-blacksection dark:border-strokedark">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900 dark:text-white">{review.customerName}</CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-400">العميل ID: {review.customerId}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700 dark:text-gray-200">"{review.reviewContent}"</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">أرسل بتاريخ: {review.createdAt.toDate().toLocaleString()}</p>
                <div className="flex flex-wrap gap-2">
                  {/* أزرار تغيير الحالة */}
                  {review.status === 'pending' && (
                    <Button onClick={() => updateReviewStatus(review.id, 'published')} variant="outline" className="bg-green-500 hover:bg-green-600 text-white">نشر</Button>
                  )}
                  {review.status === 'published' && (
                    <Button onClick={() => updateReviewStatus(review.id, 'hidden')} variant="outline" className="bg-yellow-500 hover:bg-yellow-600 text-white">إخفاء</Button>
                  )}
                  {review.status === 'hidden' && (
                    <Button onClick={() => updateReviewStatus(review.id, 'published')} variant="outline" className="bg-blue-500 hover:bg-blue-600 text-white">إعادة النشر</Button>
                  )}
                  {/* زر الحذف */}
                  <Button onClick={() => deleteReview(review.id)} variant="destructive">حذف</Button>
                </div>
                <p className={`mt-2 text-sm font-semibold ${review.status === 'published' ? 'text-green-600' : review.status === 'hidden' ? 'text-yellow-600' : 'text-gray-600'}`}>
                    الحالة: {review.status === 'pending' ? 'معلق' : review.status === 'published' ? 'منشور' : 'مخفي'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviewsDashboard;