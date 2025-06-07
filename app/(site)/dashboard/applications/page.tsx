"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "@/components/ui/table";

const data = [
  {
    firstName: "Tanner",
    lastName: "Linsley",
    age: 24,
    visits: 100,
    status: "In Relationship",
    progress: 50,
  },
  {
    firstName: "Tandy",
    lastName: "Miller",
    age: 40,
    visits: 40,
    status: "Single",
    progress: 80,
  },
  {
    firstName: "Joe",
    lastName: "Dirte",
    age: 45,
    visits: 20,
    status: "Complicated",
    progress: 10,
  },
];

export default function TablePage() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-6 text-center text-2xl font-bold">
        📊 عرض بيانات الجدول
      </h1>

      <div className="overflow-auto rounded-lg border border-gray-200 shadow-sm">
        <Table className="min-w-full text-left text-sm">
          <TableHeader>
            <TableRow className="bg-gray-100 uppercase tracking-wider text-gray-700">
              <TableHead className="px-4 py-3">First Name</TableHead>
              <TableHead className="px-4 py-3">Last Name</TableHead>
              <TableHead className="px-4 py-3">Age</TableHead>
              <TableHead className="px-4 py-3">Visits</TableHead>
              <TableHead className="px-4 py-3">Status</TableHead>
              <TableHead className="px-4 py-3">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <TableCell className="px-4 py-3 font-medium">
                  {item.firstName}
                </TableCell>
                <TableCell className="px-4 py-3">{item.lastName}</TableCell>
                <TableCell className="px-4 py-3">{item.age}</TableCell>
                <TableCell className="px-4 py-3">{item.visits}</TableCell>
                <TableCell className="px-4 py-3">{item.status}</TableCell>
                <TableCell className="px-4 py-3">
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2.5 rounded-full bg-blue-500"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {item.progress}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow className="bg-gray-100">
              <TableCell
                colSpan={6}
                className="px-4 py-3 text-center font-semibold"
              >
                إجمالي الصفوف: {data.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
}
