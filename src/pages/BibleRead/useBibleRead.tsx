import useGetChapterDetails from "@/api/useGetChapterDetails";
import { useBibleContext } from "@/context/custom/bible";
import { useFavouriteContext } from "@/context/custom/favourites";
import AppRoutes from "@/context/router/routes";
import useAchievements from "@/hooks/useAchievements";
import useContinueReading from "@/hooks/useContinueReading";
import useNav from "@/hooks/useNav";
import usePreferences from "@/hooks/usePreferences";
import useTimer from "@/hooks/useTimer";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const useBibleRead = () => {
  const { addChapter, addTime } = useAchievements();
  const { preferences } = usePreferences();
  const timer = useTimer(60000, addTime);
  const { book, chapter } = useParams();
  const { goToBook, goTo } = useNav();
  const { bibleBooks } = useBibleContext();
  const { data, isLoading, isError } = useGetChapterDetails(
    book || "",
    chapter || "",
    preferences.bibleVersion
  );
  const { addToFav, favChapters, isChapterFav, removeFromFav } =
    useFavouriteContext();
  const { saveContinueReading } = useContinueReading();

  const getNext = () => {
    if (!book || !chapter) return null;

    const thisBookIndex = bibleBooks.findIndex((b) => b.value === book);

    if (thisBookIndex < 0 || thisBookIndex >= bibleBooks.length) return null;

    const nextChapter =
      bibleBooks[thisBookIndex].chapters === Number(chapter)
        ? 1
        : Number(chapter) + 1;

    if (nextChapter !== 1) {
      return {
        book: bibleBooks[thisBookIndex],
        chapter: nextChapter,
      };
    }

    // For now: dont show anything on the final chapter
    if (!bibleBooks[thisBookIndex + 1]) {
      return null;
    }

    return {
      book: bibleBooks[thisBookIndex + 1],
      chapter: 1,
    };
  };
  const getPrevious = () => {
    if (!book || !chapter) return null;

    const thisBookIndex = bibleBooks.findIndex((b) => b.value === book);
    if (thisBookIndex < 0) return null;

    const previousChapter = Number(chapter) !== 1 ? Number(chapter) - 1 : 0;

    if (previousChapter > 0) {
      return {
        book: bibleBooks[thisBookIndex],
        chapter: previousChapter,
      };
    }

    // For now: dont show anything on the first chapter
    if (!bibleBooks[thisBookIndex - 1]) {
      return null;
    }

    return {
      book: bibleBooks[thisBookIndex - 1],
      chapter: bibleBooks[thisBookIndex - 1].chapters,
    };
  };

  const thisBook = bibleBooks.find((b) => b.value === book);
  const next = getNext();
  const previous = getPrevious();

  const onNext = () => {
    if (!next) return;
    goToBook(next.book.value, next.chapter);
  };

  const onPrevious = () => {
    if (!previous) return;
    goToBook(previous.book.value, previous.chapter);
  };

  const onBack = () => {
    goTo(AppRoutes.BIBLE);
  };

  const toggleFavourite = () => {
    if (!chapter || !thisBook) return;

    const isFavourite = isChapterFav(thisBook, Number(chapter));

    if (isFavourite) {
      removeFromFav({
        bibleBook: thisBook,
        chapter: Number(chapter),
      });
    } else {
      addToFav({
        bibleBook: thisBook,
        chapter: Number(chapter),
      });
    }
  };

  const isFavourite = useMemo(() => {
    if (!thisBook) return false;
    return isChapterFav(thisBook, Number(chapter));
  }, [thisBook, chapter, favChapters]);

  const saveBookToContinueLater = () => {
    if (!thisBook || !chapter) return;
    saveContinueReading({
      bibleBook: thisBook,
      chapter: Number(chapter),
    });
  };

  useEffect(() => {
    saveBookToContinueLater();
  }, [book, chapter]);

  useEffect(() => {
    if (data) {
      addChapter(data.id);
    }
  }, [data]);

  return {
    book,
    data,
    next,
    onBack,
    onNext,
    chapter,
    isError,
    thisBook,
    previous,
    isLoading,
    onPrevious,
    isFavourite,
    toggleFavourite,
    padding: preferences.biblePadding,

    timer,
  };
};

export default useBibleRead;
