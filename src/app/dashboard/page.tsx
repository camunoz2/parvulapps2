import { AddCourse } from "@/components/add-course";
import { SideBar } from "@/components/sidebar";
import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2">
      <UserButton afterSignOutUrl="/" />
      <SideBar />
      <AddCourse />
    </div>
  )
}
