import Image from "next/image";
import Link from "next/link";
import {
	File,
	Home,
	LineChart,
	ListFilter,
	MoreHorizontal,
	Package,
	Package2,
	PanelLeft,
	PlusCircle,
	Search,
	Settings,
	ShoppingCart,
	Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EvalPage() {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
				<Tabs defaultValue="diagnostica">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="diagnostica">Diagnostica</TabsTrigger>
							<TabsTrigger value="intermedia">Intermedia</TabsTrigger>
							<TabsTrigger value="cierre">Cierre</TabsTrigger>
						</TabsList>
						<div className="ml-auto flex items-center gap-2">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="outline" size="sm" className="h-8 gap-1">
										<ListFilter className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Filtrar
										</span>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuLabel>Filter by</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuCheckboxItem checked>
										Active
									</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
									<DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
								</DropdownMenuContent>
							</DropdownMenu>

							<Button size="sm" className="h-8 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Evaluar
								</span>
							</Button>
						</div>
					</div>
					<TabsContent value="diagnostica">
						<Card>
							<CardHeader>
								<CardTitle>Evaluaciones</CardTitle>
								<CardDescription>
									Ingresa las evaluaciones por alumno. Ya sea diagnostica,
									intermedia o de cierre
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Nombre</TableHead>
											<TableHead>Estado</TableHead>
											<TableHead>Curso</TableHead>
											<TableHead className="hidden md:table-cell">
												Progreso
											</TableHead>
											<TableHead className="hidden md:table-cell">
												Fecha
											</TableHead>
											<TableHead className="hidden md:table-cell">
												Opciones
											</TableHead>
											<TableHead>
												<span className="sr-only">Actions</span>
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell className="font-medium">
												Rodolfo Lavanderos
											</TableCell>
											<TableCell>
												<Badge variant="outline">Evaluado</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												PreKinder
											</TableCell>
											<TableCell className="hidden md:table-cell">
												13/45
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2024-02-14 02:14 PM
											</TableCell>
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
													<DropdownMenuContent align="end">
														<DropdownMenuItem>Editar</DropdownMenuItem>
														<DropdownMenuItem>Eliminar</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
							<CardFooter>
								<div className="text-xs text-muted-foreground">
									Showing <strong>1-10</strong> of <strong>32</strong> products
								</div>
							</CardFooter>
						</Card>
					</TabsContent>
				</Tabs>
			</main>
		</div>
	);
}
