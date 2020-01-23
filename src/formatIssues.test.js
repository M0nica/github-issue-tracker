import { formatIssues } from "./formatIssues";

describe("formatIssues", () => {
  it("should return empty array if there are no issues", () => {
    const reposWithNoIssues = [
      {
        name: "gatsby-starter-tyra",
        issues: {
          edges: []
        }
      }
    ];
    expect(formatIssues(reposWithNoIssues)).toStrictEqual([]);
  });
  it("should return array with two issues if there are two issues", () => {
    const reposWithTwoIssues = [
      {
        name: "gatsby-starter-tyra",
        issues: {
          edges: []
        }
      },
      {
        name: "monica-dev-blog",
        issues: {
          edges: [
            {
              node: {
                createdAt: "2019-03-19T12:36:32Z",
                title: "Fix formatting in articles that did not transfer well",
                url: "https://github.com/M0nica/monica-dev-blog/issues/5",
                repository: {
                  name: "monica-dev-blog"
                }
              }
            },
            {
              node: {
                createdAt: "2019-03-19T12:37:39Z",
                title: "Create blog post about git hooks",
                url: "https://github.com/M0nica/monica-dev-blog/issues/7",
                repository: {
                  name: "monica-dev-blog"
                }
              }
            }
          ]
        }
      }
    ];
    expect(formatIssues(reposWithTwoIssues)).toStrictEqual([
      {
        node: {
          createdAt: "2019-03-19T12:36:32Z",
          repository: { name: "monica-dev-blog" },
          title: "Fix formatting in articles that did not transfer well",
          url: "https://github.com/M0nica/monica-dev-blog/issues/5"
        }
      },
      {
        node: {
          createdAt: "2019-03-19T12:37:39Z",
          repository: { name: "monica-dev-blog" },
          title: "Create blog post about git hooks",
          url: "https://github.com/M0nica/monica-dev-blog/issues/7"
        }
      }
    ]);
  });
});
