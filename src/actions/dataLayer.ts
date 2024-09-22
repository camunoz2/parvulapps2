"use server";
import { courses } from "@/db/schema/course";
import { cores, indicators, objectives, scopes } from "@/db/schema/curriculum";
import { periods, grades } from "@/db/schema/grade";
import { schools } from "@/db/schema/school";
import { students } from "@/db/schema/student";
import { users } from "@/db/schema/users";
import { db } from "@/lib/drizzle";
import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const getSchools = async () => await db.select().from(schools);

export const getCourses = async () => await db.select().from(courses);

export const getStudents = async () => await db.select().from(students);

export const getAuthorizedUsers = async () => await db.select().from(users);

export const getPeriods = async () => await db.select().from(periods);

export const getCores = async () => await db.select().from(cores);

export const getIndicators = async () => await db.select().from(indicators);

export const getObjectives = async () => await db.select().from(objectives);

export const getScopes = async () => await db.select().from(scopes);

export type GradesEvaluation = Record<string, Record<string, number>>;

export const getGrades = async (
  periodId: number,
  courseId: number
): Promise<GradesEvaluation> => {
  try {
    const result = await db
      .select({
        grade: grades.grade,
        studentId: grades.studentId,
        indicatorId: grades.indicatorId,
      })
      .from(grades)
      .innerJoin(students, eq(grades.studentId, students.id))
      .where(
        and(eq(grades.periodId, periodId), eq(students.courseId, courseId))
      );

    console.log("Fetched grades:", result);

    // Transform the result into the structure expected by the evaluations state
    const evaluations: GradesEvaluation = {};
    result.forEach(({ grade, studentId, indicatorId }) => {
      if (!evaluations[indicatorId]) {
        evaluations[indicatorId] = {};
      }
      evaluations[indicatorId][studentId] = grade;
    });

    return evaluations;
  } catch (error) {
    console.error("Error fetching grades:", error);
    return {};
  }
};

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

export const updateGrade = async ({
  studentId,
  indicatorId,
  periodId,
  grade,
}: {
  studentId: number;
  indicatorId: number;
  periodId: number;
  grade: number;
}): Promise<{ success: boolean; message: string }> => {
  try {
    console.log(
      `Attempting to update grade for student ${studentId}, indicator ${indicatorId}, period ${periodId}`
    );

    const result = await db
      .update(grades)
      .set({ grade })
      .where(
        and(
          eq(grades.studentId, studentId),
          eq(grades.indicatorId, indicatorId),
          eq(grades.periodId, periodId)
        )
      )
      .returning(); // Return the updated rows

    if (result.length === 0) {
      console.log("No existing grade found. Inserting new grade.");
      await db.insert(grades).values({
        grade,
        studentId,
        indicatorId,
        periodId,
      });
      return { success: true, message: "New grade inserted successfully" };
    } else {
      console.log("Existing grade updated successfully");
      return { success: true, message: "Grade updated successfully" };
    }
  } catch (error) {
    console.error("Error in updateGrade:", error);
    return { success: false, message: "Failed to update or insert grade" };
  }
};

export interface GraphData {
  studentName: string;
  [periodName: string]: number | string;
}

// Function to get total grades by category (scope, core, or objective)
export const getGradesByCategory = async (
  courseId: number,
  categoryType: "scope" | "core" | "objective",
  categoryId?: number // Optional: to filter by specific scope, core, or objective
) => {
  const categoryColumn = {
    scope: scopes.id,
    core: cores.id,
    objective: objectives.id,
  }[categoryType];

  const categoryNameColumn = {
    scope: scopes.name,
    core: cores.name,
    objective: objectives.name,
  }[categoryType];

  let conditions = [eq(students.courseId, courseId)];
  if (categoryId) {
    conditions.push(eq(categoryColumn, categoryId));
  }

  const query = db
    .select({
      studentName: students.firstName,
      categoryName: categoryNameColumn,
      periodId: grades.periodId,
      periodName: periods.name,
      totalGrade: sql<number>`SUM(${grades.grade})`.as("totalGrade"),
    })
    .from(grades)
    .innerJoin(periods, eq(grades.periodId, periods.id))
    .innerJoin(indicators, eq(grades.indicatorId, indicators.id))
    .innerJoin(objectives, eq(indicators.objectiveId, objectives.id))
    .innerJoin(cores, eq(objectives.coreId, cores.id))
    .innerJoin(scopes, eq(cores.scopeId, scopes.id))
    .innerJoin(students, eq(grades.studentId, students.id))
    .where(and(...conditions))
    .groupBy(
      students.firstName,
      categoryNameColumn,
      grades.periodId,
      periods.name
    )
    .orderBy(students.firstName, grades.periodId);

  const results: {
    studentName: string;
    categoryName: string;
    periodId: number;
    periodName: string;
    totalGrade: number;
  }[] = await query;

  // Process the results into the format needed for the graph
  const graphData: GraphData[] = [];
  results.forEach((result) => {
    let studentData = graphData.find(
      (d) => d.studentName === result.studentName
    );
    if (!studentData) {
      studentData = { studentName: result.studentName };
      graphData.push(studentData);
    }
    studentData[result.periodName] = result.totalGrade;
  });

  return graphData;
};
