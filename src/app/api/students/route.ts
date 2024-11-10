import { getStudents } from "@/actions/dataLayer";

export async function GET() {
  const students = await getStudents();
  return Response.json({ students });
}
