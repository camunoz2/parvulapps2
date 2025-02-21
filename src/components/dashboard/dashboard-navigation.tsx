import { Badge } from "@/components/ui/badge";
import { NavLink } from "./nav-link";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";

export default function DashboardNavigation({
  studentCount,
}: { studentCount: number }) {
  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      <NavLink href="/dashboard" icon={<Home />}>
        Inicio
      </NavLink>
      <NavLink href="/dashboard/courses" icon={<ShoppingCart />}>
        Cursos
      </NavLink>
      <NavLink href="/dashboard/curriculum" icon={<Package />}>
        Curriculum
      </NavLink>
      <NavLink href="/dashboard/grades" icon={<Package />}>
        Evaluaciones
      </NavLink>
      <NavLink href="/dashboard/students" icon={<Users />}>
        Alumnos
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {studentCount}
        </Badge>
      </NavLink>
      <NavLink href="/dashboard/reports" icon={<LineChart />}>
        Reportes
      </NavLink>
    </nav>
  );
}
