import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SelectCourse } from "@/db/schema/courses";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCourseNameById = (
  studentCourseId: number,
  courses: SelectCourse[],
) => {
  // create a map with { courseId : courseName}
  let courseNameById = new Map<number, string>();

  courses.forEach((course) => {
    courseNameById.set(course.id, course.course);
  });

  return (
    courseNameById.get(studentCourseId) ||
    "El estudiante no pertenece a ningun curso"
  );
};
