import { TaskNewPage } from "@/components/pages/TaskPage/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タスク新規作成 - Manage",
};

export default function Page() {
  return <TaskNewPage />;
}
