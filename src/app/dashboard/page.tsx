import { AddCourse } from "@/components/add-course";
import { SideBar } from "@/components/sidebar";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
	async function DashboardPage() {
		const session = await getSession();
		const user = session?.user;
		return (
			<div className="grid grid-cols-2">
				<SideBar />
				<AddCourse />
			</div>
		);
	},
	{ returnTo: "/dashboard" },
);
