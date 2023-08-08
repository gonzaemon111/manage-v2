import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as Stories from "./index.stories";

describe("Organisms/Sidebar コンポーネント", () => {
  describe("Openな時", () => {
    test("適切なclassNameが適用されている", () => {
      const { Default } = composeStories(Stories);
      const { getByText } = render(<Default />);
      expect(getByText("プライベート")).toBeTruthy();
      expect(getByText("タスク")).toBeTruthy();
      expect(getByText("在庫管理")).toBeTruthy();
      expect(getByText("日用品")).toBeTruthy();
      expect(getByText("ドメイン")).toBeTruthy();
      expect(getByText("設定")).toBeTruthy();
    });
  });

  describe("closeな時", () => {
    test("適切なclassNameが適用されている", () => {
      const { SidebarClose } = composeStories(Stories);
      const { getByText, container } = render(<SidebarClose />);
      expect(container.getElementsByClassName("hidden")).toBeTruthy();
      expect(getByText("プライベート")).toBeTruthy();
      expect(getByText("タスク")).toBeTruthy();
      expect(getByText("在庫管理")).toBeTruthy();
      expect(getByText("日用品")).toBeTruthy();
      expect(getByText("ドメイン")).toBeTruthy();
      expect(getByText("設定")).toBeTruthy();
    });
  });

  describe("スナップショットテスト", () => {
    const testCases = Object.values(composeStories(Stories)).map((Story) => [
      Story.storyName,
      Story,
    ]);

    test.each(testCases)("Renders %s story", async (storyName, Story) => {
      if (!Story) {
        throw new Error("Story not Found");
      }

      const tree = render(<Story />);
      expect(tree).toMatchSnapshot();
    });
  });
});
