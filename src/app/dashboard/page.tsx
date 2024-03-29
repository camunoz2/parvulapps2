import { AddCourse } from "@/components/add-course";
import { SideBar } from "@/components/sidebar";

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-2">
      <SideBar />
      <AddCourse />
    </div>
  )
}
