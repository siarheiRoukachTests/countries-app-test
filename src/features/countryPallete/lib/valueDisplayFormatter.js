export const getNumberFormatValue = (
  number,
  format = localStorage.getItem("i18nextLng") || ""
) => {
  return number ? number.toLocaleString(format) : null;
};
