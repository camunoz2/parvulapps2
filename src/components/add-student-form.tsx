"use client";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectCourse } from "@/db/schema/course";
import { Button } from "./ui/button";
import { DialogFooter } from "./ui/dialog";
import { addStudent } from "@/actions/dataLayer";

interface Props {
  courses: SelectCourse[];
}

const StudentSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre debe contener mas de 1 caracter" })
    .max(50, { message: "El nombre debe contener menos de 50 caracteres" }),
  lastName: z
    .string()
    .min(1, { message: "El apellido debe contener mas de 1 caracter" })
    .max(50, { message: "El apellido debe contener menos de 50 caracteres" }),
  course: z
    .string()
    .min(1, { message: "El curso debe contener mas de 1 caracter" })
    .max(10, { message: "El curso debe contener menos de 10 caracteres" }),
  age: z
    .number()
    .min(4, { message: "La edad debe ser mayor a 4" })
    .max(10, { message: "La edad debe ser menor a 10" }),
});

export async function AddStudentForm({ courses }: Props) {
  const clientAction = async (formData: FormData) => {
    // client side validation

    const data = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      course: formData.get("course"),
      age: formData.get("age"),
    };

    const result = StudentSchema.safeParse(data);
    if (!result.success) {
      for (const issue of result.error.issues) {
        return issue;
      }
    }
    // TODO: Add client side validation of error messages
    await addStudent(formData);

    // output error messages
  };

  return (
    <form action={clientAction}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="firstname" className="text-right">
            Nombre
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
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id.toString()}>
                    {course.name}
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
          <Input id="age" name="age" defaultValue="7" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Agregar</Button>
      </DialogFooter>
    </form>
  );
}
