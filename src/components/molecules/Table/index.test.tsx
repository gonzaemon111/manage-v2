import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as Stories from "./index.stories";

describe("Molecules/Table コンポーネント", () => {
  describe("正常な時", () => {
    test("適切なタグが表示されている", () => {
      const { Default } = composeStories(Stories);
      const { getByRole } = render(<Default />);
      expect(getByRole("table")).toBeTruthy();
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
