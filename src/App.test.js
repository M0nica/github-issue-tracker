import React from "react";
import { HomePage } from "./App";
import { mount } from "enzyme";
import { SortableIssueContainer } from "./SortableIssueContainer";

describe("displays prompt to enter bearer token if bearer_token is not available", () => {
  const wrapper = mount(<HomePage />);
  wrapper.setState({
    bearer_token: ""
  });
  test("displays text asking for GitHub API Key ", () => {
    expect(wrapper.find("p").text()).toEqual(
      "Please enter your GitHub API Key below in order to view and sort your GitHub issues. Note: only read-level access is required."
    );
  });
  test("displays input for entering GitHub API Key ", () => {
    expect(wrapper.find("input").length).toEqual(1);
  });
});

describe("does not display prompt to enter bearer token if bearer_token is available", () => {
  const wrapper = mount(<HomePage />);
  wrapper.setState({
    bearer_token: "asdf"
  });
  test("displays text asking for GitHub API Key ", () => {
    expect(wrapper.find("p")).not.toBe(true);
  });
  test("displays input for entering GitHub API Key ", () => {
    expect(wrapper.find("input").length).not.toEqual(1);
  });
});

describe("displaying sortableIssuesContainer", () => {
  const wrapper = mount(<HomePage />);
  const mockIssues = [
    {
      node: {
        createdAt: "2019-03-19T12:36:32Z",
        repository: { name: "monica-dev-blog" },
        title: "Fix formatting in articles that did not transfer well",
        url: "https://github.com/M0nica/monica-dev-blog/issues/5",
        assignees: { edges: [] }
      }
    },
    {
      node: {
        createdAt: "2019-03-19T12:37:39Z",
        repository: { name: "monica-dev-blog" },
        title: "Create blog post about git hooks",
        url: "https://github.com/M0nica/monica-dev-blog/issues/7",
        assignees: { edges: [] }
      }
    }
  ];

  wrapper.setState({
    issues: mockIssues
  });
  test("render sortableIssueContainer with issues", () => {
    expect(wrapper.find(SortableIssueContainer).length).toEqual(1);
    expect(wrapper.find(SortableIssueContainer).prop("issues")).toEqual(
      mockIssues
    );
  });
});
