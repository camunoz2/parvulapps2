"use server";
import { courses } from "@/db/schema/course";
import { cores, indicators, objectives, scopes } from "@/db/schema/curriculum";
import { periods, grades } from "@/db/schema/grade";
import { schools } from "@/db/schema/school";
import { students } from "@/db/schema/student";
import { users } from "@/db/schema/users";
import { db } from "@/lib/drizzle";
import { and, eq, sql, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export interface IndicatorDetail {
  id: number;
  name: string;
  isActive: boolean;
  level: string;
  order: number;
}

export interface ObjectiveDetail {
  id: number;
  name: string;
  isActive: boolean;
  order: number;
  coreName: string;
  scopeName: string;
  indicators: IndicatorDetail[];
}

export type GetObjectiveDetailReturn = ObjectiveDetail[];

export const getSchools = async () => await db.select().from(schools);

export const getCourses = async () => {
  try {
    const result = await db.select().from(courses);
    return result;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

export const getStudents = async () => await db.select().from(students);
export const getStudentsCount = async () =>
  await db
    .select()
    .from(students)
    .then((res) => res.length);

export const getStudentCountByCourseId = async (courseId: number) => {
  const result = await db
    .select({ count: count() })
    .from(students)
    .where(eq(students.courseId, courseId));

  return result[0]?.count || 0;
};

export const getAuthorizedUsers = async () => await db.select().from(users);

export const getPeriods = async () => await db.select().from(periods);

export const getCores = async () => await db.select().from(cores);

export const getIndicators = async () => await db.select().from(indicators);

export const getObjectiveDetail =
  async (): Promise<GetObjectiveDetailReturn> => {
    const results = await db
      .select({
        objectiveId: objectives.id,
        objectiveName: objectives.name,
        objectiveIsActive: objectives.isActive,
        objectiveOrder: objectives.order,
        coreName: cores.name,
        scopeName: scopes.name,
        indicatorId: indicators.id,
        indicatorName: indicators.name,
        indicatorIsActive: indicators.isActive,
        indicatorLevel: indicators.level,
        indicatorOrder: indicators.order,
      })
      .from(objectives)
      .leftJoin(indicators, eq(indicators.objectiveId, objectives.id))
      .leftJoin(cores, eq(objectives.coreId, cores.id))
      .leftJoin(scopes, eq(cores.scopeId, scopes.id));

    const objectivesMap = new Map<
      number,
      {
        id: number;
        name: string;
        isActive: boolean | null;
        order: number;
        coreName: string;
        scopeName: string;
        indicators: Array<{
          id: number;
          name: string;
          isActive: boolean | null;
          level: string;
          order: number;
        }>;
      }
    >();

    results.forEach((row) => {
      if (!objectivesMap.has(row.objectiveId)) {
        objectivesMap.set(row.objectiveId, {
          id: row.objectiveId,
          name: row.objectiveName,
          isActive: row.objectiveIsActive,
          order: row.objectiveOrder,
          coreName: row.coreName ?? "",
          scopeName: row.scopeName ?? "",
          indicators: [],
        });
      }
      if (row.indicatorId) {
        objectivesMap.get(row.objectiveId)?.indicators.push({
          id: row.indicatorId,
          name: row.indicatorName ?? "",
          isActive: row.indicatorIsActive,
          level: row.indicatorLevel ?? "",
          order: row.indicatorOrder ?? 0,
        });
      }
    });

    return Array.from(objectivesMap.values());
  };

export const getIndicatorsCount = async () => {
  const totalCount = await db
    .select()
    .from(indicators)
    .then((res) => res.length);
  return totalCount;
};

export const getObjectives = async () => await db.select().from(objectives);

export const getScopes = async () => await db.select().from(scopes);

export type GradesEvaluation = Record<string, Record<string, number>>;

export const getStudentsByCourse = async () => {
  const result = await db
    .select({
      id: students.id,
      firstName: students.firstName,
      lastName: students.lastName,
      age: students.age,
      course: courses.name,
    })
    .from(courses)
    .innerJoin(students, eq(students.courseId, courses.id));
  return result;
};

export const getAllGrades = async () => {
  try {
    const result = await db
      .select({
        grade: grades.grade,
        periodName: periods.name,
        firstName: students.firstName,
        lastName: students.lastName,
        courseName: courses.name,
        indicators: indicators.name,
        objectives: objectives.name,
        cores: cores.name,
        scopes: scopes.name,
      })
      .from(grades)
      .innerJoin(students, eq(students.id, grades.studentId))
      .innerJoin(courses, eq(courses.id, students.courseId))
      .innerJoin(indicators, eq(indicators.id, grades.indicatorId))
      .innerJoin(objectives, eq(objectives.id, indicators.objectiveId))
      .innerJoin(cores, eq(cores.id, objectives.coreId))
      .innerJoin(scopes, eq(scopes.id, cores.scopeId))
      .innerJoin(periods, eq(periods.id, grades.periodId));
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getGrades = async (
  periodId: number,
  courseId: number,
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
        and(eq(grades.periodId, periodId), eq(students.courseId, courseId)),
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
  return { message: "Student created!" };
};

export const editStudent = async (fd: FormData) => {
  const updatedData = {
    firstName: fd.get("firstname") as string,
    lastName: fd.get("lastname") as string,
    age: Number(fd.get("age")),
    courseId: Number(fd.get("course")),
    id: Number(fd.get("studentid")),
  };

  await db
    .update(students)
    .set({
      firstName: updatedData.firstName,
      lastName: updatedData.lastName,
      age: updatedData.age,
      courseId: updatedData.courseId,
    })
    .where(eq(students.id, updatedData.id));
};

export const addCourseAction = async (initialState, formData: FormData) => {
  try {
    const courseName = formData.get("coursename") as string;
    const year = Number(formData.get("year"));
    await db.insert(courses).values({ name: courseName, year: year });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const deleteCourse = async (previousState, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const courseId = Number(formData.get("id"));
  if (!courseId) return "No hay id";
  try {
    await db.delete(courses).where(eq(courses.id, courseId));
    revalidatePath("/dashboard/courses");
  } catch (e) {
    return `Error ${e}`;
  }
};

export const deleteStudent = async (studentId: number) => {
  await db.delete(students).where(eq(students.id, studentId));
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
      `Attempting to update grade for student ${studentId}, indicator ${indicatorId}, period ${periodId}`,
    );

    const result = await db
      .update(grades)
      .set({ grade })
      .where(
        and(
          eq(grades.studentId, studentId),
          eq(grades.indicatorId, indicatorId),
          eq(grades.periodId, periodId),
        ),
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
  categoryId?: number, // Optional: to filter by specific scope, core, or objective
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
      periods.name,
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
      (d) => d.studentName === result.studentName,
    );
    if (!studentData) {
      studentData = { studentName: result.studentName };
      graphData.push(studentData);
    }
    studentData[result.periodName] = result.totalGrade;
  });

  return graphData;
};
