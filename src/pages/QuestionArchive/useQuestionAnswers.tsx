import useNav from "@/hooks/useNav";
import useStoredQuestions from "@/hooks/useStoredquestions";
import { useParams } from "react-router-dom";

const useQuestionAnswers = () => {
  const { id = "" } = useParams();
  const { findQuestion } = useStoredQuestions();
  const { goBack } = useNav();
  const question = findQuestion(id);

  return { goBack, question };
};

export default useQuestionAnswers;
