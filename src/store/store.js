import { configureStore } from "@reduxjs/toolkit";
import { codesSlice } from "../features/countryPallete/slices/searchCodesSlice";
import { countriesSlice } from "../features/countryPallete/slices/searchCountriesSlice";

//Can be performance issues only in development mode due to the ImmutableStateInvariantMiddleware provided by redux toolkit
export default configureStore({
  reducer: {
    countries: countriesSlice.reducer,
    codes: codesSlice.reducer,
  },
});
