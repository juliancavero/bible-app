type TextBoxProps = {
  children: React.ReactNode;
};

const TextBox = ({ children }: TextBoxProps) => {
  return <div className="line-clamp-10">{children}</div>;
};

export default TextBox;
