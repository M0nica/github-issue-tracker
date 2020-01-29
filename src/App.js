import React, { Component } from "react";
import { formatIssues } from "./formatIssues";
import "./App.css";
import arrayMove from "array-move";

import { SortableIssueContainer } from "./SortableIssueContainer";

const query = `
  query {
  viewer {
    repositories(last: 50) {
      totalCount
      nodes {
        name
        issues(states: [OPEN, CLOSED], last: 10) {
          edges {
            node {
              createdAt
              lastEditedAt
              title
              url
              repository {
                name
              }
              assignees(first: 2) {
                edges {
                  node {
                    id
                    name
                    avatarUrl
                  }
                }
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
       
`;
const url = "https://api.github.com/graphql";

function getOptions(bearer_token) {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer_token}`
    },
    body: JSON.stringify({ query })
  };
}

export class HomePage extends Component {
  constructor(props) {
    super(props);
    const localIssues =
      typeof window !== undefined &&
      JSON.parse(window.localStorage.getItem("issues"));

    const sortedIssues =
      typeof window !== undefined &&
      JSON.parse(window.localStorage.getItem("sortedIssues"));

    const localSelectedRepos =
      typeof window !== undefined &&
      JSON.parse(window.localStorage.getItem("selectedRepo"));

    const localRepos =
      typeof window !== undefined &&
      JSON.parse(window.localStorage.getItem("repositories"));

    this.state = {
      loading: false,
      repositories: localRepos || null,
      issues: localIssues || [],
      sortedIssues: sortedIssues || [],
      selectedRepo: localSelectedRepos || "",
      bearer_token: ""
    };
  }

  handleClick = repo => {
    if (this.state.selectedRepo !== repo) {
      this.setState({ selectedRepo: repo });
      window.localStorage.setItem("repo", JSON.stringify(repo));
    }
  };

  handleInputChange = event => {
    const bearer_token = event.target.value;
    event.preventDefault();

    fetch(url, getOptions(bearer_token))
      .then(res => res.json())
      .then(({ data }) =>
        this.setState({
          repositories: data.viewer.repositories.nodes,
          loading: false,
          issues: formatIssues(data.viewer.repositories.nodes),
          bearer_token
        })
      )
      .catch(console.error);

    window.localStorage.setItem("issues", JSON.stringify(this.state.issues));
    window.localStorage.setItem(
      "repositories",
      JSON.stringify(this.state.repositories)
    );
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    window.localStorage.setItem("issues", JSON.stringify(this.state.issues));
    this.setState(({ issues }) => ({
      issues: arrayMove(
        this.state.selectedRepo
          ? issues.filter(issue => {
              return issue.node.repository.name === this.state.selectedRepo;
            })
          : issues,
        oldIndex,
        newIndex
      )
    }));

    window.localStorage.setItem(
      "sortedIssues",
      JSON.stringify(this.state.sortedIssues)
    );
  };

  render() {
    const { issues, bearer_token, selectedRepo, sortedIssues } = this.state;
    const hasBearerToken = Boolean(bearer_token);
    const hasSortedIssues = Boolean(issues.length > 0);
    const showAuthScreen = !hasBearerToken && !hasSortedIssues;

  
    return (
      <>
        <div className="App">
          {showAuthScreen && (
            <div className="authScreen">
              <p>
                Please enter your GitHub API Key below in order to view and sort
                your GitHub issues. Note: only read-level access is required.
              </p>
              <input
                type="text"
                aria-label="input for Github API key"
                placeholder=""
                onChange={this.handleInputChange}
              />
            </div>
          )}

          {(issues || sortedIssues).length > 0 && (
            <div className="repositoriesColumn">
              {" "}
              <h1>GitHub Issue Tracker</h1>
              <h2>Filter By Repository</h2>

              {issues
                .reduce((unique, issue) => {
                  return unique.includes(issue.node.repository.name)
                    ? unique
                    : [...unique, issue.node.repository.name];
                }, [])
                .map((repo, index) => (
                  <div onClick={() => this.handleClick(repo)} key={index}>
                    {repo}
                  </div>
                ))}
              {selectedRepo !== "" && (
                <div onClick={() => this.handleClick("")}>view all</div>
              )}
            </div>
          )}

          {issues.length > 0 && (
            <div className="issuesColumn">
              <h2>
                {selectedRepo
                  ? `Viewing issues for ${selectedRepo}`
                  : "Viewing all issues"}
              </h2>
              <SortableIssueContainer
                onSortEnd={this.onSortEnd}
                issues={
                  selectedRepo
                    ? issues.filter(issue => {
                        return issue.node.repository.name === selectedRepo;
                      })
                    : issues
                }
              />
            </div>
          )}
        </div>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

export default App;
