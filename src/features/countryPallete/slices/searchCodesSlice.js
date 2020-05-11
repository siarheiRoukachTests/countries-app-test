import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../lib/api";
import {
  getCodesLocalStorage,
  saveCodesLocalStorage,
} from "../lib/LSRequestHandler";

export const codesSlice = createSlice({
  name: "codes",
  initialState: {
    isFetching: false,
    data: [],
    error: "",
  },
  reducers: {
    searchCodesRequest: (state) => {
      state.isFetching = true;
      state.data = [];
      state.error = "";
    },
    searchCodesSuccess: (state, action) => {
      state.isFetching = false;
      state.data = [...action.payload];
    },
    searchCodesError: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    searchCodesReset: (state) => {
      state.isFetching = false;
      state.data = [];
      state.error = "";
    },
  },
});

export const {
  searchCodesRequest,
  searchCodesSuccess,
  searchCodesError,
  searchCodesReset,
} = codesSlice.actions;

export const searchCodes = () => async (dispatch) => {
  dispatch(searchCodesRequest());

  const cachedRequest = getCodesLocalStorage();

  if (cachedRequest && cachedRequest.length) {
    dispatch(searchCodesSuccess(cachedRequest));
  } else {
    try {
      const response = await axios.get(`${api.all}`);
      const codes =
        response.data && response.data.map((item) => item.alpha2Code);

      saveCodesLocalStorage(codes);
      dispatch(searchCodesSuccess(codes));
    } catch (error) {
      dispatch(searchCodesError(error.response.status));
    }
  }
};

export const selectCodes = (state) => state.codes.data;
export const selectIsFetchingCodes = (state) => state.codes.isFetching;
export const selectErrorCodes = (state) => state.codes.error;
