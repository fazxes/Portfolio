import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";

const source = await readFile(new URL("./github-stats.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.ES2022,
    target: ts.ScriptTarget.ES2022,
  },
});
const moduleUrl = `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`;
const { fetchGitHubStats } = await import(moduleUrl);

const baseResponses = new Map([
  ["https://api.github.com/users/fazxes", { public_repos: 2, followers: 3 }],
  [
    "https://api.github.com/users/fazxes/repos?per_page=100",
    [{ stargazers_count: 5 }, { stargazers_count: 7 }],
  ],
  ["https://api.github.com/orgs/Recusive", { public_repos: 4 }],
  [
    "https://api.github.com/orgs/Recusive/repos?per_page=100",
    [{ stargazers_count: 11 }],
  ],
]);

function responseFor(url) {
  assert.ok(baseResponses.has(url), `Unexpected GitHub request: ${url}`);
  return Promise.resolve(new Response(JSON.stringify(baseResponses.get(url))));
}

test("includes configured repositories in the live GitHub totals", async () => {
  const fxUrl = "https://api.github.com/repos/vercel-labs/fx";

  const stats = await fetchGitHubStats((url) => url === fxUrl
    ? Promise.resolve(new Response(JSON.stringify({ stargazers_count: 13 })))
    : responseFor(url));

  assert.deepEqual(stats, {
    stars: 36,
    repos: 7,
    followers: 3,
  });
});

test("preserves base stats when an extra repository request rejects", async () => {
  const stats = await fetchGitHubStats((url) => url.endsWith("/vercel-labs/fx")
    ? Promise.reject(new Error("network unavailable"))
    : responseFor(url));

  assert.deepEqual(stats, {
    stars: 23,
    repos: 6,
    followers: 3,
  });
});

test("preserves base stats when an extra repository is rate limited", async () => {
  const stats = await fetchGitHubStats((url) => url.endsWith("/vercel-labs/fx")
    ? Promise.resolve(new Response(JSON.stringify({ message: "rate limited" }), { status: 403 }))
    : responseFor(url));

  assert.deepEqual(stats, {
    stars: 23,
    repos: 6,
    followers: 3,
  });
});

test("preserves base stats when an extra repository payload is malformed", async () => {
  const stats = await fetchGitHubStats((url) => url.endsWith("/vercel-labs/fx")
    ? Promise.resolve(new Response(JSON.stringify({ stargazers_count: "many" })))
    : responseFor(url));

  assert.deepEqual(stats, {
    stars: 23,
    repos: 6,
    followers: 3,
  });
});
