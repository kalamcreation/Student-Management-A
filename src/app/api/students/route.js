// app/api/students/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";

export async function GET() {
  try {
    await connectDB();
    const students = await Student.find({}).sort({ createdAt: -1 });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const student = await Student.create(body);
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: error.message || "Failed to create student" },
      { status: 400 }
    );
  }
}