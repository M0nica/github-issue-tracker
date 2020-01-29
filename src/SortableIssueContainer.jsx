import React, { Component } from "react";

import { sortableContainer } from "react-sortable-hoc";

import { SortableIssues } from "./SortableIssues";

export class SortableIssueContainer extends Component {
  render() {
    const { issues } = this.props;

    const SortableIssuesContainer = sortableContainer(({ children }) => (
      <div className="issues">{children}</div>
    ));

    return (
      <>
        <SortableIssuesContainer
          axis="y"
          onSortEnd={this.props.onSortEnd}
          className="issues"
        >
          <SortableIssues issues={issues} />
        </SortableIssuesContainer>
      </>
    );
  }
}

export default SortableIssueContainer;
