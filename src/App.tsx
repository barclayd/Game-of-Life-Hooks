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

const countNeighbors = (grid: any, x: number, y: number) => {
  const count = operations.reduce((acc, [i, j]) => {
    let row = (x + i + numRows) % numRows;
    let col = (y + j + numCols) % numCols;
    acc += grid[row][col];
    return acc;
  }, 0);
  console.log(count);
  return count;
};

const App: React.FC = () => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: numRows }).map(() =>
      Array.from({ length: numCols }).fill(0),
    ),
  );

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
            const count = countNeighbors(gridCopy, i, j);
            if (currentGrid[i][j] === 1 && (count < 2 || count > 3))
              gridCopy[i][j] = 0;
            if (!currentGrid[i][j] && count === 3) gridCopy[i][j] = 1;
          }
        }
      }),
    );

    setTimeout(runSimulation, 1000);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRunning(!running);
          runningRef.current = !running;
          runSimulation();
        }}
      >
        {!running ? 'Start' : 'Stop'}
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
