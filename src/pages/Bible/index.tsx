import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import BibleBooksIndex from "./components/BibleBooksIndex";
import ContinueReading from "./components/ContinueReading";
import FavouriteBibleBooks from "./components/FavouriteBibleBooks";
import useBible from "./useBible";

const BiblePage = () => {
  const {
    oldBooks,
    newBooks,
    favChapters,
    onChapterSelect,
    onContinueReadingClick,
    continueReadingChapter,
  } = useBible();

  return (
    <MainContainer>
      <IndexBar sticky text="Biblia" />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            {(favChapters.length > 0 || continueReadingChapter) && (
              <div className="bg-background grid grid-cols md:grid-cols-2 items-stretch gap-2 p-2 rounded-md">
                {favChapters && favChapters.length > 0 && (
                  <FavouriteBibleBooks favouriteChapters={favChapters} />
                )}
                {continueReadingChapter && (
                  <ContinueReading
                    continueReadingChapter={continueReadingChapter}
                    onContinueReadingClick={onContinueReadingClick}
                  />
                )}
              </div>
            )}
            <BibleBooksIndex
              onChapterSelect={onChapterSelect}
              bibleBooks={{
                old: oldBooks,
                new: newBooks,
              }}
            />
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default BiblePage;
