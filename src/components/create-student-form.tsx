import { db } from "@/lib/drizzle";
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
import { courses } from "@/db/schema/courses";
import { addStudent } from "@/actions/addStudent";

export default async function CreateStudentForm() {
  const results = await db.select().from(courses);
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agrega un alumno</DialogTitle>
        <DialogDescription>Reacuerda agregar todos los datos</DialogDescription>
      </DialogHeader>

      <form action={addStudent}>
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
  );
}
