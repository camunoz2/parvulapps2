import Link from "next/link";
import { Plus } from "lucide-react";

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

export default function Courses() {
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
						<Button asChild size="sm" className="ml-auto gap-1">
							<Link href="#">
								Agregar Cursos
								<Plus className="h-4 w-4" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Curso</TableHead>
									<TableHead className="text-right">
										Cant. Estudiantes
									</TableHead>
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
									<TableCell className="text-right">23</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>
										<div className="font-medium">Liam Johnson</div>
										<div className="hidden text-sm text-muted-foreground md:inline">
											liam@example.com
										</div>
									</TableCell>
									<TableCell className="text-right">32</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
