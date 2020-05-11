import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../lib/api";
import {
  getCountriesLocalStorage,
  saveCountriesLocalStorage,
} from "../lib/LSRequestHandler";

//Uses Immer inside, so it's ok to mutate store
export const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    isFetching: false,
    data: [],
    error: "",
  },
  reducers: {
    searchCountriesRequest: (state) => {
      state.isFetching = true;
      state.data = [];
      state.error = "";
    },
    searchCountriesSuccess: (state, action) => {
      state.isFetching = false;
      Array.isArray(action.payload)
        ? (state.data = [...action.payload])
        : (state.data = [action.payload]);
    },
    searchCountriesError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    searchCountriesReset: (state) => {
      state.isFetching = false;
      state.data = [];
      state.error = "";
    },
  },
});

export const {
  searchCountriesRequest,
  searchCountriesSuccess,
  searchCountriesError,
  searchCountriesReset,
} = countriesSlice.actions;

export const searchCountries = (searchType, searchValue) => async (
  dispatch
) => {
  dispatch(searchCountriesRequest());

  const cachedRequest = getCountriesLocalStorage(searchType, searchValue);

  if (cachedRequest) {
    dispatch(searchCountriesSuccess(cachedRequest.result));
  } else {
    try {
      const response = await axios.get(`${api[searchType]}${searchValue}`);

      saveCountriesLocalStorage(searchType, searchValue, response.data);
      dispatch(searchCountriesSuccess(response.data));
    } catch (error) {
      dispatch(searchCountriesError(error.response.status));
    }
  }
};

//There is no reasons, to create memoized selectors.
export const selectCountries = (state) => state.countries.data;
export const selectIsFetchingCountries = (state) => state.countries.isFetching;
export const selectErrorCountries = (state) => state.countries.error;
