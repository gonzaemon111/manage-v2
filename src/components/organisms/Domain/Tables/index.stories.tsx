import type { Meta, StoryObj } from "@storybook/react";

import { DomainsTable } from ".";

const meta = {
  title: "Organisms/Domain/Table",
  component: DomainsTable,
} satisfies Meta<typeof DomainsTable>;

export default meta;

const domains = [
  {
    id: 1,
    userId: 1,
    name: "sample.app",
    isCanceled: false,
    memo: "メモ",
    nextUpdatedAt: "2023/08/01",
    provider: "Google Domain",
    accountName: "sample",
  },
  {
    id: 2,
    userId: 1,
    name: "sample.dev",
    isCanceled: false,
    memo: "メモ",
    nextUpdatedAt: "2024/07/31",
    provider: "ムームードメイン",
    accountName: "sample",
  },
];

type Story = StoryObj<typeof DomainsTable>;

export const Default: Story = {
  args: {
    domains,
  },
};
