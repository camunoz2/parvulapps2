import { courses } from "@/db/schema/courses";
import { students } from "@/db/schema/students";
import { db } from "@/lib/drizzle";
import { PlusCircle } from "lucide-react";
import { revalidatePath } from "next/cache";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default async function CreateStudent() {
  const results = await db.select().from(courses);
  async function addStudent(form: FormData) {
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar Alumno
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agrega un alumno</DialogTitle>
          <DialogDescription>
            Reacuerda agregar todos los datos
          </DialogDescription>
        </DialogHeader>

        <form id="yep" action={addStudent}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                Nombres
              </Label>
              <Input
                name="firstname"
                id="firstname"
                defaultValue="Pedro"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Apellidos
              </Label>
              <Input
                id="lastname"
                name="lastname"
                defaultValue="Duarte"
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="course" className="text-right">
                Curso
              </Label>
              <Select name="course">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Elige el curso" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Curso</SelectLabel>
                    {results.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.course}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Edad
              </Label>
              <Input
                id="age"
                name="age"
                defaultValue="7"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Agregar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
