import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 50;

const operations = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const resetGrid = () =>
  Array.from({ length: numRows }).map(() =>
    Array.from({ length: numCols }).fill(0),
  );

const seedGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return rows;
};

const countNeighbors = (grid: any, x: number, y: number) => {
  return operations.reduce((acc, [i, j]) => {
    const row = (x + i + numRows) % numRows;
    const col = (y + j + numCols) % numCols;
    acc += grid[row][col];
    return acc;
  }, 0);
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => resetGrid());

  const [running, setRunning] = useState(false);

  const runningRef = useRef(running);
  runningRef.current = running;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((currentGrid) =>
      produce(currentGrid, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let j = 0; j < numCols; j++) {
            const count = countNeighbors(currentGrid, i, j);
            if (currentGrid[i][j] === 1 && (count < 2 || count > 3))
              gridCopy[i][j] = 0;
            if (!currentGrid[i][j] && count === 3) gridCopy[i][j] = 1;
          }
        }
      }),
    );

    setTimeout(runSimulation, 500);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = !running;
          if (!running) {
            runSimulation();
          }
        }}
      >
        {!running ? 'Start' : 'Stop'}
      </button>
      <button
        onClick={() => {
          setGrid(resetGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setGrid(seedGrid());
        }}
      >
        Seed
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, rowIdx) =>
          rows.map((col, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[rowIdx][colIdx] = grid[rowIdx][colIdx] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[rowIdx][colIdx] ? '#003366' : '#eee',
                border: '1px solid black',
              }}
            />
          )),
        )}
      </div>
    </>
  );
};

export default App;
