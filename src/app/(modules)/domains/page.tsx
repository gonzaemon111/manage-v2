import { getServerSession } from "next-auth/next";
import { TopPage } from "@/components/pages/TopPage";
import { authOptions } from "../../api/auth/[...nextauth]/authOption";

export const metadata = {
  title: "ドメイン一覧 - Manage",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  console.log("ServerSession");
  console.log(session);
  return <TopPage />;
}
