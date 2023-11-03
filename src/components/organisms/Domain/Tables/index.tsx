import { Link } from "@/components/atoms/Link";
import { Domain } from "@/server/domain/Domain";

interface Props {
  readonly domains: ReadonlyArray<Domain>;
}

export function DomainsTable({ domains }: Props) {
  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-slate-300 dark:border-slate-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3">
              タスク名
            </th>
            <th scope="col" className="px-6 py-3">
              アカウント名
            </th>
            <th scope="col" className="px-6 py-3">
              終了日時
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {domains.map((domain) => {
            return (
              <tr className="bg-white dark:bg-gray-900" key={domain.id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {domain.isCanceled !== undefined ? "✅" : null}
                </th>
                <td className="px-6 py-4">
                  <Link href={`/tasks/${domain.id}`}>{domain.name}</Link>
                </td>
                <td className="px-6 py-4">{domain.accountName}</td>
                <td className="px-6 py-4">
                  {domain.nextUpdatedAt !== undefined
                    ? domain.nextUpdatedAt
                    : null}
                </td>
                <td className="px-6 py-4">
                  <Link href={`/domains/${domain.id}/edit`}>編集</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
