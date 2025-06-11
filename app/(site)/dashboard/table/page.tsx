// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   TableFooter,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
// import { db } from "@/firebase";

// type ClientEntry = {
//   id: string;
//   fullName: string;
//   email: string;
//   phone: string;
//   visaProgram: string;
//   specialization: string;
//   subject: string;
//   message: string;
//   createdAt: string;
// };

// export default function TablePage() {
//   const [data, setData] = useState<ClientEntry[]>([]);
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [editForm, setEditForm] = useState<Partial<ClientEntry>>({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const snapshot = await getDocs(collection(db, "contacts"));
//       const newData: ClientEntry[] = snapshot.docs.map((doc) => {
//         const d = doc.data();
//         return {
//           id: doc.id,
//           fullName: d.fullname,
//           email: d.email,
//           phone: d.phoneNumber,
//           visaProgram: d.visaProgram,
//           specialization: d.specialization,
//           subject: d.subject,
//           message: d.message,
//           createdAt: d.createdAt?.toDate().toLocaleString() ?? "",
//         };
//       });
//       setData(newData);
//     };

//     fetchData();
//   }, []);

//   const startEditing = (row: ClientEntry) => {
//     setEditingId(row.id);
//     setEditForm(row);
//   };

//   const cancelEditing = () => {
//     setEditingId(null);
//     setEditForm({});
//   };

//   const saveEdit = async () => {
//     if (!editingId) return;
//     const entryRef = doc(db, "contacts", editingId);
//     await updateDoc(entryRef, {
//       fullname: editForm.fullName,
//       email: editForm.email,
//       phoneNumber: editForm.phone,
//       visaProgram: editForm.visaProgram,
//       specialization: editForm.specialization,
//       subject: editForm.subject,
//       message: editForm.message,
//     });

//     setData((prev) =>
//       prev.map((item) =>
//         item.id === editingId
//           ? ({ ...item, ...editForm } as ClientEntry)
//           : item,
//       ),
//     );

//     cancelEditing();
//   };

//   const handleChange = (field: keyof ClientEntry, value: string) => {
//     setEditForm((prev) => ({ ...prev, [field]: value }));
//   };

//   return (
//     <div className="mx-auto max-w-7xl p-6">
//       <h1 className="mb-6 text-center text-2xl font-bold">
//         📝 Editable Client Table
//       </h1>

//       <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
//         <Table className="min-w-full text-sm">
//           <TableHeader>
//             <TableRow className="bg-gray-100 text-gray-700">
//               <TableHead>Full Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>Visa Program</TableHead>
//               <TableHead>Specialization</TableHead>
//               <TableHead>Subject</TableHead>
//               <TableHead>Message</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {data.map((item) => {
//               const isEditing = editingId === item.id;

//               return (
//                 <TableRow
//                   key={item.id}
//                   className="odd:bg-white even:bg-gray-50"
//                 >
//                   {isEditing ? (
//                     <>
//                       <TableCell>
//                         <Input
//                           value={editForm.fullName || ""}
//                           onChange={(e) =>
//                             handleChange("fullName", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.email || ""}
//                           onChange={(e) =>
//                             handleChange("email", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.phone || ""}
//                           onChange={(e) =>
//                             handleChange("phone", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.visaProgram || ""}
//                           onChange={(e) =>
//                             handleChange("visaProgram", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.specialization || ""}
//                           onChange={(e) =>
//                             handleChange("specialization", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.subject || ""}
//                           onChange={(e) =>
//                             handleChange("subject", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Input
//                           value={editForm.message || ""}
//                           onChange={(e) =>
//                             handleChange("message", e.target.value)
//                           }
//                         />
//                       </TableCell>
//                       <TableCell className="text-xs text-gray-500">
//                         {item.createdAt}
//                       </TableCell>
//                       <TableCell className="flex gap-2 py-2">
//                         <Button onClick={saveEdit} size="sm">
//                           Save
//                         </Button>
//                         <Button
//                           variant="outline"
//                           onClick={cancelEditing}
//                           size="sm"
//                         >
//                           Cancel
//                         </Button>
//                       </TableCell>
//                     </>
//                   ) : (
//                     <>
//                       <TableCell>{item.fullName}</TableCell>
//                       <TableCell>{item.email}</TableCell>
//                       <TableCell>{item.phone}</TableCell>
//                       <TableCell>{item.visaProgram}</TableCell>
//                       <TableCell>{item.specialization}</TableCell>
//                       <TableCell>{item.subject}</TableCell>
//                       <TableCell>{item.message}</TableCell>
//                       <TableCell className="text-xs text-gray-500">
//                         {item.createdAt}
//                       </TableCell>
//                       <TableCell className="py-2">
//                         <Button onClick={() => startEditing(item)} size="sm">
//                           Edit
//                         </Button>
//                       </TableCell>
//                     </>
//                   )}
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  Timestamp, // <--- استيراد Timestamp للتعامل مع التواريخ من Firestore
} from "firebase/firestore";
import { useToast } from "@/hooks/use-toast"; // <--- استيراد useToast

type ClientEntry = {
  id: string;
  fullName: string;
  email: string;
  phone: string; // تم تغييرها من phoneNumber إلى phone لتطابق النوع
  visaProgram: string;
  specialization: string;
  subject: string;
  message: string;
  createdAt: string; // سنحولها إلى string
};

export default function TablePage() {
  const [data, setData] = useState<ClientEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ClientEntry>>({});
  const { toast } = useToast(); // <--- استخدام useToast hook

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, "contacts"));
        const newData: ClientEntry[] = snapshot.docs.map((docSnapshot) => {
          const d = docSnapshot.data();
          // تحويل Firestore Timestamp إلى string
          const createdAt = d.createdAt instanceof Timestamp
            ? d.createdAt.toDate().toLocaleString() // يعطي تنسيق تاريخ ووقت محلي
            : d.createdAt?.toString() || ""; // إذا لم يكن Timestamp أو كان undefined

          return {
            id: docSnapshot.id,
            fullName: d.fullname || "",
            email: d.email || "",
            phone: d.phoneNumber || "", // في Firestore هي phoneNumber، لكن النوع هو phone
            visaProgram: d.visaProgram || "",
            specialization: d.specialization || "",
            subject: d.subject || "",
            message: d.message || "",
            createdAt: createdAt,
          };
        });
        setData(newData);
      } catch (error) {
        console.error("Error fetching client data:", error);
        toast({
          title: "Error fetching data",
          description: "Failed to load client data. Please try again.",
          variant: "default", // استخدام default بدلاً من destructive
        });
      }
    };

    fetchData();
  }, [toast]); // إضافة toast كـ dependency

  const startEditing = (row: ClientEntry) => {
    setEditingId(row.id);
    setEditForm(row);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    const entryRef = doc(db, "contacts", editingId);
    try {
      await updateDoc(entryRef, {
        fullname: editForm.fullName,
        email: editForm.email,
        phoneNumber: editForm.phone, // تحديث في Firestore باسم phoneNumber
        visaProgram: editForm.visaProgram,
        specialization: editForm.specialization,
        subject: editForm.subject,
        message: editForm.message,
      });

      setData((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...item, ...editForm } as ClientEntry : item
        )
      );
      toast({
        title: "Success",
        description: "Client data updated successfully.",
        variant: "default",
      });
      cancelEditing();
    } catch (error) {
      console.error("Error saving client data:", error);
      toast({
        title: "Error",
        description: "Failed to update client data. Please try again.",
        variant: "default", // استخدام default بدلاً من destructive
      });
    }
  };

  // دالة الحذف الجديدة مع رسائل Toast
  const deleteEntry = async (id: string, fullName: string) => { // أضفنا fullName للاستخدام في رسالة الـ toast
    toast({
      title: "Confirm Deletion",
      description: `Are you sure you want to delete client "${fullName}"? This action cannot be undone.`,
      variant: "default", // استخدام default بدلاً من destructive
      action: ( // زر التأكيد داخل الـ toast
        <Button
          variant="outline"
          onClick={async () => {
            try {
              const entryRef = doc(db, "contacts", id);
              await deleteDoc(entryRef);
              setData((prev) => prev.filter((item) => item.id !== id));
              toast({
                title: "Deletion Successful",
                description: `Client "${fullName}" has been deleted.`,
                variant: "default",
              });
            } catch (error) {
              console.error("Error deleting client entry:", error);
              toast({
                title: "Deletion Failed",
                description: `Failed to delete client "${fullName}". Please try again.`,
                variant: "default", // استخدام default بدلاً من destructive
              });
            }
          }}
          className="shrink-0"
        >
          Confirm Delete
        </Button>
      ),
    });
  };

  const handleChange = (field: keyof ClientEntry, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center">📝 Editable Client Table</h1>

      <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 text-gray-700">
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Visa Program</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => {
              const isEditing = editingId === item.id;

              return (
                <TableRow key={item.id} className="even:bg-gray-50 odd:bg-white">
                  {isEditing ? (
                    <>
                      <TableCell>
                        <Input
                          value={editForm.fullName || ""}
                          onChange={(e) => handleChange("fullName", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.email || ""}
                          onChange={(e) => handleChange("email", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.phone || ""}
                          onChange={(e) => handleChange("phone", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.visaProgram || ""}
                          onChange={(e) => handleChange("visaProgram", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.specialization || ""}
                          onChange={(e) => handleChange("specialization", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.subject || ""}
                          onChange={(e) => handleChange("subject", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editForm.message || ""}
                          onChange={(e) => handleChange("message", e.target.value)}
                        />
                      </TableCell>
                      <TableCell className="text-xs text-gray-500">
                        {item.createdAt}
                      </TableCell>
                      <TableCell className="flex gap-2 py-2">
                        <Button onClick={saveEdit} size="sm">
                          Save
                        </Button>
                        <Button variant="outline" onClick={cancelEditing} size="sm">
                          Cancel
                        </Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item.fullName}</TableCell>
                      <TableCell>{item.email}</TableCell>
                      <TableCell>{item.phone}</TableCell>
                      <TableCell>{item.visaProgram}</TableCell>
                      <TableCell>{item.specialization}</TableCell>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell>{item.message}</TableCell>
                      <TableCell className="text-xs text-gray-500">{item.createdAt}</TableCell>
                      <TableCell className="flex gap-2 py-2">
                        <Button onClick={() => startEditing(item)} size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="destructive" // <--- حافظنا على اللون الأحمر هنا كما هو في الكود الأصلي
                          size="sm"
                          onClick={() => deleteEntry(item.id, item.fullName)} // <--- تمرير fullName
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}