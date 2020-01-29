export const localIssues =
  typeof window !== undefined &&
  JSON.parse(window.localStorage.getItem("issues"));

export const sortedIssues =
  typeof window !== undefined &&
  JSON.parse(window.localStorage.getItem("sortedIssues"));

export const localSelectedRepos =
  typeof window !== undefined &&
  JSON.parse(window.localStorage.getItem("selectedRepo"));

export const localRepos =
  typeof window !== undefined &&
  JSON.parse(window.localStorage.getItem("repositories"));

export function setLocalRepositories(repo) {
  window.localStorage.setItem("repositories", JSON.stringify(repo));
}
export function setLocalSelectedRepositories(repo) {
  window.localStorage.setItem("selectedRepo", JSON.stringify(repo));
}
export function setLocalIssues(issues) {
  window.localStorage.setItem("issues", JSON.stringify(issues));
}
export function setLocalSortedIssues(sortedIssues) {
  window.localStorage.setItem("sortedIssues", JSON.stringify(sortedIssues));
}
