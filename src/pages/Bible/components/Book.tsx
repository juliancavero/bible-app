import { VerticalArrow } from "@/components/Icons/Arrows";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { BibleBookType } from "@/types/bible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { useState } from "react";

type BookType = {
  book: BibleBookType;
  colored: boolean;
  onChapterSelect: (book: string, chapter: number) => void;
};

const Book = ({ book, colored, onChapterSelect }: BookType) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={`duration-100 ${
        open && "outline outline-black dark:outline-white p-3"
      }`}
    >
      <CollapsibleTrigger
        className={`flex flex-row items-center justify-between w-full p-1 ${
          colored ? "bg-background" : "bg-background-alternate"
        }`}
      >
        <span
          className={`duration-300 ease-in-out ${open && "text-xl font-bold"}`}
        >
          {book.label}
        </span>
        {open ? <VerticalArrow dir="up" /> : <VerticalArrow dir="down" />}
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className={`grid grid-cols-5 md:grid-cols-10 gap-3 px-2 py-3`}>
          {Array.from({ length: book.chapters }, (_, index) => (
            <div
              key={index}
              onClick={() => onChapterSelect(book.value, index + 1)}
              className="p-2 text-center cursor-pointer rounded-lg
                bg-background-alternate"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default Book;
