import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const clickHandler = (x: number, y: number) => {
    console.log(x, y);
  };

  return (
    <div className={styles.container}>
      <div className={styles.base}>
        <div className={styles.boardShadow}>
          {board.map((row, y) =>
            row.map((color, x) => (
              <div className={styles.board} key={`${x}-${y}`} onClick={() => clickHandler(x, y)}>
                {color === 0 && <div className={styles.cells} />}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
};
export default Home;
//.計算値をたっくさん使うよ
//.計算値を使ってboardを作る
//.useeffect
//.再帰関数を使って広げて条件付けをして止める
