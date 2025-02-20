"use client";
import { deleteCourse } from "@/actions/dataLayer";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { useActionState } from "react";
import { Loader2, MoreHorizontal } from "lucide-react";

export function CourseDeleteButton({ courseId }: { courseId: number }) {
  const [error, action, pending] = useActionState(deleteCourse, null);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-haspopup="true"
          size="icon"
          variant="ghost"
          disabled={pending}
        >
          {pending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <MoreHorizontal className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem>Editar</DropdownMenuItem>
        <form action={action}>
          <input type="hidden" name="id" value={courseId} />
          <DropdownMenuItem asChild>
            <button type="submit">Eliminar</button>
          </DropdownMenuItem>
          {error && <p>{error}</p>}
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
