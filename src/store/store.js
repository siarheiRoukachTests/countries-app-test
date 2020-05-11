import { configureStore } from "@reduxjs/toolkit";
import { codesSlice } from "../features/countryPallete/slices/searchCodesSlice";
import { countriesSlice } from "../features/countryPallete/slices/searchCountriesSlice";

export default configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    codes: codesSlice.reducer,
  },
});
