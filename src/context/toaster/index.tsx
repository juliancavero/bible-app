import { Toaster } from "@/components/ui/sonner";
import { ProviderProps } from "@/types/common";

const ToasterProvider = ({ children }: ProviderProps) => {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
};

export default ToasterProvider;
