import usePostQuestion from "@/api/usePostQuestion";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import useStoredQuestions from "@/hooks/useStoredquestions";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const PAGINATION_SIZE = 5;

const useQuestions = () => {
  const { goTo } = useNav();
  const [searchParams, setSearchParams] = useSearchParams();
  const { storeQuestion, getStoredQuestions } = useStoredQuestions();
  const { mutateAsync } = usePostQuestion();

  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const handleQuestionSubmit = async (question: string) => {
    handleOpen();

    const response = await mutateAsync({ text: question });
    if (response) {
      const { id, text, answer, createdAt } = response;
      storeQuestion({
        id: id,
        text: text,
        answer,
        createdAt,
      });
      handleClose();
      goTo(AppRoutes.QUESTIONS, id);
    } else {
      const id = Math.floor(Math.random() * 9000) + 1000;
      storeQuestion({
        id: id,
        text: question,
        answer: Math.random() > 0.5 ? "Sí" : "No",
        createdAt: new Date().toISOString(),
      });
      handleClose();
      goTo(AppRoutes.QUESTIONS, id);
    }
  };

  const handleStoredQuestionClick = (id: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    setSearchParams(params);
    goTo(AppRoutes.QUESTIONS, id);
  };

  const storedQuestions = useMemo(() => {
    return getStoredQuestions().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, []);

  return {
    open,
    setOpen,
    storedQuestions,
    handleQuestionSubmit,
    handleStoredQuestionClick,
    page,
    onPageChange,
  };
};

export default useQuestions;
