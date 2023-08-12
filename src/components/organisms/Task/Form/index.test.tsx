import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as Stories from "./index.stories";

describe("Organisms/Task/Form コンポーネント", () => {
  describe("Openな時", () => {
    test("適切なclassNameが適用されている", () => {
      const { Default } = composeStories(Stories);
      const { getByText } = render(<Default />);
      expect(getByText("タスク名")).toBeTruthy();
      expect(getByText("終了日時")).toBeTruthy();
      expect(getByText("締切")).toBeTruthy();
      expect(getByText("メモ")).toBeTruthy();
      expect(getByText("送信")).toBeTruthy();
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
