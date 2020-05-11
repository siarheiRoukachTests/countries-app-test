import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { searchCountries } from "../../slices/searchCountriesSlice";
import { searchCodesReset } from "../../slices/searchCodesSlice";
import { apiTypes } from "../../lib/api";
import { ButtonGeneric } from "../../../../ui/buttonGeneric/ButtonGeneric";

const useStyles = makeStyles((theme) => ({
  form: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    marginTop: theme.spacing(6),
  },
  formControl: {
    margin: theme.spacing(2, 0, 1),
    minWidth: 120,
  },
}));

export const SearchCountry = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [searchType, setSearchType] = useState("name");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    searchType === apiTypes.ALL && setSearchValue("");
  }, [searchType]);

  const formSubmit = (e) => {
    e.preventDefault();
    dispatch(searchCodesReset());
    dispatch(searchCountries(searchType, searchValue));
  };

  return (
    <form className={classes.form} onSubmit={formSubmit}>
      <Grid container item xs={12} sm={10} lg={8}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel id="country-search-type-label">
            {t("common:searchType")}
          </InputLabel>
          <Select
            labelId="country-search-type-label"
            id="country-search-type"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}>
            <MenuItem value={apiTypes.NAME}>
              {t("common:searchType.name")}
            </MenuItem>
            <MenuItem value={apiTypes.CODE}>
              {t("common:searchType.code")}
            </MenuItem>
            <MenuItem value={apiTypes.CURRENCY}>
              {t("common:searchType.currency")}
            </MenuItem>
            <MenuItem value={apiTypes.ALL}>
              {t("common:searchType.all")}
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="searchCountry"
          required
          fullWidth
          id="searchCountry"
          label={t("common:search")}
          disabled={searchType === apiTypes.ALL}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <ButtonGeneric fullWidth className={classes.submit} type="submit">
          {t("common:submit")}
        </ButtonGeneric>
      </Grid>
    </form>
  );
};
