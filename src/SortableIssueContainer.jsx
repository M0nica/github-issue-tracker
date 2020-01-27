import React, { Component } from "react";

import { sortableContainer } from "react-sortable-hoc";
import arrayMove from "array-move";
import { SortableIssues } from "./SortableIssues";

export class SortableIssueContainer extends Component {
  render() {
    const { issues } = this.props;

    const SortableIssuesContainer = sortableContainer(({ children }) => (
      <div className="issues">{children}</div>
    ));

    const onSortEnd = ({ oldIndex, newIndex }) =>
      this.setState({ issues: arrayMove(issues, oldIndex, newIndex) });

    return (
      <>
        <SortableIssuesContainer
          axis="y"
          onSortEnd={onSortEnd}
          className="issues"
        >
          <SortableIssues issues={issues} />
        </SortableIssuesContainer>
      </>
    );
  }
}

export default SortableIssueContainer;
