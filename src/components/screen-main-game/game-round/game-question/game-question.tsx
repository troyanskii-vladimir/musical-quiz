import styles from './game-question.module.scss';


type GameQuestionProps = {
  answer: string,
  isAnswered: boolean,
  onAnswerClick?: (answer: string) => void,
  correctAnswer?: string,
}

export default function GameQuestion({answer, isAnswered, onAnswerClick, correctAnswer}: GameQuestionProps) {

  const handleAnswerClick = () => {
    if (onAnswerClick) {
      onAnswerClick(answer);
    }
  }


  return (
    <button
      className={`${styles['answer-btn']} ${correctAnswer === answer ? styles['correct'] : ''}`}
      onClick={handleAnswerClick}
      disabled={isAnswered}
    >
      {answer}
    </button>
  );
}
