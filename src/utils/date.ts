export const getCurrentDate = () => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
