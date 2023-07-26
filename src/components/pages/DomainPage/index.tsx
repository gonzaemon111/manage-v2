import { Container } from "@/components/atoms/Container";
import { Panel } from "@/components/atoms/Panel";
import { DomainsTable } from "@/components/organisms/Domain/Tables";
import { Domain } from "@/server/domain/Domain";

interface Props {
  readonly domains: ReadonlyArray<Domain>;
}

export function DomainListPage({ domains }: Props) {
  return (
    <>
      <Panel>
        <h1 className="text-2xl">ドメイン</h1>
      </Panel>
      <Container>
        <Panel>
          <DomainsTable domains={domains} />
        </Panel>
      </Container>
    </>
  );
}
