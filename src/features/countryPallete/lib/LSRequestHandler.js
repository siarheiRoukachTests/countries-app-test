export const getCountriesLocalStorage = (searchType, searchValue) => {
  const requestsDb =
    JSON.parse(localStorage.getItem("countriesRequests")) || [];
  return requestsDb.find(
    (item) => item.searchType === searchType && item.searchValue === searchValue
  );
};

export const saveCountriesLocalStorage = (searchType, searchValue, result) => {
  const requestsDb =
    JSON.parse(localStorage.getItem("countriesRequests")) || [];
  requestsDb.push({
    id: requestsDb.length + 1,
    searchType,
    searchValue,
    result,
  });
  localStorage.setItem("countriesRequests", JSON.stringify(requestsDb));
};

export const getCodesLocalStorage = () => {
  return JSON.parse(localStorage.getItem("codesRequests")) || [];
};

export const saveCodesLocalStorage = (data) => {
  localStorage.setItem("codesRequests", JSON.stringify(data));
};
