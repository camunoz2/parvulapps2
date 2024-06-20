"use client";
import { addStudent } from "@/actions/dataLayer";
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
import { useToast } from "@/components/ui/use-toast";
import type { SelectCourse } from "@/db/schema/course";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";

interface Props {
  courses: SelectCourse[];
}

const StudentSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "El nombre del alumno debe ser mas largo" })
    .max(50, { message: "El nombre del alumno es muy largo" }),
  lastName: z
    .string()
    .min(1, { message: "El apellido es muy corto" })
    .max(50, { message: "El apellido es muy largo" }),
  course: z
    .string()
    .min(1, {
      message:
        "Debes asignar un curso de la lista primero. Si no aparece ninguno, debes crearlo",
    })
    .max(10, { message: "El nombre del curso es muy largo" }),
  age: z
    .number()
    .min(4, { message: "Debe ser mayor a 4" })
    .max(10, { message: "Debe ser menor a 10" }),
});

export function AddStudentForm({ courses }: Props) {
  const { toast } = useToast();
  const clientAction = async (formData: FormData) => {
    // client side validation

    const data = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      course: formData.get("course"),
      age: Number(formData.get("age")),
    };

    const result = StudentSchema.safeParse(data);
    let errorMessage = "";
    if (!result.success) {
      for (const issue of result.error.issues) {
        errorMessage = `${issue.message} \n`;
      }
      toast({
        title: "Error",
        description: errorMessage,
      });
      console.log(errorMessage);
    } else {
      await addStudent(formData);
    }
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
