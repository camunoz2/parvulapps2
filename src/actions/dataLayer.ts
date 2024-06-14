"use server";
import { courses } from "@/db/schema/courses";
import { schools } from "@/db/schema/schools";
import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm/sql";
import { revalidatePath } from "next/cache";

export const getSchools = async () => await db.select().from(schools);

export const getCourses = async () => await db.select().from(courses);

export const getStudents = async () => await db.select().from(students);

export const addStudent = async (fd: FormData) => {
  const studentData = {
    firstName: fd.get("firstname") as string,
    lastName: fd.get("lastname") as string,
    courseId: Number(fd.get("course")),
    age: Number(fd.get("age")),
  };
  await db.insert(students).values(studentData);
  revalidatePath("/dashboard/alumnos");
  return { message: "Student created!" };
};

export const addCourse = async (fd: FormData) => {
  await db.insert(courses).values({ course: fd.get("coursename") as string });
  revalidatePath("/dashboard/cursos");
  return { message: "Added a course" };
};

export const deleteCourse = async (courseId: number) => {
  await db.delete(courses).where(eq(courses.id, courseId));
  revalidatePath("/dashboard/cursos");
  return { message: "Removed a course" };
};

export const deleteStudent = async (fd: FormData) => {
  const studentId = Number(fd.get("id"));
  await db.delete(students).where(eq(students.id, studentId));
  revalidatePath("/dashboard/alumnos");
  return { message: "Removed a student" };
};

export const editCourse = async ({
  courseId,
  courseName,
}: { courseId: number; courseName: string }) => {
  await db
    .update(courses)
    .set({ course: courseName })
    .where(eq(courses.id, courseId));
  revalidatePath("/dashboard/cursos");
};

export const updateStudent = async (fd: FormData) => {
  const studentId = fd.get("studentid");
  const studentData = {
    firstName: fd.get("firstname") as string,
    lastName: fd.get("lastname") as string,
    courseId: Number(fd.get("course")),
    age: Number(fd.get("age")),
  };
  if (!studentId) return { message: "No student id" };
  await db
    .update(students)
    .set(studentData)
    .where(eq(students.id, Number(studentId)));
  revalidatePath("/dashboard/alumnos");
};
