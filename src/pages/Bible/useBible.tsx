import { useBibleContext } from "@/context/custom/bible";
import { useFavouriteContext } from "@/context/custom/favourites";
import useContinueReading from "@/hooks/useContinueReading";
import useNav from "@/hooks/useNav";

const useBible = () => {
  const { goToBook } = useNav();
  const { oldBooks, newBooks } = useBibleContext();
  const { favChapters } = useFavouriteContext();
  const { continueReading } = useContinueReading();

  const onChapterSelect = (book: string, chapter: number) => {
    goToBook(book, chapter);
  };

  const onContinueReadingClick = () => {
    if (!continueReadingChapter) return;
    const { bibleBook, chapter } = continueReadingChapter;
    goToBook(bibleBook.value, Number(chapter));
  };

  const continueReadingChapter = continueReading();

  return {
    oldBooks,
    newBooks,
    favChapters,
    onChapterSelect,
    onContinueReadingClick,
    continueReadingChapter,
  };
};

export default useBible;
