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
				<Tabs defaultValue="todas">
					<div className="flex items-center">
						<TabsList>
							<TabsTrigger value="todas">Todas</TabsTrigger>
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
							<Button size="sm" variant="outline" className="h-8 gap-1">
								<File className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Exportar
								</span>
							</Button>
							<Button size="sm" className="h-8 gap-1">
								<PlusCircle className="h-3.5 w-3.5" />
								<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
									Evaluar
								</span>
							</Button>
						</div>
					</div>
					<TabsContent value="todas">
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
											<TableHead className="hidden md:table-cell">
												Pje. Total
											</TableHead>
											<TableHead className="hidden md:table-cell">
												Total Sales
											</TableHead>
											<TableHead className="hidden md:table-cell">
												Created at
											</TableHead>
											<TableHead>
												<span className="sr-only">Actions</span>
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow>
											<TableCell className="font-medium">
												Rodolfo Muñoz
											</TableCell>
											<TableCell>
												<Badge variant="outline">D</Badge>
												<Badge variant="outline">I</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$499.99
											</TableCell>
											<TableCell className="hidden md:table-cell">25</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-07-12 10:42 AM
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-medium">
												Hypernova Headphones
											</TableCell>
											<TableCell>
												<Badge variant="outline">Active</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$129.99
											</TableCell>
											<TableCell className="hidden md:table-cell">
												100
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-10-18 03:21 PM
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-medium">
												AeroGlow Desk Lamp
											</TableCell>
											<TableCell>
												<Badge variant="outline">Active</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$39.99
											</TableCell>
											<TableCell className="hidden md:table-cell">50</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-11-29 08:15 AM
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-medium">
												TechTonic Energy Drink
											</TableCell>
											<TableCell>
												<Badge variant="secondary">Draft</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$2.99
											</TableCell>
											<TableCell className="hidden md:table-cell">0</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-12-25 11:59 PM
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-medium">
												Gamer Gear Pro Controller
											</TableCell>
											<TableCell>
												<Badge variant="outline">Active</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$59.99
											</TableCell>
											<TableCell className="hidden md:table-cell">75</TableCell>
											<TableCell className="hidden md:table-cell">
												2024-01-01 12:00 AM
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell className="font-medium">
												Luminous VR Headset
											</TableCell>
											<TableCell>
												<Badge variant="outline">Active</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												$199.99
											</TableCell>
											<TableCell className="hidden md:table-cell">30</TableCell>
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
														<DropdownMenuLabel>Actions</DropdownMenuLabel>
														<DropdownMenuItem>Edit</DropdownMenuItem>
														<DropdownMenuItem>Delete</DropdownMenuItem>
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
