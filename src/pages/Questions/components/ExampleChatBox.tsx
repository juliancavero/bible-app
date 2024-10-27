type ExampleChatBoxProps = {
  question: string;
  answer: string;
};

const ExampleChatBox = ({ question, answer }: ExampleChatBoxProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-full p-3 rounded self-end text-left bg-chatbubbleuser">
        <p className="font-bold mb-2 dark:text-black">Usuario</p>
        <p className="tracking-tight dark:text-black text-ellipsis max-h-44 overflow-y-auto overflow-x-hidden">
          {question}
        </p>
      </div>
      <div className="w-full p-3 rounded align-left text-left bg-chatbubbleanswer">
        <p className="font-bold mb-2 dark:text-black">Respuesta</p>
        <p className="tracking-tight dark:text-black text-ellipsis max-h-44 overflow-y-auto overflow-x-hidden">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default ExampleChatBox;
