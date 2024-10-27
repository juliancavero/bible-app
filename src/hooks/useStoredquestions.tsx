import { Question } from "@/types/questions";
import useLocalStorage, { LocalStorageKeys } from "./useLocalStorage";

const useStoredQuestions = () => {
  const { getItem, setItem } = useLocalStorage();

  const getStoredQuestions = (): Question[] => {
    return getItem(LocalStorageKeys.STORED_QUESTIONS) || [];
  };

  const storeQuestion = (question: Question) => {
    const storedQuestions = getStoredQuestions() || [];
    storedQuestions.push(question);
    setItem(LocalStorageKeys.STORED_QUESTIONS, storedQuestions);
  };

  const findQuestion = (id: string): Question | undefined => {
    const storedQuestions = getStoredQuestions() || [];
    return storedQuestions.find(
      (question: Question) => question.id === Number(id)
    );
  };

  return {
    getStoredQuestions,
    storeQuestion,
    findQuestion,
  };
};

export default useStoredQuestions;
