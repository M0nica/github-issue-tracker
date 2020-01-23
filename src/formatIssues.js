export function formatIssues(repos) {
  return repos
    .map(repo => repo.issues.edges)
    .map(edges => edges)
    .map(node => node)
    .flat(1);
}
