# Minimax.js
A tic-tac-toe AI written to demonstrate the minimax algorithm.

Front end code is adapted from an old college lab implementing a two-player
tic-tac-toe game. The files in this repository fulfill the following 
functions:

- index.html contains the game page layout 
- main.css contains stylesheet information
- main.js is the app controller, which adds event handlers, instatiates the 
  game board and handles user interaction
- minimax.js models the board and game AI 

To build the Docker container, install Docker on your computer and run the 
following demands from within the source folder:

```
docker build -t web .
```

To run the docker countainer once built, forwarding port 80 to local port
8080:

```
docker run -p 8080:80 web
```
