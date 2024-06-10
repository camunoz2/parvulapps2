import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";

export async function addStudent(form: FormData) {
  //TODO: Improve this with runtime validations
  "use server";
  try {
    await db.insert(students).values({
      firstName: form.get("firstname") as string,
      lastName: form.get("lastname") as string,
      courseId: Number(form.get("course")),
      age: Number(form.get("age")),
    });
    revalidatePath("/dashboard/alumnos");
    return { message: "Student created!" };
  } catch (e) {
    return { message: `Error ${e}` };
  }
}
