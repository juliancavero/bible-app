import * as II from "@/components/Misc/Image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import useShare from "@/hooks/useShare";
import { translateBook } from "@/lib/BibleBooks";
import { Teaching } from "@/types/bible";
import { getTeachingNotificationText } from "@/utils/notificationText";
import { ShareIcon } from "@heroicons/react/24/outline";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useMemo } from "react";

type ImageDetailsDialogProps = {
  teaching: Teaching;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ImageDetailsDialog = ({
  teaching,
  open,
  setOpen,
}: ImageDetailsDialogProps) => {
  const { shareImage, supported } = useShare();

  const bookTitle = `${teaching.book} ${teaching.chapter}`;

  const renderBookName = useMemo(() => {
    return translateBook(teaching?.book) ?? teaching.book;
  }, [teaching]);

  const notificationText = useMemo(() => {
    return getTeachingNotificationText(renderBookName, teaching.chapter);
  }, [renderBookName, teaching.chapter]);

  const onShare = async () => {
    if (teaching.image) {
      await shareImage(teaching.image, bookTitle, notificationText);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden>{renderBookName}</DialogTitle>
      <DialogContent
        className="w-screen h-dvh"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogDescription className="flex flex-col justify-center items-center gap-5">
          {teaching.image && (
            <II.default
              src={teaching.image}
              alt={"Image of " + bookTitle}
              fit="contain"
            />
          )}
          {supported && (
            <div className="flex flex-col gap-2 w-full">
              <Button onClick={onShare} className="w-full flex flex-row gap-3">
                <ShareIcon className="w-6 h-6" />
                Compartir
              </Button>
            </div>
          )}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDetailsDialog;
