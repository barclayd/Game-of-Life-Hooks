# Conway's Game of Life

Conway's Game of Life simulation built using React.

Deployed [live!](https://barclayd.github.io/Game-of-Life-Hooks/)

#### Demo

<p align="center">
  <img alt="Screenshot" src='https://user-images.githubusercontent.com/39765499/69092417-3dda6c00-0a44-11ea-89c8-55257ad62ca1.gif'>
</p>

### Rules

1. A live cell with less than two live neighbours dies.

2. A live cell with two or three neighbours lives on to the next generation.

3. A live cell with more than tree neighbours dies.

4. A dead cell with exactly three neighbours is reborn and becomes a live cell.

More information about Conway's Game of Life can  be found [here](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

### Assumptions

* The board is an infinite amount of space (rather than an infinite grid) and therefore cells can travel further than the edges of the grid in a wrap-around world
* A coloured cell is a live cell
* A non-coloured cell is a dead cell

### How to Run

```shell script
$ git clone https://github.com/barclayd/Game-of-Life-Hooks.git
$ cd Game-of-Life-Hooks
$ npm run start
```

This will open localhost:3000, displaying the grid

### How to Play

* Bring a given cell to life by clicking on a dead cell within in a grid
* Kill a cell by clicking on a live cell
* Use the buttons to toggle whether to seed or clear the grid, start or stop the iteration of generations
