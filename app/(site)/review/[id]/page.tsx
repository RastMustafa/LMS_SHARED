import { verifyToken } from "@/actions/token";
import SubmitReviewCard from "@/components/SubmitReviewCard";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { redirect } from "next/navigation";
import React from "react";

async function page({ params }) {
  const awaitedParams = await params;
  const token = awaitedParams.id;

  if (!token) {
    redirect("/");
  }

  const verifiedToken: any = await verifyToken(token);

  if (!verifiedToken) {
    return redirect("/");
  }
  const user = await getContactById(verifiedToken.userId);

  if (!user) {
    return redirect("/");
  }

  // if there is existing review with same userid  redirect to home page

  const q = query(
    collection(db, "customerReviews"),
    where("customerId", "==", user?.id),
  );
  const snapshot = await getDocs(q);
  if (!snapshot.empty) {
    return redirect("/"); // redirect to homepage if a review exists
  }

  delete user?.createdAt;

  return (
    <div>
      <SubmitReviewCard user={user} />
    </div>
  );
}

export default page;

export async function getContactById(id: string) {
  try {
    const ref = doc(db, "contacts", id);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      return null; // or throw new Error("Contact not found")
    }

    return { id: snapshot.id, ...snapshot.data() };
  } catch (error) {
    console.error("Failed to fetch contact:", error);
    throw error;
  }
}
