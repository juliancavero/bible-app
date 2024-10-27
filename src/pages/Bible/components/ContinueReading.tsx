import BodyText from "@/components/Text/BodyText";
import { Button } from "@/components/ui/button";
import { ContinueReadingType } from "@/hooks/useContinueReading";
import { BookOpenIcon } from "@heroicons/react/24/outline";

type ContinueReadingProps = {
  continueReadingChapter: ContinueReadingType | null;
  onContinueReadingClick: () => void;
};

const ContinueReading = ({
  continueReadingChapter,
  onContinueReadingClick,
}: ContinueReadingProps) => {
  if (!continueReadingChapter) return null;
  return (
    <div className="flex flex-row gap-5 items-center justify-around p-2 border rounded-md dark:border-primary-dark">
      <div className="flex flex-row grow-0 items-center gap-3">
        <BookOpenIcon className="text-blue-500 w-8 h-8" />
        <BodyText>Continúa por donde te quedaste: </BodyText>
      </div>
      <Button onClick={onContinueReadingClick} className="grow-1">
        {continueReadingChapter.bibleBook.label}{" "}
        {continueReadingChapter.chapter}
      </Button>
    </div>
  );
};

export default ContinueReading;
