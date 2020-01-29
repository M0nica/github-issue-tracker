[![Netlify Status](https://api.netlify.com/api/v1/badges/51d3788c-ed84-428b-a0f8-1903e12619f9/deploy-status)](https://app.netlify.com/sites/github-issue-tracker-mvp/deploys)
 
 # GitHub Issue Tracker


This application allows users to re-order their GitHub issues in the UI.

<img src="public/Screen%20Shot%202020-01-29%20at%206.34.53%20PM.png" width="400" alt="screenshot of application">
 
   
View app online at: https://github-issue-tracker-mvp.netlify.com/ 

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
- [ ] Fix bug 🐛 that doesn't allow issues to be re-ordered when in filtered view
- [ ] Add Footer

## Instructions for Developing

1. Install dependencies in the root with `yarn` .
2. Run development version of app locally at http://localhost:3000 with `yarn start`
3. Run `yarn test` to run unit tests

## Instructions for Deploying

- Run `yarn build` in order to create a production version of the application in the `/build` directory.
