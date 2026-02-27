import { describe, it, expect } from "vitest";
import { parseBearerToken } from "../../src/exercises/backend/parseBearerToken.ts";

describe("parseBearerToken", () => {
  it("parses Bearer token case-insensitively", () => {
    expect(parseBearerToken("Bearer abc")).toBe("abc");
    expect(parseBearerToken("bearer abc")).toBe("abc");
  });

  it("rejects invalid header formats", () => {
    expect(parseBearerToken("Basic xyz")).toBeNull();
    expect(parseBearerToken("Bearer")).toBeNull();
    expect(parseBearerToken("Bearer   ")).toBeNull();
    expect(parseBearerToken(undefined)).toBeNull();
    expect(parseBearerToken(123)).toBeNull();
  });

  it("trims extra spaces safely", () => {
    expect(parseBearerToken("Bearer    token123   ")).toBe("token123");
  });
});
