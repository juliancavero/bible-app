import BiColorListItem from "@/components/Containers/BiColorListItem";
import { VerticalArrow } from "@/components/Icons/Arrows";
import Star from "@/components/Icons/Star";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import useNav from "@/hooks/useNav";
import { FavouriteChapterType } from "@/types/bible";
import { useState } from "react";

type FavouriteBibleBooksType = {
  favouriteChapters: FavouriteChapterType[];
};

const FavouriteBibleBooks = ({
  favouriteChapters,
}: FavouriteBibleBooksType) => {
  const { goToBook } = useNav();
  const [open, setOpen] = useState(false);

  const onFavClick = (book: string, chapter: number) => {
    goToBook(book, chapter);
  };

  if (!favouriteChapters || favouriteChapters.length === 0) return null;
  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex flex-col justify-center p-2 gap-3 border dark:border-primary-dark rounded-md h-full"
    >
      <CollapsibleTrigger className="flex flex-row justify-between items-center cursor-pointer">
        <div className="flex flex-row items-center justify-center gap-2 ">
          <Star filled />
          <span
            className={`duration-300 ease-in-out ${
              open && "text-2xl font-bold"
            }`}
          >
            Favoritos
          </span>
        </div>
        {open ? <VerticalArrow dir="up" /> : <VerticalArrow dir="down" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        {favouriteChapters.map((fav, index) => {
          return (
            <BiColorListItem
              onClick={() => onFavClick(fav.bibleBook.value, fav.chapter)}
              colored={index % 2 !== 0}
              key={index}
            >
              {fav.bibleBook.label} {fav.chapter}
            </BiColorListItem>
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FavouriteBibleBooks;
