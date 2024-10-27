import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type CalendarProps = {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  label?: string;
  autoOpen?: boolean;
};

const Calendar = ({
  date,
  setDate,
  label = "Día / Mes",
  autoOpen = false,
}: CalendarProps) => {
  return (
    <Popover defaultOpen={autoOpen && !date}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <CalendarComponent
          mode="single"
          // labels={{}} traducciones
          selected={date}
          onSelect={setDate}
          initialFocus={false}
        />
      </PopoverContent>
    </Popover>
  );
};

export default Calendar;
