### Deployment

## Process of Initializing
1. Open a console of your choice in the project's source folder
2. Run `npm install -g firebase-tools´
3. Run `firebase login´ & follow the steps to log into google
4. Run `firebase init´ with the following settings:
- Which features? 
-> Mark `Hosting´ with spacebar & press Enter
- Project Setup 
-> Choose either an existing or a new project, follow the process you're guided through
- Hosting Setup 
-> Set up automatic build & deploys with GitHub - `Yes´, then follow the steps guiding through GitHub-Authentication process
-> Set up the workflow to run a build script before every deploy? - `Yes´ 
-> What script? `npm ci && npm run build´
-> Select `No´ 2 times
-> Revoke Authorization for the Firebase CLI through given link
Done!

## Public App URL
