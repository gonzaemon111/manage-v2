import { getServerSession } from "next-auth/next";
import { DomainListPage } from "@/components/pages/DomainPage";
import { authOptions } from "../../api/auth/[...nextauth]/authOption";

type Domain = {
  readonly id: number;
  readonly userId: number;
  readonly name: string;
  readonly isCanceled: boolean;
  readonly memo: string;
  readonly nextUpdatedAt: string;
  readonly provider: string;
  readonly accountName: string;
};

async function fetchDomains(): Promise<{ domains: ReadonlyArray<Domain> }> {
  return await Promise.resolve({
    domains: [
      {
        id: 1,
        userId: 1,
        name: "wikimap.app",
        isCanceled: false,
        memo: "メモ",
        provider: "Google Domain",
        nextUpdatedAt: "2023/08/01 10:00",
        accountName: "Google",
      },
    ],
  });
}

export const metadata = {
  title: "ドメイン一覧 - Manage",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Page() {
  const { domains } = await fetchDomains();
  const session = await getServerSession(authOptions);
  console.log("ServerSession");
  console.log(session);
  return <DomainListPage domains={domains} />;
}
