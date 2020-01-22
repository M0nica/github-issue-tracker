import React, { Component } from "react";

import "./App.css";

const bearer_token = process.env.REACT_APP_BEARER_TOKEN || "";
console.log("secret", bearer_token);
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
    this.state = { loading: false, repositories: null };
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
          loading: false
        })
      )
      .catch(console.error);
  };

  render() {
    const { loading, repositories } = this.state;

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
          {!bearer_token && (
            <p>Who are you?</p>
            // (
            //   <form onSubmit={this.handleSubmit}>
            //     <label>
            //       Name:
            //       <input
            //         type="text"
            //         value={this.state.value}
            //         onChange={this.handleChange}
            //       />
            //     </label>
            //     <input type="submit" value="Submit" />
            //   </form>
            // )
          )}
        </p>
        {bearer_token && (
          <div className="issues">
            {" "}
            {repositories &&
              repositories
                .map(repo => repo.issues.edges)
                .map(
                  issues =>
                    issues &&
                    issues.map((issue, index) => (
                      <div className="issueCard">
                        <p className="priority-number">Priority #{index + 1}</p>{" "}
                        <a href={issue.node.url}>
                          {" "}
                          <p className="issue-name">{issue.node.title} </p>
                        </a>{" "}
                        <p className="repo-name">
                          {" "}
                          from {issue.node.repository.name} repo
                        </p>
                      </div>
                    ))
                )}
          </div>
        )}
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
