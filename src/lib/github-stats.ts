const GITHUB_USER = "fazxes";
const GITHUB_ORG = "Recusive";
const GITHUB_REPOSITORIES = ["vercel-labs/fx"];

interface GitHubStats {
  stars: number;
  repos: number;
  followers: number;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface GitHubOrganization {
  public_repos: number;
}

interface GitHubRepository {
  stargazers_count: number;
}

type GitHubFetch = (url: string, init?: RequestInit) => Promise<Pick<Response, "json">>;

export async function fetchGitHubStats(request: GitHubFetch = fetch): Promise<GitHubStats> {
  const headers = { Accept: "application/vnd.github.v3+json" };

  const [[userRes, userReposRes, orgRes, orgReposRes], repositoryResponses] = await Promise.all([
    Promise.all([
      request(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      request(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100`, { headers }),
      request(`https://api.github.com/orgs/${GITHUB_ORG}`, { headers }),
      request(`https://api.github.com/orgs/${GITHUB_ORG}/repos?per_page=100`, { headers }),
    ]),
    Promise.all(GITHUB_REPOSITORIES.map(async (repository) =>
      request(`https://api.github.com/repos/${repository}`, { headers })
    )),
  ]);

  const user = await userRes.json() as GitHubUser;
  const userRepos = await userReposRes.json() as GitHubRepository[];
  const org = await orgRes.json() as GitHubOrganization;
  const orgRepos = await orgReposRes.json() as GitHubRepository[];
  const repositories = await Promise.all(repositoryResponses.map(async (response) =>
    await response.json() as GitHubRepository
  ));

  const userStars = userRepos.reduce((sum, repository) => sum + repository.stargazers_count, 0);
  const orgStars = orgRepos.reduce((sum, repository) => sum + repository.stargazers_count, 0);
  const repositoryStars = repositories.reduce(
    (sum, repository) => sum + repository.stargazers_count,
    0
  );

  return {
    stars: userStars + orgStars + repositoryStars,
    repos: user.public_repos + org.public_repos + repositories.length,
    followers: user.followers,
  };
}
