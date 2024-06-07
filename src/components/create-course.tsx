"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreateCourse() {
  const createCourse = (e: React.FormEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Agregar Curso
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" onSubmit={createCourse}>
        <DialogHeader>
          <DialogTitle>Agregar Curso</DialogTitle>
          <DialogDescription>
            Indica el curso y la cantidad de estudiantes
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Curso
            </Label>
            <Input id="name" defaultValue="PreKinder" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Seccion
            </Label>
            <Input id="section" defaultValue="A" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Agregar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
