# Deployment


## How to initialize Firebase Hosting
1. Open a console of your choice in the project's source folder

2. Install Firebase tools:
    ```bash 
    npm install -g firebase-tools

3. Log into Firebase through Google login: 
    ```bash 
    firebase login 

4. Follow the authentification process

5. <details>
    <summary> Initialize Firebase with the following mandatory settings:</summary>
    - ```bash 
      firebase init
    - Which features?
        Mark `Hosting´ with spacebar & press Enter
    - Project Setup 
        - Choose either an existing or a new project
        - Follow the process you're guided through
    - Hosting Setup
        - Set up automatic build & deploys with GitHub?
        ```bash 
        Y
        - Follow the steps guiding through GitHub-Authentication process
    - Set up the workflow to run a build script before every deploy?
        ```bash 
        Y
    - What script?
        ```bash 
        npm ci && npm run build
    - Choose either first or second auto-generated firebase-hosting-workflow
    - Revoke Authorization for the Firebase CLI through given link
</details>

6. Modify generated firebase-hosting-workflow

7. Done!


## Public App URL
