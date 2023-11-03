import { TopPage } from "@/components/pages/TopPage";

export const metadata = {
  title: "トップページ - Manage",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return <TopPage />;
}
