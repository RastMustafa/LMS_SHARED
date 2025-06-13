// app/api/submit-review/route.ts
import { NextResponse } from 'next/server';
// لا حاجة لـ jwt بعد الآن
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp, getDoc, doc } from 'firebase/firestore'; // إضافة getDoc و doc لجلب اسم العميل

export async function POST(request: Request) {
  const { customerId, reviewContent } = await request.json(); // استلام customerId ومحتوى الرأي

  if (!customerId || !reviewContent) {
    return NextResponse.json({ message: 'Customer ID and review content are required' }, { status: 400 });
  }

  try {
    // (اختياري) جلب اسم العميل من مجموعة 'contacts'
    let customerName = 'عميلنا العزيز';
    try {
      const customerDocRef = doc(db, 'contacts', customerId); // افترض أن العملاء مسجلون في 'contacts'
      const customerDocSnap = await getDoc(customerDocRef);
      if (customerDocSnap.exists()) {
        customerName = customerDocSnap.data().fullname || customerName; // الحصول على الاسم الكامل
      }
    } catch (fetchError) {
      console.warn(`Could not fetch customer name for ID ${customerId}:`, fetchError);
    }


    // حفظ الرأي في Firestore
    const reviewRef = await addDoc(collection(db, "customerReviews"), {
      customerId: customerId,
      customerName: customerName, // استخدام الاسم الذي تم جلبه أو الافتراضي
      reviewContent: reviewContent,
      status: 'pending', // حالة أولية: معلق
      createdAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, message: 'تم إرسال رأيك بنجاح! شكراً لك.', reviewId: reviewRef.id });
  } catch (error) {
    console.error('Failed to submit review:', error);
    return NextResponse.json({ message: 'فشل إرسال الرأي. يرجى المحاولة مرة أخرى.' }, { status: 500 });
  }
}