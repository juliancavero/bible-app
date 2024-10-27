type LinkProps = {
  onClick?: () => void;
  href?: string;
  className?: string;
  children: React.ReactNode;
};

const Link = ({ onClick, href, className, children }: LinkProps) => {
  return (
    <a
      className={`block cursor-pointer underline underline-offset-4 text-blue-600 dark:text-blue-300 ${className}`}
      onClick={onClick}
      href={href}
    >
      {children}
    </a>
  );
};

export default Link;
