import { Article } from "./article.entity";

describe("Article Entity", () => {
  it("should be defined", () => {
    expect(new Article()).toBeDefined();
  });
});
