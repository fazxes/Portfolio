const GITHUB_USER = "fazxes";
const GITHUB_ORG = "Recusive";
const GITHUB_REPOSITORIES = ["vercel-labs/fx"];

interface GitHubStats {
  stars: number;
  repos: number;
  followers: number;
}

type GitHubResponse = Pick<Response, "json" | "ok" | "status">;
type GitHubFetch = (url: string, init?: RequestInit) => Promise<GitHubResponse>;

async function readJson(response: GitHubResponse, source: string): Promise<unknown> {
  if (!response.ok) {
    throw new Error(`GitHub request failed for ${source}: ${String(response.status)}`);
  }

  return await response.json() as unknown;
}

function readCount(value: unknown, field: string, source: string): number {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`Invalid GitHub payload for ${source}`);
  }

  const count = (value as Record<string, unknown>)[field];
  if (typeof count !== "number" || !Number.isSafeInteger(count) || count < 0) {
    throw new Error(`Invalid ${field} in GitHub payload for ${source}`);
  }

  return count;
}

function sumRepositoryStars(value: unknown, source: string): number {
  if (!Array.isArray(value)) {
    throw new Error(`Invalid GitHub repository list for ${source}`);
  }

  return value.reduce<number>(
    (sum, repository, index) =>
      sum + readCount(repository, "stargazers_count", `${source}[${String(index)}]`),
    0
  );
}

export async function fetchGitHubStats(request: GitHubFetch = fetch): Promise<GitHubStats> {
  const headers = { Accept: "application/vnd.github.v3+json" };

  const [[userRes, userReposRes, orgRes, orgReposRes], repositoryResults] = await Promise.all([
    Promise.all([
      request(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      request(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { headers }),
      request(`https://api.github.com/orgs/${GITHUB_ORG}`, { headers }),
      request(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100`, { headers }),
    ]),
    Promise.allSettled(
      GITHUB_REPOSITORIES.map(async (repository) => {
        const response = await request(`https://api.github.com/repos/${repository}`, { headers });
        const payload = await readJson(response, repository);
        return readCount(payload, "stargazers_count", repository);
      })
    ),
  ]);

  const [user, userRepos, org, orgRepos] = await Promise.all([
    readJson(userRes, GITHUB_USER),
    readJson(userReposRes, `${GITHUB_USER} repositories`),
    readJson(orgRes, GITHUB_ORG),
    readJson(orgReposRes, `${GITHUB_ORG} repositories`),
  ]);

  const userStars = sumRepositoryStars(userRepos, `${GITHUB_USER} repositories`);
  const orgStars = sumRepositoryStars(orgRepos, `${GITHUB_ORG} repositories`);
  const repositoryStars = repositoryResults.reduce(
    (sum, result) => sum + (result.status === "fulfilled" ? result.value : 0),
    0
  );
  const repositoryCount = repositoryResults.filter(
    (result) => result.status === "fulfilled"
  ).length;

  return {
    stars: userStars + orgStars + repositoryStars,
    repos:
      readCount(user, "public_repos", GITHUB_USER) +
      readCount(org, "public_repos", GITHUB_ORG) +
      repositoryCount,
    followers: readCount(user, "followers", GITHUB_USER),
  };
}
