import React, { useState } from 'react';
import './App.css';

const numRows = 50;
const numCols = 50;

const App: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  });

  return (
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
  );
};

export default App;
