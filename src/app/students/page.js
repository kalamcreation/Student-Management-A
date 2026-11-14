"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    setLoading(true);
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (res.ok) {
      setStudents(students.filter((s) => s._id !== id));
    } else {
      alert("Failed to delete");
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Students</h1>
        <Link
          href="/students/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Student
        </Link>
      </div>

      {students.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No students found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Phone</th>
                <th className="p-4 font-semibold">Department</th>
                <th className="p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{student.name}</td>
                  <td className="p-4">{student.email}</td>
                  <td className="p-4">{student.phone}</td>
                  <td className="p-4">{student.department}</td>
                  <td className="p-4 space-x-2">
                    <Link
                      href={`/students/edit/${student._id}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}