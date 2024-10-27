import { Question } from "@/types/questions";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from ".";

type CreateQuestionDTO = {
  text: string;
};

const postQuestion = async (
  body: CreateQuestionDTO
): Promise<Question | null> => {
  try {
    const response = await axiosInstance.post<Question>("/questions", body, {
      timeout: 5000,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const usePostQuestion = () => {
  return useMutation({
    mutationFn: postQuestion,
  });
};

export default usePostQuestion;
