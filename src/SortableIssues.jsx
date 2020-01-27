import React, { Component } from "react";

import "./App.css";

import { sortableElement } from "react-sortable-hoc";

export class SortableIssues extends Component {
  render() {
    const { issues } = this.props;

    const SortableIssue = sortableElement(({ issue, index }) => (
      <div className="issueCard">
        <p className="issueName">{issue.node.title}</p>
        <p className="repo-name">{issue.node.repository.name}</p>
      </div>
    ));

    return (
      <>
        {issues.map((issue, index) => (
          <SortableIssue index={index} key={issue.node.title} issue={issue} />
        ))}
      </>
    );
  }
}
