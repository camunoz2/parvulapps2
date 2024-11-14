"use client";

import {
  HydrationBoundary,
  queryOptions,
  useSuspenseQuery,
  dehydrate,
} from "@tanstack/react-query";
import {
  Bell,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  UserIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getQueryClient } from "@/lib/query-client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(path);
  };

  const NavLink = ({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
        isActive(href)
          ? "bg-accent text-accent-foreground"
          : "text-muted-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </Link>
  );

  const studentOptions = queryOptions({
    queryKey: ["students"],
    queryFn: async () => {
      const data = await fetch("/api/students");
      return data;
    },
  });

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(studentOptions);
  const { data, isLoading } = useSuspenseQuery(studentOptions);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Parvulapps</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <NavLink href="/dashboard" icon={Home}>
                Inicio
              </NavLink>
              <NavLink href="/dashboard/courses" icon={ShoppingCart}>
                Cursos
              </NavLink>
              <NavLink href="/dashboard/grades" icon={Package}>
                Evaluaciones
              </NavLink>
              <NavLink href="/dashboard/students" icon={Users}>
                Alumnos
                <HydrationBoundary state={dehydrate(queryClient)}>
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    {isLoading ? "0" : data?.length}
                  </Badge>
                </HydrationBoundary>
              </NavLink>
              <NavLink href="/dashboard/reports" icon={LineChart}>
                Reportes
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="">Parvulapps</span>
                </Link>
                <NavLink href="/dashboard" icon={Home}>
                  Inicio
                </NavLink>
                <NavLink href="/dashboard/courses" icon={ShoppingCart}>
                  Cursos
                </NavLink>
                <NavLink href="/dashboard/grades" icon={Package}>
                  Evaluaciones
                </NavLink>
                <NavLink href="/dashboard/students" icon={Users}>
                  Alumnos
                </NavLink>
                <NavLink href="/dashboard/reports" icon={LineChart}>
                  Reportes
                </NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar alumnos"
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Abrir menu de usuario</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configuracion</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <a href="/api/auth/logout">Cerrar Sesion</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Toaster />
        {children}
      </div>
    </div>
  );
}
