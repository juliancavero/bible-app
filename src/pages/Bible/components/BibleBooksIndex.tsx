import Card from "@/components/Containers/Card";
import PaddingBox from "@/components/Containers/PaddingBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BibleBookType } from "@/types/bible";
import Book from "./Book";

type BibleBooksIndexType = {
  bibleBooks: {
    old: BibleBookType[];
    new: BibleBookType[];
  };
  onChapterSelect: (book: string, chapter: number) => void;
};

const BibleBooksIndex = ({
  bibleBooks,
  onChapterSelect,
}: BibleBooksIndexType) => {
  return (
    <Card>
      <PaddingBox multiplier={1}>
        <Tabs defaultValue="old">
          <TabsList className="grid grid-cols-2 w-full mb-5">
            <TabsTrigger value="old">Antiguo Testamento</TabsTrigger>
            <TabsTrigger value="new">Nuevo Testamento</TabsTrigger>
          </TabsList>
          <TabsContent value="old">
            {bibleBooks.old.map((book, index) => (
              <Book
                key={index}
                book={book}
                colored={colored(index)}
                onChapterSelect={onChapterSelect}
              />
            ))}
          </TabsContent>
          <TabsContent value="new">
            {bibleBooks.new.map((book, index) => (
              <Book
                key={index}
                book={book}
                colored={colored(index)}
                onChapterSelect={onChapterSelect}
              />
            ))}
          </TabsContent>
        </Tabs>
      </PaddingBox>
    </Card>
  );
};

export default BibleBooksIndex;

const colored = (n: number) => {
  return n % 2 !== 0;
};
