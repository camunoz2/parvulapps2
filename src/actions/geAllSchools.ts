import { schools } from "@/db/schema/schools";
import { db } from "@/lib/drizzle";

export async function getAllSchools() {
    try {
        const data = await db.select().from(schools)
        return {message: "Schools loaded successfully!", results: data}
    } catch (e) {
        return {message: "There was an error quering the schools", results: null}
    }
}