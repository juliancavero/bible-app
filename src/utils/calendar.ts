const months = [
  { value: "1", label: "Enero" },
  { value: "2", label: "Febrero" },
  { value: "3", label: "Marzo" },
  { value: "4", label: "Abril" },
  { value: "5", label: "Mayo" },
  { value: "6", label: "Junio" },
  { value: "7", label: "Julio" },
  { value: "8", label: "Agosto" },
  { value: "9", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

const daysPerMonth = [
  { month: "1", days: 31 },
  { month: "2", days: 28 },
  { month: "3", days: 31 },
  { month: "4", days: 30 },
  { month: "5", days: 31 },
  { month: "6", days: 30 },
  { month: "7", days: 31 },
  { month: "8", days: 31 },
  { month: "9", days: 30 },
  { month: "10", days: 31 },
  { month: "11", days: 30 },
  { month: "12", days: 31 },
];

const days = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
];

const renderDate = (date: Date, year: boolean = false) => {
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: year ? "numeric" : undefined,
  });
};

export { days, daysPerMonth, months, renderDate };
