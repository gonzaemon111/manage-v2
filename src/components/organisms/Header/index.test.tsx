import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as Stories from "./index.stories";

describe("Organisms/Header コンポーネント", () => {
  test("適切なclassNameが適用されている", () => {
    const { Default } = composeStories(Stories);
    const { getByText, container } = render(<Default />);
    expect(getByText("Manage")).toBeTruthy();
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
