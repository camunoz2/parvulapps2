import { SelectCourse } from "@/db/schema/course";
import { SelectPeriod } from "@/db/schema/grade";

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

export const getPeriodNameById = (
  periodId: number,
  periods: SelectPeriod[]
) => {
  const periodNameById = new Map<number, string>();

  for (const period of periods) {
    periodNameById.set(period.id, period.name);
  }

  return (
    periodNameById.get(periodId) ||
    "No existe un periodo con el ID proporcionado"
  );
};
