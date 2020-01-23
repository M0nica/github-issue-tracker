import React, { Component } from "react";
import { formatIssues } from "./formatIssues";
import "./App.css";

import { sortableContainer, sortableElement } from "react-sortable-hoc";
import arrayMove from "array-move";

const bearer_token = process.env.REACT_APP_BEARER_TOKEN || "";

var bearer = "Bearer " + bearer_token;

const query = `
  query{
  viewer {
    repositories(last: 50) {
      totalCount
      nodes {
      
        name
        issues(states: [OPEN], last: 10) {
            edges {
              node {
                createdAt
                title
                url
                repository {
                  name
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
const opts = {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: bearer },
  body: JSON.stringify({ query })
};

class GitHubAPICall extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, repositories: null, issues: [] };
  }

  handleSubmit = api => e => {
    this.setState({ bearer_token: e.value });
  };

  handleClick = api => e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch(url, opts)
      .then(res => res.json())
      .then(({ data }) =>
        this.setState({
          repositories: data.viewer.repositories.nodes,
          loading: false,
          issues: formatIssues(data.viewer.repositories.nodes)
        })
      )
      .catch(console.error);
  };

  render() {
    const { loading, repositories, issues } = this.state;

    const SortableIssuesContainer = sortableContainer(({ children }) => (
      <div className="gifs">{children}</div>
    ));

    const onSortEnd = ({ oldIndex, newIndex }) =>
      this.setState({ issues: arrayMove(issues, oldIndex, newIndex) });

    const SortableIssue = sortableElement(({ issue, index }) => (
      <div className="issueCard">
        <p className="issueName">{issue.node.title}</p>
        <p className="repo-name">{issue.node.repository.name}</p>
      </div>
    ));

    return (
      <>
        <p>
          {bearer_token && !repositories && (
            <button
              onClick={this.handleClick("generate-lorem-ipsum")}
              className="button"
            >
              {loading ? "Loading..." : "Get GitHub Issues"}
            </button>
          )}{" "}
          {!bearer_token && <p>Who are you?</p>}
        </p>
        <div className="App">
          <SortableIssuesContainer
            axis="y"
            onSortEnd={onSortEnd}
            className="issues"
          >
            {issues.map((issue, index) => (
              <SortableIssue
                index={index}
                key={issue.node.title}
                issue={issue}
              />
            ))}
          </SortableIssuesContainer>
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
          <GitHubAPICall />
        </header>
      </div>
    );
  }
}

export default App;
