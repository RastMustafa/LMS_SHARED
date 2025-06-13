// app/api/generate-review-link/route.ts
// هذا المسار لـ API Route في Next.js 13+ (App Router)
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get('customerId');
  const customerName = searchParams.get('customerName') || 'عميلنا العزيز'; // اسم افتراضي

  if (!customerId) {
    return NextResponse.json({ message: 'Customer ID is required' }, { status: 400 });
  }

  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables.');
    return NextResponse.json({ message: 'Server configuration error' }, { status: 500 });
  }

  try {
    // إنشاء الـ JWT
    const token = jwt.sign(
      { customerId, customerName, purpose: 'review' },
      JWT_SECRET,
      { expiresIn: '7d' } // صلاحية الـ token (مثلاً 7 أيام)
    );

    // بناء رابط صفحة إرسال الرأي
    const reviewPageUrl = `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_BASE\_URL\}/review/</span>{token}`;

    return NextResponse.json({ success: true, reviewLink: reviewPageUrl });
  } catch (error) {
    console.error('Error generating review link:', error);
    return NextResponse.json({ message: 'Failed to generate review link' }, { status: 500 });
  }
}