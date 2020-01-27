import React, { Component } from "react";

import "./App.css";

import LastSeen from "./RelativeTime";

import { sortableElement } from "react-sortable-hoc";

function formatDate(createdAt) {
  var d = new Date(createdAt),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}
export class SortableIssues extends Component {
  render() {
    const { issues } = this.props;

    const SortableIssue = sortableElement(({ issue, index }) => {
      const {
        title,
        repository,
        assignees,
        createdAt,
        lastEditedAt
      } = issue.node;

      return (
        <div className="issueCard">
          <div className="metaData">
            <p className="timestamp">{formatDate(createdAt)}</p>
            <p className="issueName">{title}</p>
            <LastSeen date={lastEditedAt ? lastEditedAt : createdAt} />
          </div>

          <div className="avatarContainer">
            <>
              {assignees.edges.length > 0 && (
                <img
                  className="avatar"
                  src={assignees.edges[0].node.avatarUrl}
                  alt={assignees.edges[0].node.name}
                />
              )}

              <p className="repo-name">{repository.name}</p>
            </>
          </div>
        </div>
      );
    });

    return (
      <>
        {issues.map((issue, index) => (
          <SortableIssue index={index} key={issue.node.title} issue={issue} />
        ))}
      </>
    );
  }
}
