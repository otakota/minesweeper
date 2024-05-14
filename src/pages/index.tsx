import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const board = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  const zeroBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const [inputBoard, setInputBoard] = useState(zeroBoard);
  const [bombMap, setBombMap] = useState(zeroBoard);
  const newBombMap = structuredClone(bombMap);
  const newInputBoard = structuredClone(inputBoard);

  const setBomb = (x: number, y: number) => {
    if (!bombMap.flat().includes(1)) {
      newBombMap[y][x] = 1;
      for (let i = 0; i < 11; i++) {
        const nx = Math.floor(Math.random()) * 10;
        const ny = Math.floor(Math.random()) * 10;
        newBombMap[ny][nx] = 1;
        newBombMap[y][x] = 0;
        setBombMap(newBombMap);
      }
    }

    const userInput = inputBoard[y][x];
    if (userInput === 0) {
      newInputBoard[y][x] = 1;
      setInputBoard(newInputBoard);
    }
  };

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  const check = (x: number, y: number) => {
    const count = 0;
    for (const direction of directions) {
      if (
        bombMap[y + direction[0]][x + direction[1]] === 1 &&
        bombMap[y + direction[0]] !== undefined
      ) {
        count + 1;
      }
    }
    board[y][x] = count;
  };

  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
  };

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.boardShadow}>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((color, x) => (
                <div className={styles.cells} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
                  {
                    <div
                      className={styles.number}
                      // style={{ backgroundPositionX: `${-30 * }` }}
                    />
                  }
                </div>
              )),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
//onchange
