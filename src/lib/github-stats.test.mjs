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

test("includes configured repositories in the live GitHub totals", async () => {
  const responses = new Map([
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
    ["https://api.github.com/repos/vercel-labs/fx", { stargazers_count: 13 }],
  ]);

  const stats = await fetchGitHubStats((url) => {
    assert.ok(responses.has(url), `Unexpected GitHub request: ${url}`);
    return Promise.resolve(new Response(JSON.stringify(responses.get(url))));
  });

  assert.deepEqual(stats, {
    stars: 36,
    repos: 7,
    followers: 3,
  });
});
