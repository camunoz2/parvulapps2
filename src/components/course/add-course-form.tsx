"use client";

import { addCourse } from "@/actions/dataLayer";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export function AddCourseForm() {
  async function clientAction(formData: FormData) {
    const courseName = formData.get("coursename") as string;
    const year = Number(formData.get("year"));
    await addCourse({ courseName, year });
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Agregar Curso</DialogTitle>
        <DialogDescription>Indica el nombre del curso</DialogDescription>
      </DialogHeader>
      <form action={clientAction}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Curso
            </Label>
            <Input
              id="name"
              defaultValue="PreKinder - A"
              className="col-span-3"
              name="coursename"
            />
            <Label htmlFor="year" className="text-right">
              Año
            </Label>
            <Input
              id="year"
              defaultValue="2024"
              className="col-span-3"
              name="year"
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
