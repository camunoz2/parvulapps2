import Image from "next/image";
import Link from "next/link";
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	CreditCard,
	File,
	Home,
	LineChart,
	ListFilter,
	MoreVertical,
	Package,
	Package2,
	PanelLeft,
	Search,
	Settings,
	ShoppingCart,
	Truck,
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
import { Input } from "@/components/ui/input";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export default function DashboardContent() {
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
					<div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
						<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
							<Card className="sm:col-span-2">
								<CardHeader className="pb-3">
									<CardTitle>Your Orders</CardTitle>
									<CardDescription className="max-w-lg text-balance leading-relaxed">
										Introducing Our Dynamic Orders Dashboard for Seamless
										Management and Insightful Analysis.
									</CardDescription>
								</CardHeader>
								<CardFooter>
									<Button>Create New Order</Button>
								</CardFooter>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>This Week</CardDescription>
									<CardTitle className="text-4xl">$1329</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+25% from last week
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={25} aria-label="25% increase" />
								</CardFooter>
							</Card>
							<Card>
								<CardHeader className="pb-2">
									<CardDescription>This Month</CardDescription>
									<CardTitle className="text-3xl">$5,329</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="text-xs text-muted-foreground">
										+10% from last month
									</div>
								</CardContent>
								<CardFooter>
									<Progress value={12} aria-label="12% increase" />
								</CardFooter>
							</Card>
						</div>
						<div className="flex items-center">
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button
											variant="outline"
											size="sm"
											className="h-7 gap-1 text-sm"
										>
											<ListFilter className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only">Filter</span>
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Filter by</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>
											Fulfilled
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Declined
										</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>
											Refunded
										</DropdownMenuCheckboxItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<Button
									size="sm"
									variant="outline"
									className="h-7 gap-1 text-sm"
								>
									<File className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only">Export</span>
								</Button>
							</div>
						</div>
						<Card>
							<CardHeader className="px-7">
								<CardTitle>Orders</CardTitle>
								<CardDescription>
									Recent orders from your store.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Alumno</TableHead>
											<TableHead className="hidden sm:table-cell">
												Type
											</TableHead>
											<TableHead className="hidden sm:table-cell">
												Status
											</TableHead>
											<TableHead className="hidden md:table-cell">
												Date
											</TableHead>
											<TableHead className="text-right">Amount</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										<TableRow className="bg-accent">
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Sale
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-23
											</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Olivia Smith</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													olivia@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Refund
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="outline">
													Declined
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-24
											</TableCell>
											<TableCell className="text-right">$150.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Noah Williams</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													noah@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Subscription
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-25
											</TableCell>
											<TableCell className="text-right">$350.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Emma Brown</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													emma@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Sale
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-26
											</TableCell>
											<TableCell className="text-right">$450.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Sale
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-23
											</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Liam Johnson</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													liam@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Sale
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-23
											</TableCell>
											<TableCell className="text-right">$250.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Olivia Smith</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													olivia@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Refund
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="outline">
													Declined
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-24
											</TableCell>
											<TableCell className="text-right">$150.00</TableCell>
										</TableRow>
										<TableRow>
											<TableCell>
												<div className="font-medium">Emma Brown</div>
												<div className="hidden text-sm text-muted-foreground md:inline">
													emma@example.com
												</div>
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												Sale
											</TableCell>
											<TableCell className="hidden sm:table-cell">
												<Badge className="text-xs" variant="secondary">
													Fulfilled
												</Badge>
											</TableCell>
											<TableCell className="hidden md:table-cell">
												2023-06-26
											</TableCell>
											<TableCell className="text-right">$450.00</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	);
}
