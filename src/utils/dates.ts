export const checkDate = (
  inputDate: Date | undefined
): "TODAY" | "YESTERDAY" | "NONE" => {
  if (!inputDate) return "NONE";
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const dateInput = new Date(inputDate);

  if (areSameDay(dateInput, today)) {
    return "TODAY";
  } else if (areSameDay(dateInput, yesterday)) {
    return "YESTERDAY";
  } else {
    return "NONE";
  }
};

export const minutesToGreatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;

  if (hours < 24) {
    return `${hours}h ${minutesLeft}m`;
  }

  const days = Math.floor(hours / 24);
  const hoursLeft = hours % 24;

  if (days < 30) {
    return `${days}d ${hoursLeft}h ${minutesLeft}m`;
  }

  if (days < 365) {
    return `${days}d ${hoursLeft}h`;
  }

  const years = Math.floor(days / 365);
  const daysLeft = days % 365;

  return `${years}y ${daysLeft}d`;
};

const areSameDay = (date1: Date, date2: Date): boolean => {
  if (!date1 || !date2) return false;
  return (
    date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth()
  );
};
