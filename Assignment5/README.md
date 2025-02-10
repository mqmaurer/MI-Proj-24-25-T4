# Deployment


## How to initialize Firebase Hosting

1. Open a console of your choice in the project's source folder

2. Install Firebase tools
    ```bash 
    npm install -g firebase-tools

3. Log into Firebase through Google login 
    ```bash 
    firebase login 

4. Follow the authentification process

5. <details><summary> Initialize Hosting with the following mandatory settings</summary>

    1. Initialize firebase CLI   
        ```bash
        firebase init   
    2. Which features?    
        Mark `Hosting` with spacebar & press Enter
    3. Project Setup   
        - Choose either an existing or a new project   
        - Follow the process you're guided through   
    4. Hosting Setup    
        - Set up automatic build & deploys with GitHub?   
            ```bash 
            Y
        - Follow the steps guiding through GitHub-Authentication process   
        - Set up the workflow to run a build script before every deploy?  
            Note: We tested this setting with `Y` & `npm ci && npm run build`.
            Since they were not executed, we removed them.  
            ```bash 
            N
        - Choose either first or second auto-generated firebase-hosting-workflow   
    5. Revoke Authorization for the Firebase CLI through given link   

</details>

6. Modify generated firebase-hosting-workflow & push it to your repository's main-branch

7. <details><summary> Set up repository secrets</summary>

    1. Go to [Github](github.com) and navigate to the project's repository settings
    2. Go to `Secrets and variables` -> `Actions` -> `Secrets`
    3. Click `New repository secret`
    4. Fill in the `Name`-field with one of the variables below and the `Secret`-field with your matching firebaseConfig credentials. **No `" "` needed!**
        - FIREBASE_API_KEY
        - FIREBASE_APP_ID
        - FIREBASE_AUTH_DOMAIN
        - FIREBASE_MEASUREMENT_ID
        - FIREBASE_MESSAGING_SENDER_ID
        - FIREBASE_PROJECT_ID
        - FIREBASE_STORAGE_BUCKET
    5. Click `Add Secret`
    6. Repeat steps 3 - 5 until you've set up all 7 variables

    **Note: Don't delete the `FIREBASE_SERVICE_ACCOUNT_..._...` secret! This was auto created by Firebase during
    Hosting initialization and is mandatory for deployment purposes.**

</details>

8. Done!


## Public App URL

https://ibooks-bcb55.web.app