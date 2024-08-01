import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketHandlersEmit, SocketHandlersOn } from '../../../config';
import { Question } from '../../../types/game-data';

type GameRoundProps = {
  socket: Socket;
  gameId: string;
};

export default function GameRound({ socket, gameId }: GameRoundProps) {
  const [question, setQuestion] = useState<Question>();
  const [roundTime, setRoundTime] = useState<number>(0);

  useEffect(() => {
    socket.on(SocketHandlersOn.ReadyRound, (questionData: Question) => {
      setQuestion(questionData);
    });

    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setRoundTime(time);
    });

    return () => {
      socket.off(SocketHandlersOn.ReadyRound);
      socket.off(SocketHandlersOn.CountDown);
    };
  }, []);

  const handleAnswerClick = () => {
    const data = {
      gameId,
      answer: question?.answers[0],
    };

    socket.emit(SocketHandlersEmit.Answer, data, (res) => {
      console.log(res);
    });
  };

  return (
    <div>
      <p>
        it
        <span>Вопрос: </span>
        <span>{question?.question}</span>
      </p>

      <ul className="answer-list">
        {question?.answers.map((answer, i) => (
          <li className="answer-item" key={answer + i}>
            <button className="answer-btn" onClick={}>
              {answer}
            </button>
          </li>
        ))}
      </ul>

      <div>
        <p>Осталось времени: {roundTime}</p>
      </div>
    </div>
  );
}
