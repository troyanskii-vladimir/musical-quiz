import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketHandlersEmit, SocketHandlersOn } from '../../../config';
import { Question } from '../../../types/game-data';
import './game-round.scss';
import GameQuestion from './game-question/game-question';

type GameRoundProps = {
  socket: Socket,
  question: Question,
  gameId: string,
};

export default function GameRound({ socket, question, gameId }: GameRoundProps) {
  const [roundTime, setRoundTime] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  useEffect(() => {
    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setRoundTime(time);
    });

    return () => {
      socket.off(SocketHandlersOn.CountDown);
    };
  }, [socket]);


  const onAnswerClick = (answer: string) => {
    const data = {
      gameId,
      answer,
    };

    socket.emit(SocketHandlersEmit.Answer, data, () => {
      setIsAnswered(true);
    });
  }


  return (
    <div className='cont-5'>
      <audio src={question.trackUrl} autoPlay></audio>
      <div className='counter-5'>
        <span>{roundTime}</span>
      </div>

      <p className='question-5'>
        <span>{question.question}</span>
      </p>

      <ul className="answer-list">
        {question.answers.map((answer, i) => (
          <li className="answer-item" key={answer + i}>
            <GameQuestion answer={answer} isAnswered={isAnswered} onAnswerClick={onAnswerClick} />
          </li>
        ))}
      </ul>
    </div>
  );
}
