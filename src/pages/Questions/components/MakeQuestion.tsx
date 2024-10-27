import PaddingBox from "@/components/Containers/PaddingBox";
import BodyText from "@/components/Text/BodyText";
import ButtonText from "@/components/Text/ButtonText";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ExampleChatBox from "./ExampleChatBox";
import { questionExamples } from "./examples";

type MakeQuestionProps = {
  onSubmit: (question: string) => void;
  short?: boolean;
};

const MakeQuestion = ({ onSubmit, short = false }: MakeQuestionProps) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const onOpen = () => {
    setOpen(true);
  };

  const onChangeStep = () => {
    step === 0 ? setStep(1) : setStep(0);
  };

  const form = useForm<{ question: string }>({
    defaultValues: {
      question: "",
    },
  });

  const submit = ({ question }: { question: string }) => {
    onSubmit(question);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <PaddingBox>
          <FormField
            control={form.control}
            name="question"
            rules={{
              required: "Debes escribir una pregunta",
              maxLength: {
                value: 1000,
                message: "La pregunta no puede tener más de 1000 caracteres",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-lg font-bold">Pregunta</FormLabel>
                  <Button
                    type="button"
                    variant={"ghost"}
                    className="underline underline-offset-4"
                    onClick={onOpen}
                  >
                    ¿Cómo puedo preguntar?
                  </Button>
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Escribe aquí tu consulta. Puedes ser todo lo específico que desees. Si proporcionas más detalles, podremos darte una respuesta más precisa."
                    className="resize-none"
                    rows={short ? 4 : 6}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <ExampleDialog
            open={open}
            setOpen={setOpen}
            step={step}
            onChangeStep={onChangeStep}
          />
        </PaddingBox>
        <PaddingBox>
          <Button className="w-full" type="submit">
            <ButtonText>Enviar</ButtonText>
          </Button>
        </PaddingBox>
      </form>
    </Form>
  );
};

export default MakeQuestion;

type ExampleDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  step: number;
  onChangeStep: () => void;
};

const ExampleDialog = ({
  open,
  setOpen,
  step,
  onChangeStep,
}: ExampleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`w-11/12 overflow-y-auto max-h-screen  ${
          step === 1 && "h-[80dvh]"
        }`}
        aria-describedby={undefined}
      >
        {step === 0 && (
          <>
            <DialogHeader>
              <DialogTitle className="font-bold text-xl">
                ¿Cómo puedo preguntar?
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-3">
              <BodyText className="">
                En esta ventana de conversación podrás explicar con todo lujo de
                detalles cualquier tema para el que necesites ayuda. Desde
                problemas de fe, relaciones, trabajo o cualquier otro aspecto de
                tu vida, esta herramienta te guiará siempre fundamentándose en
                la Biblia y las enseñanzas de Jesucristo.
              </BodyText>
              <Button variant={"secondary"} onClick={onChangeStep}>
                Ver ejemplos
              </Button>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle className="font-bold text-xl">Ejemplos</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-12">
              <div className="col-span-1" />
              <Carousel className="col-span-10">
                <CarouselContent>
                  {questionExamples.map((example, index) => (
                    <CarouselItem key={index}>
                      <ExampleChatBox
                        question={example.question}
                        answer={example.answer}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious variant={"default"} />
                <CarouselNext variant={"default"} />
              </Carousel>
              <div className="col-span-1" />
            </div>
            <Button variant={"secondary"} onClick={onChangeStep}>
              Volver a las instrucciones
            </Button>
          </>
        )}
        <Button onClick={() => setOpen(false)}>Cerrar</Button>
      </DialogContent>
    </Dialog>
  );
};
