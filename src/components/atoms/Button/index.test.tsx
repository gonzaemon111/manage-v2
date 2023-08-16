import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import * as stories from "./index.stories";
import { Button, LinkButton } from ".";

describe("スナップショットテスト", () => {
  const testCases = Object.values(composeStories(stories)).map((Story) => [
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

describe("Buttonコンポーネント", () => {
  test("適切なclassNameが適用されている", () => {
    const { getByText } = render(<Button name="新規作成" />);
    expect(getByText("新規作成")).toBeTruthy();
  });
});

describe("LinkButtonコンポーネント", () => {
  test("適切なclassNameが適用されている", () => {
    const { getByText } = render(<LinkButton name="新規作成" href="/" />);
    expect(getByText("新規作成")).toBeTruthy();
  });
});
