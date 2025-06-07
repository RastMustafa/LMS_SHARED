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
} from "firebase/firestore";

type ClientEntry = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  visaProgram: string;
  specialization: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function TablePage() {
  const [data, setData] = useState<ClientEntry[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ClientEntry>>({});

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "contacts"));
      const newData: ClientEntry[] = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          fullName: d.fullname,
          email: d.email,
          phone: d.phoneNumber,
          visaProgram: d.visaProgram,
          specialization: d.specialization,
          subject: d.subject,
          message: d.message,
          createdAt: d.createdAt?.toDate().toLocaleString() ?? "",
        };
      });
      setData(newData);
    };

    fetchData();
  }, []);

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
    const entryRef = doc(db, "content", editingId);
    await updateDoc(entryRef, {
      fullname: editForm.fullName,
      email: editForm.email,
      phoneNumber: editForm.phone,
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

    cancelEditing();
  };

  // New delete function
  const deleteEntry = async (id: string) => {
    const entryRef = doc(db, "content", id);
    await deleteDoc(entryRef);
    setData((prev) => prev.filter((item) => item.id !== id));
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
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteEntry(item.id)}
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

