import { TaskNewPage } from "@/components/pages/TaskPage/new";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "タスク新規作成 - Manage",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <TaskNewPage />;
}
