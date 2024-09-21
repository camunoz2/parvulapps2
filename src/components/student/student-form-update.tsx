"use client";
import type { SelectCourse } from "@/db/schema/course";
import type { SelectStudent } from "@/db/schema/student";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { StudentSchema } from "@/lib/zod-schemas";
import { toast } from "@/components/hooks/use-toast";

interface Props {
  student: SelectStudent;
  allCourses: SelectCourse[];
}

export async function StudentFormUpdate({ student, allCourses }: Props) {
  async function clientAction(formData: FormData) {
    const updatedData = {
      firstName: formData.get("firstname"),
      lastName: formData.get("lastname"),
      age: Number(formData.get("age")),
      course: formData.get("course"),
    };

    const parsedData = StudentSchema.safeParse(updatedData);
    let errMsg = "";
    if (!parsedData.success) {
      for (const issue of parsedData.error.issues) {
        errMsg = `${issue.message}.\n`;
      }
    }
    toast({
      title: "Error",
      description: errMsg,
    });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agrega un alumno</DialogTitle>
        <DialogDescription>Reacuerda agregar todos los datos</DialogDescription>
      </DialogHeader>

      <form action={clientAction}>
        <Input
          name="studentid"
          value={student.id}
          className="hidden"
          readOnly
        />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="firstname" className="text-right">
              Nombre
            </Label>
            <Input
              name="firstname"
              id="firstname"
              defaultValue={student.firstName}
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
              defaultValue={student.lastName}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="course" className="text-right">
              Curso
            </Label>
            <Select name="course" defaultValue={student.courseId.toString()}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Elige el curso" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Curso</SelectLabel>
                  {allCourses.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
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
              name="age"
              type="number"
              defaultValue={student.age}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Editar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
