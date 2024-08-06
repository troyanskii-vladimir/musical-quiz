import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { SocketHandlersEmit, SocketHandlersOn } from '../../../config';
import { Question, QuestionAnswersData, QuestionResultData } from '../../../types/game-data';
import styles from './game-round.module.scss';
import GameQuestion from './game-question/game-question';
import { SocketEndRoundRes } from '../../../types/socket-data';

type GameRoundProps = {
  socket: Socket,
  question: Question,
  gameId: string,
};

export default function GameRound({ socket, question, gameId }: GameRoundProps) {
  //Стейт компонента
  const [roundTime, setRoundTime] = useState<number>(0);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  //Стейт ответа
  const [isResultReady, setIsResultReady] = useState<boolean>(false);
  const [questionResult, setQuestionResult] = useState<QuestionResultData>({} as QuestionResultData);
  const [answersResult, setAnswersResult] = useState<[string, QuestionAnswersData][]>([]);


  useEffect(() => {
    socket.on(SocketHandlersOn.CountDown, (time: number) => {
      setRoundTime(time);
    });

    socket.on(SocketHandlersOn.EndRound, (data: SocketEndRoundRes) => {
      setIsResultReady(true);
      setQuestionResult(data.question);
      setAnswersResult(data.answers);
    });

    return () => {
      socket.off(SocketHandlersOn.CountDown);
      socket.off(SocketHandlersOn.EndRound);
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
    <div className={styles['cont-5']}>
      <audio src={question.trackUrl} autoPlay></audio>
      <div className={styles['counter-5']}>
        <span>{roundTime}</span>
      </div>

      <p className={styles['question-5']}>
        <span>{question.question}</span>
      </p>

      {
        !isResultReady &&
        <ul className={styles['answer-list']}>
          {
            question?.answers?.map((answer, i) => (
              <li className={styles['answer-item']} key={answer + i}>
                <GameQuestion answer={answer} isAnswered={isAnswered} onAnswerClick={onAnswerClick} />
              </li>
            ))
          }
        </ul>
      }

      {
        isResultReady &&
          <ul className={styles['answer-list']}>
          {
            question?.answers?.map((answer, i) => (
              <li className={styles['answer-item']} key={answer + i}>
                <GameQuestion answer={answer} isAnswered={isAnswered} correctAnswer={questionResult.correctAnswer} />
              </li>
            ))
          }
        </ul>
      }

      {
        isResultReady &&
          <ul className={styles['answer-list']}>
          {
            answersResult.map((answer) => (
              <li className={styles['answer-item']} key={answer[0]}>
                <span>{answer[1].playerName}</span>
                <span> набрал </span>
                <span>{answer[1].score}</span>
                <span> очков. </span>
              </li>
            ))
          }
        </ul>
      }

    </div>
  );
}
