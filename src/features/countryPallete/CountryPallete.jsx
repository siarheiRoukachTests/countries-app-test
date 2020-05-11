import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SearchCountry } from "./features/searchCountry/SearchCountry";
import { CountryPalleteItem } from "./features/countryPalleteItem/CountryPalleteItem";
import { CodesGetter } from "./features/codesGetter/CodesGetter";
import { ErrorMessage } from "../../ui/errorMessage/ErrorMessage";

import {
  selectCountries,
  selectIsFetchingCountries,
  selectErrorCountries,
} from "./slices/searchCountriesSlice";
import {
  selectCodes,
  selectIsFetchingCodes,
  selectErrorCodes,
} from "./slices/searchCodesSlice";
import { MaterialColors } from "../../materialUIVariables";

const useStyles = makeStyles((theme) => ({
  spinner: {
    marginTop: theme.spacing(8),
    color: MaterialColors.clPrimary,
  },
  codesList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingTop: theme.spacing(4),
  },
  codeItem: {
    width: "55px",
  },
  countriesGrid: {
    paddingTop: theme.spacing(4),
  },
}));

export const CountryPallete = () => {
  const classes = useStyles();

  const countries = useSelector(selectCountries) || [];
  const isFetchingCountries = useSelector(selectIsFetchingCountries);
  const isErrorCountries = useSelector(selectErrorCountries);

  const codes = useSelector(selectCodes) || [];
  const isFetchingCodes = useSelector(selectIsFetchingCodes);
  const isErrorCodes = useSelector(selectErrorCodes);

  const codesList =
    codes.length &&
    codes.map((item) => (
      <ListItem key={item} className={classes.codeItem}>
        <ListItemText primary={item} />
      </ListItem>
    ));

  const countriesList = countries.map((card) => (
    <Grid container item key={card.name} xs={12} sm={6} md={4}>
      <CountryPalleteItem countryData={card} />
    </Grid>
  ));

  return (
    <Container>
      <Grid container direction="column" justify="center" alignItems="center">
        <CodesGetter />
        <SearchCountry />
      </Grid>
      <Grid container direction="column" justify="center" alignItems="center">
        {(isFetchingCountries || isFetchingCodes) && (
          <CircularProgress
            className={classes.spinner}
            thickness={4}
            size={48}
          />
        )}

        {isErrorCountries && <ErrorMessage status={isErrorCountries} />}
        {isErrorCodes && <ErrorMessage status={isErrorCodes} />}

        {!!codes.length && (
          <Container className={classes.codesList}>{codesList}</Container>
        )}

        {!!countries.length && (
          <Container className={classes.countriesGrid}>
            <Grid container spacing={8}>
              {countriesList}
            </Grid>
          </Container>
        )}
      </Grid>
    </Container>
  );
};
