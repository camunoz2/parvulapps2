import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { type SelectStudent } from "@/db/schema/students";
import { updateStudent } from "@/actions/dataLayer";
import { SelectCourse } from "@/db/schema/courses";

interface Props {
  student: SelectStudent;
  allCourses: SelectCourse[];
}

export async function StudentFormUpdate({ student, allCourses }: Props) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agrega un alumno</DialogTitle>
        <DialogDescription>Reacuerda agregar todos los datos</DialogDescription>
      </DialogHeader>

      <form action={updateStudent}>
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
