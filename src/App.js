import React, { Component } from "react";
import { formatIssues } from "./formatIssues";
import "./App.css";

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
    this.state = {
      loading: false,
      repositories: null,
      issues: [],
      bearer_token: "" //process.env.REACT_APP_BEARER_TOKEN //|| ""
    };

    // fetch(url, getOptions(process.env.REACT_APP_BEARER_TOKEN))
    //   .then(res => res.json())
    //   .then(({ data }) =>
    //     this.setState({
    //       repositories: data.viewer.repositories.nodes,
    //       loading: false,
    //       issues: formatIssues(data.viewer.repositories.nodes),
    //       bearer_token: process.env.REACT_APP_BEARER_TOKEN
    //     })
    //   )
    //   .catch(console.error);
  }

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
  };

  render() {
    const { issues, bearer_token } = this.state;
    const hasBearerToken = Boolean(bearer_token);

    return (
      <>
        {!hasBearerToken && (
          <>
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
          </>
        )}

        <div className="App">
          <div className="repositories">
            {issues.length > 0 && (
              <>
                {" "}
                <h2>Repositories</h2>
                {issues
                  .reduce((unique, issue) => {
                    return unique.includes(issue.node.repository.name)
                      ? unique
                      : [...unique, issue.node.repository.name];
                  }, [])
                  .map(issue => (
                    <div>{issue}</div>
                  ))}
              </>
            )}
          </div>
          <SortableIssueContainer issues={issues} />
        </div>
      </>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>GitHub Issue Tracker</h1>
          <HomePage />
        </header>
      </div>
    );
  }
}

export default App;
