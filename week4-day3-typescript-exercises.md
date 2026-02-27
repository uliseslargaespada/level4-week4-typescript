# Week 4 — Day 3 (Async) TypeScript Exercises

## Mixed Practice: Algorithmic Functions + Backend Parsing Utilities

This worksheet is designed for **asynchronous work** after class. It includes:

- A recommended project setup (TypeScript + Vitest)
- A set of **required exercises** (algorithmic + backend parsing utilities)
- A test suite you can run locally to confirm correctness
- Solution guidelines and common pitfalls (TypeScript-first)

---

## 0) Prerequisites

- Node.js **22 LTS** recommended.
- You should already know basic TypeScript syntax and `tsconfig.json`.
- You should be comfortable running tests from the terminal.

---

## 1) Setup (recommended)

### 1.1 Create a folder structure

```
lv4-week4-typescript-lab/
  src/
    exercises/
      index.ts
      algorithm/
      backend/
  tests/
    algorithm/
    backend/
  tsconfig.json
  vitest.config.ts
  package.json
```

### 1.2 Install dependencies

```bash
npm i -D typescript tsx vitest @types/node
```

### 1.3 `package.json` scripts (add these)

```json
{
  "scripts": {
    "dev": "tsx watch src/exercises/index.ts",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

> Note: `tsx` runs TypeScript but **does not typecheck**, so always run `npm run typecheck` too.

> Note2: You can use the same repository of class, but create a new script for the tests. 
```json
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "typecheck": "tsc -p tsconfig.json --noEmit",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "exercises:dev": "tsx watch src/exercises/index.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  },
```

### 1.4 `tsconfig.json` (strict)

Create or replace:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "strict": true,
    "skipLibCheck": true,
    "noEmitOnError": true
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"]
}
```

### 1.5 `vitest.config.ts`

Create:

```ts
import { defineConfig } from "vitest/config";

/**
 * Vitest configuration.
 * Keep it minimal for the course.
 */
export default defineConfig({
  test: {
    environment: "node"
  }
});
```

---

## 2) How to run and verify your work

### 2.1 Run the type checker

```bash
npm run typecheck
```

### 2.2 Run tests

```bash
npm test
```

### 2.3 While coding (optional)

```bash
npm run test:watch
```

---

## 3) Rules for this assignment

1. **Do not use `any`.**Use `unknown`, unions, type guards, and narrowing.
2. All functions must be **pure** unless explicitly stated.
3. Follow the exact function signatures.
4. Keep code **documented with comments** (brief but clear).
5. Make sure **all tests pass** and `typecheck` reports **0 errors**.

---

# 4) Required Exercises (10 total)

You must complete **Exercises 1–8**.
Exercises **9–10** are optional (bonus).

Each exercise has:

- A file location
- A function signature
- Acceptance criteria
- Example inputs/outputs

---

## Exercise 1 — Backend Utility: `parseBearerToken`

**File:** `src/exercises/backend/parseBearerToken.ts`

### Goal

Parse an Authorization header: `"Bearer <token>"` → token string, otherwise `null`.

### Signature

```ts
/**
 * Parses an Authorization header in the format "Bearer <token>".
 *
 * @param header Unknown input (could be undefined, string, etc.)
 * @returns The token if valid; otherwise null.
 */
export function parseBearerToken(header: unknown): string | null;
```

### Acceptance criteria

- Accepts `"Bearer abc"` and `"bearer abc"`
- Rejects missing token (`"Bearer"`, `"Bearer   "`)
- Rejects other schemes (`"Basic xyz"`)
- Trims extra spaces safely

---

## Exercise 2 — Backend Utility: `parsePagination`

**File:** `src/exercises/backend/parsePagination.ts`

### Goal

Convert query-like inputs to validated numbers.

### Signature

```ts
export interface PaginationResult {
  limit: number;
  offset: number;
}

/**
 * Parses and validates pagination values.
 *
 * Defaults:
 * - limit = 20
 * - offset = 0
 *
 * Rules:
 * - limit must be 1..100
 * - offset must be >= 0
 */
export function parsePagination(
  limitRaw: unknown,
  offsetRaw: unknown
): PaginationResult;
```

### Acceptance criteria

- `"10"` becomes 10
- limit max is 100
- invalid inputs throw `Error` with a clear message
- `offsetRaw` missing → 0

---

## Exercise 3 — Backend Utility: `parseCsvIncludes`

**File:** `src/exercises/backend/parseCsvIncludes.ts`

### Goal

Parse a CSV includes string (e.g. `"comments,author"`) into a normalized Set, filtered by allowed values.

### Signature

```ts
/**
 * Parses a CSV list and filters by allowed tokens.
 *
 * @param value unknown (usually req.query.include)
 * @param allowed allowed tokens, e.g. ["comments", "author"]
 */
export function parseCsvIncludes(
  value: unknown,
  allowed: readonly string[]
): Set<string>;
```

### Acceptance criteria

- `"comments,author"` → Set { "comments", "author" }
- `"comments, author,unknown"` filters out `"unknown"`
- case-insensitive: `"AUTHOR"` becomes `"author"`
- non-string input returns empty Set

---

## Exercise 4 — Backend Utility: `isUuidV4`

**File:** `src/exercises/backend/isUuidV4.ts`

### Goal

Validate UUID v4 strings using a regex.

### Signature

```ts
/**
 * Checks whether a value is a UUID v4 string.
 */
export function isUuidV4(value: unknown): value is string;
```

### Acceptance criteria

- Returns `true` for valid UUID v4
- Returns `false` otherwise
- Uses a type predicate (`value is string`) to enable narrowing in other code

---

## Exercise 5 — Algorithm: `twoSum`

**File:** `src/exercises/algorithm/twoSum.ts`

### Goal

Return indices of two numbers that sum to target.

### Signature

```ts
/**
 * Returns a tuple of indices [i, j] where nums[i] + nums[j] === target.
 * If no solution exists, return null.
 */
export function twoSum(nums: number[], target: number): [number, number] | null;
```

### Acceptance criteria

- Runs in O(n)
- Does not reuse the same index twice
- Returns the first valid pair by scanning left-to-right (as tested)

---

## Exercise 6 — Algorithm: `isPalindrome`

**File:** `src/exercises/algorithm/isPalindrome.ts`

### Goal

Check if a string is a palindrome ignoring case and non-alphanumeric characters.

### Signature

```ts
/**
 * Returns true if `input` is a palindrome.
 * Ignore punctuation, spaces, and casing.
 */
export function isPalindrome(input: string): boolean;
```

---

## Exercise 7 — Algorithm + Generics: `groupBy`

**File:** `src/exercises/algorithm/groupBy.ts`

### Goal

Group items by a computed key using generics.

### Signature

```ts
/**
 * Groups items into an object keyed by K.
 */
export function groupBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]>;
```

---

## Exercise 8 — Algorithm: `topKFrequent`

**File:** `src/exercises/algorithm/topKFrequent.ts`

### Goal

Return the k most frequent strings. Tie-break by alphabetical order.

### Signature

```ts
/**
 * Returns the k most frequent words.
 * If counts tie, sort alphabetically.
 */
export function topKFrequent(words: string[], k: number): string[];
```

---

## Exercise 9 (Bonus) — Backend Utility: `safeJsonParse`

**File:** `src/exercises/backend/safeJsonParse.ts`

### Goal

Safely parse JSON. Return `unknown | null`.

### Signature

```ts
/**
 * Safely parses JSON; returns null if parsing fails.
 */
export function safeJsonParse(input: string): unknown | null;
```

---

## Exercise 10 (Bonus) — Algorithm: `uniqueBy`

**File:** `src/exercises/algorithm/uniqueBy.ts`

### Goal

Return unique items by key.

### Signature

```ts
export function uniqueBy<T, K extends string | number>(
  items: T[],
  keyFn: (item: T) => K
): T[];
```

---

# 5) Starter files (copy/paste)

Create the following “stubs” and implement them.

## 5.1 `src/exercises/index.ts`

```ts
/**
 * Entry point (optional).
 * You can use this file to manually run small demos while developing.
 */
console.log("Week 4 Day 3 exercises. Run `npm test` and `npm run typecheck`.");
```

---

# 6) Tests (copy/paste into Vitest)

> Create these files exactly and make sure all tests pass.

## 6.1 `tests/backend/parseBearerToken.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { parseBearerToken } from "../../src/exercises/backend/parseBearerToken";

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
```

## 6.2 `tests/backend/parsePagination.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { parsePagination } from "../../src/exercises/backend/parsePagination";

describe("parsePagination", () => {
  it("uses defaults when missing", () => {
    expect(parsePagination(undefined, undefined)).toEqual({ limit: 20, offset: 0 });
  });

  it("parses numeric strings", () => {
    expect(parsePagination("10", "5")).toEqual({ limit: 10, offset: 5 });
  });

  it("enforces max limit 100", () => {
    expect(() => parsePagination("101", "0")).toThrow();
  });

  it("rejects invalid values", () => {
    expect(() => parsePagination("-1", "0")).toThrow();
    expect(() => parsePagination("10", "-3")).toThrow();
    expect(() => parsePagination("nope", "0")).toThrow();
  });
});
```

## 6.3 `tests/backend/parseCsvIncludes.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { parseCsvIncludes } from "../../src/exercises/backend/parseCsvIncludes";

describe("parseCsvIncludes", () => {
  const allowed = ["comments", "author"] as const;

  it("parses and filters includes", () => {
    const s = parseCsvIncludes("comments,author,unknown", allowed);
    expect(Array.from(s).sort()).toEqual(["author", "comments"]);
  });

  it("handles casing and whitespace", () => {
    const s = parseCsvIncludes("  AUTHOR ,  comments  ", allowed);
    expect(Array.from(s).sort()).toEqual(["author", "comments"]);
  });

  it("returns empty set for non-string", () => {
    expect(parseCsvIncludes(undefined, allowed).size).toBe(0);
    expect(parseCsvIncludes(1, allowed).size).toBe(0);
  });
});
```

## 6.4 `tests/backend/isUuidV4.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { isUuidV4 } from "../../src/exercises/backend/isUuidV4";

describe("isUuidV4", () => {
  it("accepts valid UUID v4", () => {
    expect(isUuidV4("3d594650-3436-4f56-ae0b-8fcd5aa5c2d4")).toBe(true);
  });

  it("rejects invalid UUIDs", () => {
    expect(isUuidV4("not-a-uuid")).toBe(false);
    expect(isUuidV4("3d594650-3436-4f56-ae0b-8fcd5aa5c2d4-xyz")).toBe(false);
    expect(isUuidV4(undefined)).toBe(false);
  });

  it("acts as a type guard", () => {
    const value: unknown = "3d594650-3436-4f56-ae0b-8fcd5aa5c2d4";
    if (isUuidV4(value)) {
      // Here, TypeScript should treat `value` as string.
      expect(value.length).toBeGreaterThan(0);
    }
  });
});
```

## 6.5 `tests/algorithm/twoSum.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { twoSum } from "../../src/exercises/algorithm/twoSum";

describe("twoSum", () => {
  it("returns indices of a valid pair", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("returns null when no pair exists", () => {
    expect(twoSum([1, 2, 3], 999)).toBeNull();
  });

  it("does not reuse the same index", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });
});
```

## 6.6 `tests/algorithm/isPalindrome.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { isPalindrome } from "../../src/exercises/algorithm/isPalindrome";

describe("isPalindrome", () => {
  it("handles simple palindromes", () => {
    expect(isPalindrome("racecar")).toBe(true);
    expect(isPalindrome("RaceCar")).toBe(true);
  });

  it("ignores punctuation and spaces", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it("returns false for non-palindromes", () => {
    expect(isPalindrome("hello")).toBe(false);
  });
});
```

## 6.7 `tests/algorithm/groupBy.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { groupBy } from "../../src/exercises/algorithm/groupBy";

describe("groupBy", () => {
  it("groups items by a computed key", () => {
    const items = ["a", "bb", "ccc", "dd"];
    const grouped = groupBy(items, (s) => s.length);

    expect(grouped[1]).toEqual(["a"]);
    expect(grouped[2]).toEqual(["bb", "dd"]);
    expect(grouped[3]).toEqual(["ccc"]);
  });
});
```

## 6.8 `tests/algorithm/topKFrequent.test.ts`

```ts
import { describe, it, expect } from "vitest";
import { topKFrequent } from "../../src/exercises/algorithm/topKFrequent";

describe("topKFrequent", () => {
  it("returns k most frequent with alphabetical tie-break", () => {
    const words = ["i", "love", "ts", "i", "love", "coding", "ts", "ts"];
    expect(topKFrequent(words, 2)).toEqual(["ts", "i"]);
  });

  it("handles k=1", () => {
    expect(topKFrequent(["a", "b", "b"], 1)).toEqual(["b"]);
  });
});
```

---

# 7) Solution guidelines (how to approach each type of problem)

## 7.1 Narrowing `unknown`

When you receive `unknown`, always narrow it before use:

- `typeof value === "string"`
- `typeof value === "number"`
- `value === null` checks
- `Array.isArray(value)` for arrays

## 7.2 Prefer explicit return types for utilities

For public utility functions, explicitly type return values to improve readability and catch mistakes early.

## 7.3 Backend parsing patterns

- Treat inputs as **untrusted** (`unknown`)
- Normalize safely:
  - `.trim()`
  - `.toLowerCase()`
- Validate and throw `Error` early for invalid states

## 7.4 Algorithmic patterns

- Use `Map` for counting (`topKFrequent`) and O(n) lookups (`twoSum`)
- Avoid nested loops when a map can reduce complexity

---

# 8) Submission (async)

1. Push your branch: `week4-day3-exercises`
2. Ensure:
   - `npm run typecheck` passes
   - `npm test` passes
3. Submit your GitHub repo link or PR link in Moodle.
