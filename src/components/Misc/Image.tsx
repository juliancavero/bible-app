type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  fit?: "contain" | "cover";
  margin?: number;
  onClick?: () => void;
};

const Image = ({
  src,
  alt,
  fit = "cover",
  margin = 3,
  onClick,
  className,
}: ImageProps) => {
  return (
    <img
      className={`h-auto m-${margin} rounded-lg object-${fit} ${
        !!onClick && "cursor-pointer"
      } ${className}`}
      src={src}
      alt={alt}
      onClick={onClick}
    />
  );
};

export default Image;
