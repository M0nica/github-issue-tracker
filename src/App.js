import React, { Component } from "react";
import { formatIssues } from "./formatIssues";
import "./App.css";
import arrayMove from "array-move";
import {
  localRepos,
  localSelectedRepos,
  localIssues,
  sortedIssues,
  setLocalRepositories,
  setLocalIssues,
  setLocalSortedIssues,
  setLocalSelectedRepositories
} from "./localStorage";

import { SortableIssueContainer } from "./SortableIssueContainer";

const query = `
  query {
  viewer {
    repositories(last: 100) {
      totalCount
      nodes {
        name
        issues(states: [OPEN], last: 100) {
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

    this.state = {
      loading: false,
      repositories: localRepos || null,
      issues: localIssues || [],
      sortedIssues: sortedIssues || [],
      selectedRepo: localSelectedRepos || "",
      bearer_token: "",
      error: []
    };
  }

  handleClick = repo => {
    if (this.state.selectedRepo !== repo) {
      this.setState({ selectedRepo: repo });
      setLocalSelectedRepositories(repo);
      setLocalIssues(this.state.issues);
      setLocalSortedIssues(this.state.sortedIssues);
      setLocalRepositories(this.state.repositories);
    }
  };

  handleInputChange = event => {
    const bearer_token = event.target.value;
    event.preventDefault();

    fetch(url, getOptions(bearer_token))
      .then(res => res.json())
      .then(({ data }) =>
        this.setState({
          repositories: data.viewer.repositories.nodes || [],
          loading: false,
          issues: formatIssues(data.viewer.repositories.nodes || []),
          bearer_token
        })
      )
      .catch(error => this.setState({ error: error }));

    setLocalIssues(this.state.issues);
    setLocalRepositories(this.state.repositories);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ issues }) => ({
      issues: arrayMove(issues, oldIndex, newIndex),
      sortedIssues: arrayMove(
        this.state.selectedRepo
          ? issues.filter(issue => {
              return issue.node.repository.name === this.state.selectedRepo;
            })
          : issues,
        oldIndex,
        newIndex
      )
    }));

    setLocalIssues(this.state.issues);
    setLocalSortedIssues(this.state.sortedIssues);
    setLocalRepositories(this.state.repositories);
  };

  render() {
    const {
      issues,
      bearer_token,
      selectedRepo,
      sortedIssues,
      error
    } = this.state;
    const hasBearerToken = Boolean(bearer_token);
    const hasSortedIssues = Boolean(issues.length > 0);
    const showAuthScreen = !hasBearerToken && !hasSortedIssues;

    return (
      <>
        <div className="App">
          {(showAuthScreen || error.length > 0) && (
            <div className="authScreen">
              <h1>GitHub Issue Tracker</h1>

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
              {error.length > 0 && (
                <p>
                  Something went wrong. Please try with a different API key.
                </p>
              )}
            </div>
          )}

          {hasBearerToken && issues.length === 0 && (
            <p>Sorry no issues were found for that key</p>
          )}
          {(issues || sortedIssues).length > 0 && (
            <div className="repositoriesColumn">
              {" "}
              <h1>GitHub Issue Tracker</h1>
              <h2>Filter By Repository</h2>
              {selectedRepo !== "" && (
                <div
                  onClick={() => this.handleClick("")}
                  className="repo-label"
                >
                  view all
                </div>
              )}
              {issues
                .reduce((unique, issue) => {
                  console.log("ISSUES", issue);
                  return unique.includes(issue.node.repository.name)
                    ? unique
                    : [...unique, issue.node.repository.name];
                }, [])
                .map((repo, index) => (
                  <div
                    onClick={() => this.handleClick(repo)}
                    key={index}
                    className="repo-label"
                  >
                    {repo}
                  </div>
                ))}
            </div>
          )}
          {issues.length > 0 && (
            <div className="issuesColumn">
              <h2>
                {selectedRepo
                  ? `Issues for ${selectedRepo}`
                  : "Issues for all repos"}
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
      <div className="page">
        <HomePage />
        <br />
        <a
          className="githubLink"
          href="https://github.com/M0nica/github-issue-tracker/"
        >
          view source on GitHub
        </a>
      </div>
    );
  }
}

export default App;
