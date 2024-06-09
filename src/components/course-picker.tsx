"use client";
import type { SelectCourse } from "@/db/schema/courses";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  courses: SelectCourse[];
}

export default function CoursePicker({ courses }: Props) {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Elige el curso" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Curso</SelectLabel>
          {courses.map((c) => (
            <SelectItem key={c.id} value={c.course}>
              {c.course}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
