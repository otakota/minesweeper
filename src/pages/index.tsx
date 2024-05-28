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
    // 初回かどうか
    if (!bombMap.flat().includes(1)) {
      newBombMap[y][x] = 1;
      // 最初に置いとく
      const setUpBombMap = () => {
        newBombMap[y][x] = 1;
        while (newBombMap.flat().filter((cell) => cell === 1).length < 10 + 1) {
          const nx = Math.floor(Math.random() * 9);
          const ny = Math.floor(Math.random() * 9);
          newBombMap[ny][nx] = 1;
        }
        newBombMap[y][x] = 0;
      };
      setUpBombMap();
      setBombMap(newBombMap);
    }
    const userInput = inputBoard[y][x];
    if (userInput === 0) {
      newInputBoard[y][x] = 1;
      setInputBoard(newInputBoard);
    }
  };

  const checkAround = (x: number, y: number) => {
    //一旦directionで書き直してみよ
    // const directions = [
    //   [-1, -1],
    //   [-1, 0],
    //   [-1, 1],
    //   [0, 1],
    //   [1, 1],
    //   [1, 0],
    //   [1, -1],
    //   [0, -1],
    // ];
    // let bombCount = 0;
    // for (const direction of directions){
    //   if (bombMap[y + direction[0]] !== undefined && bombMap[y + direction[0]][x +direction[1]] === 1){
    //     bombCount++
    //   }
    //   if(bombCount == 0){
    //     checkAround(y+direction[0],x+direction[1])
    //   }
    //   continue
    // }

    board[y][x] = [-1, 0, 1]
      .map((dx) =>
        [-1, 0, 1].map((dy) => bombMap[y + dy] !== undefined && bombMap[y + dy][x + dx] === 1),
      )
      .flat()
      .filter(Boolean).length;
    if (board[y][x] === 0) {
      [-1, 0, 1].forEach((dx) =>
        [-1, 0, 1].forEach((dy) => {
          if (board[y + dy]?.[x + dx] === -1) {
            checkAround(x + dx, y + dy);
          }
        }),
      );
    }
  };

  inputBoard.forEach((row, j) =>
    row.forEach((inputBoard, i) => {
      if (inputBoard === 1) {
        checkAround(i, j);
      }
    }),
  );

  const handleLeftClick = (x: number, y: number) => {
    console.log(y, x);
    setBomb(y, x);
    checkAround(y, x);
  };

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.boardShadow}>
          <div className={styles.board}>
            {board.map((row, y) =>
              row.map((color, x) => (
                <div
                  className={styles.cells}
                  key={`${x}-${y}`}
                  onClick={() => handleLeftClick(x, y)}
                >
                  {board[y][x] === 10 || board[y][x] === -1 || board[y][x] === 9 ? (
                    <div className={styles.stone}>
                      <div
                        className={styles.number}
                        style={{ backgroundPositionX: `${(100 / 13) * (board[y][x] - 1)}%` }}
                      />
                    </div>
                  ) : (
                    bombMap[y][x] !== 1 && (
                      <div
                        className={styles.number}
                        style={{ backgroundPositionX: `${(100 / 13) * (board[y][x] - 1)}%` }}
                      />
                    )
                  )}
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
