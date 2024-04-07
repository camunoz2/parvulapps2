import { Button } from "@/components/ui/button";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "@/components/ui/card";
import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { PlusCircle, MoreHorizontal } from "lucide-react";

export default function AdminPage() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
				<Card className="xl:col-span-2">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Institucion Educativa</CardTitle>
							<CardDescription>
								Agregar instituciones educativas. Debe tener un correo de
								administrador
							</CardDescription>
						</div>
						<Button size="sm" className="ml-auto gap-1">
							<PlusCircle className="h-3.5 w-3.5" />
							<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
								Agregar Institucion
							</span>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Institucion</TableHead>
									<TableHead>Admin</TableHead>
									<TableHead>Email Admin</TableHead>
									<TableHead>Dominio</TableHead>
									<TableHead>Cantidad de estudiantes</TableHead>
									<TableHead>Opciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>
										<div className="font-medium">Colegio Demo</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											Calle San Valentin 8989
										</div>
									</TableCell>
									<TableCell>Emilio</TableCell>
									<TableCell>emilio@asd.cl</TableCell>
									<TableCell>asd.cl</TableCell>
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
