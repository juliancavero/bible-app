import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import BiColorListItem from "@/components/Containers/BiColorListItem";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Image from "@/components/Misc/Image";
import CustomPagination from "@/components/Tables/CustomPagination";
import BodyText from "@/components/Text/BodyText";
import StrongText from "@/components/Text/StrongText";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
import MakeQuestion from "./components/MakeQuestion";
import useQuestions, { PAGINATION_SIZE } from "./useQuestions";

const QuestionsPage = () => {
  const {
    open,
    setOpen,
    storedQuestions,
    handleQuestionSubmit,
    handleStoredQuestionClick,
    page,
    onPageChange,
  } = useQuestions();

  return (
    <MainContainer>
      <IndexBar sticky text="Consultas" />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox>
            <Card>
              <PaddingBox className="">
                <div className="flex flex-col gap-5">
                  <StrongText>
                    Consulta Bíblica: Encuentra Sabiduría en la Palabra de Dios
                  </StrongText>

                  <div>
                    <Image
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjGBS8aFl9CaKlqjz5I8ySnRB_Eb1QzC6wtA&s"
                      alt="Oracle"
                      margin={0}
                      className="float-right w-1/3 ml-5"
                    />
                    <BodyText>
                      En esta sección puedes hacer cualquier consulta
                      relacionada con tu vida cotidiana o decisiones que
                      necesitas tomar, y obtendrás respuestas basadas en los
                      principios y enseñanzas de la Biblia. Ya sean preguntas
                      sobre fe, relaciones, trabajo o cualquier otro aspecto de
                      tu vida, esta herramienta te guiará siempre
                      fundamentándose en la Biblia y las enseñanzas de
                      Jesucristo.
                    </BodyText>
                  </div>

                  <BodyText className="italic indent-7">
                    "Si alguno tiene falta de sabiduría, pídala a Dios, quien da
                    generosamente a todos" – Santiago 1:5
                  </BodyText>
                </div>
              </PaddingBox>
              <MakeQuestion onSubmit={handleQuestionSubmit} />
            </Card>
          </PaddingBox>
          <PaddingBox>
            {storedQuestions && storedQuestions.length > 0 && (
              <Card>
                <PaddingBox>
                  <StrongText>Consultas pasadas</StrongText>
                </PaddingBox>
                <PaddingBox>
                  {storedQuestions
                    .slice(page * PAGINATION_SIZE, (page + 1) * PAGINATION_SIZE)
                    .map((question, index) => {
                      return (
                        <BiColorListItem
                          onClick={() => handleStoredQuestionClick(question.id)}
                          colored={index % 2 !== 0}
                          key={index}
                        >
                          <BodyText className="line-clamp-2 overflow-hidden">
                            {question.text}
                          </BodyText>
                        </BiColorListItem>
                      );
                    })}
                </PaddingBox>
                {storedQuestions.length > PAGINATION_SIZE && (
                  <CustomPagination
                    page={page}
                    pageSize={PAGINATION_SIZE}
                    totalItems={storedQuestions.length}
                    pageChange={onPageChange}
                  />
                )}
              </Card>
            )}
          </PaddingBox>
        </MainContainer>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-screen h-dvh">
            <DialogHeader>
              <DialogTitle>Enviando consulta</DialogTitle>
            </DialogHeader>
            <DialogDescription className="flex justify-center">
              <Loader2
                size={100}
                className="animate-spin text-indigo-800 dark:text-indigo-200"
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default QuestionsPage;
