import './game-question.scss';


type GameQuestionProps = {
  answer: string,
  isAnswered: boolean,
  onAnswerClick: (answer: string) => void,
}

export default function GameQuestion({answer, isAnswered, onAnswerClick}: GameQuestionProps) {

  const handleAnswerClick = () => {
    onAnswerClick(answer);
  }


  return (
    <button
      className="answer-btn"
      onClick={handleAnswerClick}
      disabled={isAnswered}
    >
      {answer}
    </button>
  );
}
