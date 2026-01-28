import React, { useState } from 'react';

const MAX_TURNS = 10;

const GuessNumber: React.FC = () => {
  const [targetNumber] = useState<number>(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [turns, setTurns] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  const handleGuess = () => {
    if (gameOver) return;

    const num = Number(guess);
    if (isNaN(num) || num < 1 || num > 100) {
      setMessage('Vui lòng nhập số từ 1 đến 100');
      return;
    }

    const newTurns = turns + 1;
    setTurns(newTurns);

    if (num < targetNumber) {
      setMessage('Bạn đoán quá thấp!');
    } else if (num > targetNumber) {
      setMessage('Bạn đoán quá cao!');
    } else {
      setMessage('🎉 Chúc mừng! Bạn đã đoán đúng!');
      setGameOver(true);
      return;
    }

    if (newTurns >= MAX_TURNS) {
      setMessage(`Bạn đã hết lượt! Số đúng là ${targetNumber}`);
      setGameOver(true);
    }


  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Trò chơi đoán số</h2>
      <p>Đoán số từ 1 đến 100 (Tối đa 10 lượt)</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
      />

      <button onClick={handleGuess} disabled={gameOver}>
        Đoán
      </button>

      <p>Lượt đã dùng: {turns}/{MAX_TURNS}</p>
      <p>{message}</p>
      <button onClick={() => {
        setGuess('');
        setMessage('');
        setTurns(0);
        setGameOver(false);
      }}>Chơi lại</button>
    </div>
  );
};

export default GuessNumber;
