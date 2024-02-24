import { User } from "../user/user.entity";

describe("User Entity", () => {
  it("should be defined", () => {
    const user = new User();
    user.email = "john.doe@example.com";
    user.password = "securePassword";

    expect(user).toBeDefined();
  });
});
