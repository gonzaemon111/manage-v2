import { Metadata } from "next";
import { TaskNewPage } from "@/components/pages/TaskPage/new";

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
