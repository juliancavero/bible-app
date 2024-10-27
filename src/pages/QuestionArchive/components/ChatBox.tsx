type ChatBoxProps = {
  question: string;
  answer: string;
};

const ChatBox = ({ question, answer }: ChatBoxProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="w-5/6 p-3 rounded self-end text-right bg-chatbubbleuser">
        <p className="font-bold mb-2 dark:text-black">Usuario</p>
        <p className="dark:text-black text-ellipsis overflow-hidden">
          {question}
        </p>
      </div>
      <div className="w-5/6 p-3 rounded align-left text-left bg-chatbubbleanswer">
        <p className="font-bold mb-2 dark:text-black">Respuesta</p>
        <p className="dark:text-black text-ellipsis overflow-hidden">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default ChatBox;
