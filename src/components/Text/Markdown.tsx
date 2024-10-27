import ReactMarkdown from "react-markdown";
import supersub from "remark-supersub";

type MarkdownProps = {
  children: string;
  indent?: boolean;
  serif?: boolean;
};

const Markdown = ({ indent = true, serif = true, children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      className={`prose dark:prose-invert !max-w-none dark:text-zinc-200
        ${serif && "font-serif"} 
        ${indent && "indent-6"}
      `}
      children={children}
      remarkPlugins={[supersub]}
    />
  );
};

export default Markdown;
