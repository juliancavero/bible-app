import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Loader from "@/components/Icons/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BibleBooks } from "@/lib/BibleBooks";
import { BookOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import RenderRecentTeachings from "./components/RenderRecentTeachings";
import RenderResultSearchTeachings from "./components/RenderResultSearchTeachings";
import useAllTeachings, { TeachingFilterOptions } from "./useAllTeachings";

const AllTeachingsPage = () => {
  const {
    onBack,
    openFilter,
    setSearch,
    onFilterSelect,
    allTeachingsParams,
    book,
    setBook,
    onTeachingSelect,
    allTeachings,
    recentTeachings,
  } = useAllTeachings();
  return (
    <MainContainer>
      <IndexBar sticky text="Sermones Diarios" onClick={onBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox>
            <Card padding={2}>
              <AnimatedFilterBar
                openFilter={openFilter}
                onFilterSelect={onFilterSelect}
                search={allTeachingsParams.search}
                book={book}
                setBook={setBook}
                setSearch={setSearch}
              />
            </Card>
          </PaddingBox>
          <PaddingBox className="flex flex-col gap-3">
            <Card>
              <PaddingBox multiplier={1} className="flex flex-col gap-2">
                {allTeachings ? (
                  <RenderResultSearchTeachings
                    teachings={allTeachings.data}
                    onTeachingSelect={onTeachingSelect}
                    search={allTeachingsParams.search || ""}
                    book={book}
                  />
                ) : recentTeachings ? (
                  <RenderRecentTeachings
                    teachings={recentTeachings}
                    onTeachingSelect={onTeachingSelect}
                  />
                ) : (
                  <PaddingBox className="flex justify-center">
                    <Loader size={60} />
                  </PaddingBox>
                )}
              </PaddingBox>
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default AllTeachingsPage;

type AnimatedFilterBarProps = {
  openFilter: TeachingFilterOptions | null;
  onFilterSelect: (filter: TeachingFilterOptions) => void;
  search: string | undefined;
  book: string;
  setBook: (book: string) => void;
  setSearch: (search: string) => void;
};

const AnimatedFilterBar = ({
  openFilter,
  onFilterSelect,
  search,
  book,
  setBook,
  setSearch,
}: AnimatedFilterBarProps) => {
  return (
    <div className="flex flex-row justify-around">
      <AnimatePresence initial={false}>
        <motion.div
          key={TeachingFilterOptions.SEARCH}
          initial={false}
          animate={{
            width: openFilter === TeachingFilterOptions.SEARCH ? "75%" : "25%",
          }}
          transition={{ duration: 0.5, type: "easeInOut" }}
          className={`flex items-center cursor-pointer gap-3`}
        >
          <Button
            onClick={() => onFilterSelect(TeachingFilterOptions.SEARCH)}
            variant="icon"
          >
            <MagnifyingGlassIcon
              className={`${
                !openFilter || openFilter == TeachingFilterOptions.SEARCH
                  ? "w-8 h-8"
                  : "w-5 h-5"
              }`}
            />
          </Button>
          <AnimatePresence mode="wait" initial={false}>
            {openFilter === TeachingFilterOptions.SEARCH && (
              <motion.div
                key={TeachingFilterOptions.SEARCH}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: "0%", opacity: 0 }}
                initial={{ width: "0%", opacity: 0 }}
                transition={{ duration: 0.5, type: "easeInOut" }}
              >
                <Input
                  autoFocus
                  placeholder="Buscar..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          key={TeachingFilterOptions.BOOK}
          animate={{
            width: openFilter === TeachingFilterOptions.BOOK ? "75%" : "25%",
          }}
          transition={{ duration: 0.5, type: "easeInOut" }}
          className={`flex items-center justify-end cursor-pointer gap-3`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {openFilter === TeachingFilterOptions.BOOK && (
              <motion.div
                key={TeachingFilterOptions.BOOK}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: "0%", opacity: 0 }}
                initial={{ width: "0%", opacity: 0 }}
                transition={{ duration: 0.5, type: "easeInOut" }}
              >
                <Select onValueChange={setBook} value={book}>
                  <SelectTrigger>
                    <SelectValue>{book}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {BibleBooks.map((book) => (
                      <SelectItem key={book.value} value={book.value}>
                        {book.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            onClick={() => onFilterSelect(TeachingFilterOptions.BOOK)}
            variant="icon"
          >
            <BookOpenIcon
              className={`${
                !openFilter || openFilter == TeachingFilterOptions.BOOK
                  ? "w-8 h-8"
                  : "w-5 h-5"
              }`}
            />
          </Button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
