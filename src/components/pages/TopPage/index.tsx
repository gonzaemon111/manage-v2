import {
  ArchiveBoxIcon,
  ShieldCheckIcon,
  GlobeAsiaAustraliaIcon,
} from "@heroicons/react/24/outline";
import { Container } from "@/components/atoms/Container";
import { Panel } from "@/components/atoms/Panel";
import { Menu, MenuPanel } from "@/components/organisms/MenuPanel";

const menus: ReadonlyArray<Menu> = [
  {
    name: "タスク",
    href: "/tasks",
    icon: <ShieldCheckIcon className="h-16 w-16 mx-auto" />,
  },
  {
    name: "日用品",
    href: "/daily_necessities",
    icon: <ArchiveBoxIcon className="h-16 w-16 mx-auto" />,
  },
  {
    name: "ドメイン",
    href: "/domains",
    icon: <GlobeAsiaAustraliaIcon className="h-16 w-16 mx-auto" />,
  },
];

export function TopPage() {
  return (
    <>
      <Panel>
        <h1 className="text-2xl">メニュー一覧</h1>
      </Panel>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {menus.map((menu) => (
            <MenuPanel key={menu.name} menu={menu} />
          ))}
        </div>
      </Container>
    </>
  );
}
