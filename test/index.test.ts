import { expect, test } from "vitest";
import { message } from "../src/index.js";

test("message function returns the correct message", () => {
  expect(message()).toBe("IFT538 - Projet TypeScript de base");
});
