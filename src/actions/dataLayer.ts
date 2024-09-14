"use server";
import { courses } from "@/db/schema/course";
import { cores } from "@/db/schema/curriculum";
import { periods } from "@/db/schema/grade";
import { schools } from "@/db/schema/school";
import { students } from "@/db/schema/student";
import { users } from "@/db/schema/users";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getSchools = async () => await db.select().from(schools);

export const getCourses = async () => await db.select().from(courses);

export const getStudents = async () => await db.select().from(students);

export const getAuthorizedUsers = async () => await db.select().from(users);

export const getPeriods = async () => await db.select().from(periods);

export const getCores = async () => await db.select().from(cores);

export const addStudent = async (fd: FormData) => {
  const studentData = {
    firstName: fd.get("firstname") as string,
    lastName: fd.get("lastname") as string,
    courseId: Number(fd.get("course")),
    age: Number(fd.get("age")),
  };
  await db.insert(students).values(studentData);
  revalidatePath("/dashboard/students");
  return { message: "Student created!" };
};

export const addCourse = async (courseName: string) => {
  await db.insert(courses).values({ name: courseName });
  revalidatePath("/dashboard/courses");
  return { message: "Added a course" };
};

export const deleteCourse = async (courseId: number) => {
  await db.delete(courses).where(eq(courses.id, courseId));
  revalidatePath("/dashboard/courses");
  return { message: "ok" };
};

export const deleteStudent = async (studentId: number) => {
  await db.delete(students).where(eq(students.id, studentId));
  revalidatePath("/dashboard/students");
  return { message: "ok" };
};

export const updateCourse = async ({
  courseId,
  courseName,
}: {
  courseId: number;
  courseName: string;
}) => {
  await db
    .update(courses)
    .set({ name: courseName })
    .where(eq(courses.id, courseId));
  revalidatePath("/dashboard/courses");
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
  revalidatePath("/dashboard/students");
};
