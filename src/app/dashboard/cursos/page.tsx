import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ToastNotification } from "@/components/toast-notification";
import { turso } from "@/lib/turso";

export default function Courses() {
	//	function showToast() {
	//		return <ToastNotification description="Something added" />;
	//	}

	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
				<Card className="xl:col-span-2">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Cursos</CardTitle>
							<CardDescription>
								Cursos agregados a su institucion educativa
							</CardDescription>
						</div>

						<Dialog>
							<DialogTrigger asChild>
								<Button size="sm" className="ml-auto gap-1">
									<PlusCircle className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
										Agregar Curso
									</span>
								</Button>
							</DialogTrigger>
							<DialogContent
								className="sm:max-w-[425px]"
								onSubmit={createCourse}
							>
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
										<Input
											id="name"
											defaultValue="PreKinder"
											className="col-span-3"
										/>
									</div>
									<div className="grid grid-cols-4 items-center gap-4">
										<Label htmlFor="section" className="text-right">
											Seccion
										</Label>
										<Input
											id="section"
											defaultValue="A"
											className="col-span-3"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button type="submit">Agregar</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Curso</TableHead>
									<TableHead>Cant. Estudiantes</TableHead>
									<TableHead>Opciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<div className="font-medium">Curso Demo</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											PreKinder A
										</div>
									</TableCell>
									<TableCell>23</TableCell>
									<TableCell>
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													aria-haspopup="true"
													size="icon"
													variant="ghost"
												>
													<MoreHorizontal className="h-4 w-4" />
													<span className="sr-only">Toggle menu</span>
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="center">
												<DropdownMenuItem>Editar</DropdownMenuItem>
												<DropdownMenuItem>Eliminar</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
