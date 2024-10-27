import StrongText from "@/components/Text/StrongText";

const TodaysDate = () => {
  const today = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return <StrongText className="capitalize">{today}</StrongText>;
};

export default TodaysDate;
