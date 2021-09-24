# TutCode
A website where you can read/watch tutorials and write code on the same page. Try it out at https://tutcode.netlify.app/.

All the relevant JavaScript code can be found at [src/index.js](main/src/js/index.js). 

#### Todo
Initially, Prism Live was used for syntax highlighting, but it was glitchy, so it's been removed. 
I'll have to find another way to highlight the code. 

## Screenshots
#### With Video
![](screenshot1.png)

#### With Article
![](screenshot2.png)

## Building a local version

1. Clone the repository

    ``` 
    git clone https://github.com/PROTechThor/TutCode.git
    ```
2. Enter the directory and install node modules
    ``` 
    cd TutCode
    npm install
    ```
3. Access the live server
    ``` 
    npm run start
    ```
    You should now find the server running at http://localhost:1234 
