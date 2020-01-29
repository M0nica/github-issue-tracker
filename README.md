# GitHub Issue Tracker

This application allows users to re-order their GitHub issues in the UI.

## Current Functionality

- Allows users to view their GitHub issues after providing their GitHub API Key
- Allows users to re-order their GitHub issues in UI (when viewing all issues)
- Allows users to filter by repository when viewing issues
- Uses Local Storage to persist issues and their ordered state (in unfiltered view)

## Future Functionality to Implement

- [ ] Increase test coverage
  - [ ] i.e., mock fetch
- [ ] Make application look prettier 💅
- [ ] Modularize code more into more composable files
- [ ] Add server-side rendering to improve SEO and have better performance
- [ ] Create proper authorization flow that doesn’t require user providing their API Key in plain text
- [ ] Fix bug 🐛 that sometimes doesn't allow issues to be re-ordered when in filtered view
- [ ] Improve error handling when provided with an invalid GitHub API key

## Instructions for Developing

1. Install dependencies in the root with `yarn` .
2. Run development version of app locally at http://localhost:3000 with `yarn start`
3. Run `yarn test` to run unit tests

## Instructions for Deploying

- Run `yarn build` in order to create a production version of the application in the `/build` directory.
