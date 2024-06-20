import { z } from "zod";

export const StudentSchema = z.object({
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
    .number({
      invalid_type_error: "La edad debe ser un numero valido",
    })
    .min(4, { message: "Debe ser mayor a 4" })
    .max(10, { message: "Debe ser menor a 10" }),
});
