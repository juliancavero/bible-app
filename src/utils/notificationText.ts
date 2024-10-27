export const getSaintNotificationText = (
  name: string,
  date: string,
  url: string = "https://biblia.catolica.dev/santos"
) => {
  return `Hoy ${date} celebramos el día de ${name}. ¡Feliz día!\n\nAprende más sobre ${name} en ${url}`;
};

export const getTeachingNotificationText = (
  book: string,
  chapter: number,
  url: string = "https://biblia.catolica.dev/ensenanzas"
) => {
  return `Hoy leemos ${book} ${chapter}\n\nLee el sermón completo en ${url}`;
};
