import { SelectCourse } from "@/db/schema/course";

export const getCourseNameById = (
  studentCourseId: number,
  courses: SelectCourse[]
) => {
  // create a map with { courseId : courseName}
  const courseNameById = new Map<number, string>();

  for (const course of courses) {
    courseNameById.set(course.id, course.name);
  }

  return (
    courseNameById.get(studentCourseId) ||
    "El estudiante no pertenece a ningun curso"
  );
};
