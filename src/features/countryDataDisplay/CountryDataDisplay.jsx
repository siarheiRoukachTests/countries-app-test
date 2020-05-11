import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { ButtonNav } from "../../ui/buttonNav/ButtonNav";
import { ErrorMessage } from "../../ui/errorMessage/ErrorMessage";
import { MaterialColors } from "../../materialUIVariables";
import { getNumberFormatValue } from "../countryPallete";

import {
  searchCountries,
  searchCountriesReset,
  selectCountries,
  selectIsFetchingCountries,
  selectErrorCountries,
  apiTypes,
} from "../countryPallete";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  tableHeading: {
    fontWeight: 900,
    margin: theme.spacing(2),
  },
  buttonBack: {
    height: 0,
    margin: "3rem 4rem 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  arrowBack: {
    color: MaterialColors.clPrimary,
    fontSize: "2.5rem",
  },
  tablesContainer: {
    marginTop: theme.spacing(4),
  },
  avatar: {
    borderRadius: 0,
    height: "60px",
    width: "100px",
  },
  avatarContainer: {
    justifyContent: "flex-end",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
      margin: theme.spacing(2, 0),
    },
  },
  spinner: {
    marginTop: theme.spacing(8),
    color: MaterialColors.clPrimary,
  },
}));

export const CountryDataDisplay = ({ countryCode }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const countries = useSelector(selectCountries) || [];
  const isFetching = useSelector(selectIsFetchingCountries);
  const errorFetching = useSelector(selectErrorCountries);

  const [activeCountry, setActiveCountry] = useState(null);

  useEffect(() => {
    if (errorFetching) return;
    dispatch(searchCountries(apiTypes.CODE, countryCode));
    return () => {
      dispatch(searchCountriesReset());
    };
  }, [countryCode, dispatch, errorFetching]);

  useEffect(() => {
    if (errorFetching) return;

    const existingCountry = countries.find(
      (item) =>
        item.alpha2Code === countryCode || item.alpha3Code === countryCode
    );

    if (existingCountry && Object.entries(existingCountry).length)
      setActiveCountry(existingCountry);
  }, [countries, countryCode, errorFetching]);

  if (errorFetching) return <ErrorMessage status={errorFetching} />;

  if (isFetching || !activeCountry)
    return (
      <Grid container justify="center">
        <CircularProgress className={classes.spinner} thickness={4} size={48} />
      </Grid>
    );
  //It makes sense to extract tables in another component, but, for now, app is small enough + i have little time
  return (
    <>
      <ButtonNav className={classes.buttonBack} to={from}>
        <ArrowBackIosIcon className={classes.arrowBack} />
      </ButtonNav>
      <div className={classes.paper}>
        <Container maxWidth="lg" disableGutters>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <Typography component="h1" variant="h4">
                {activeCountry && activeCountry.name}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              className={classes.avatarContainer}>
              <Avatar
                aria-label="flag"
                src={activeCountry.flag}
                className={classes.avatar}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sm={8} md={6}>
              <Typography
                component="span"
                variant="subtitle1"
                style={{ color: MaterialColors.captionColor }}>
                {activeCountry.altSpellings.join(", ")}
              </Typography>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="lg">
          <Grid container spacing={8} className={classes.tablesContainer}>
            <Grid container item xs={12} sm={6} md={4}>
              <TableContainer component={Paper}>
                <Typography
                  className={classes.tableHeading}
                  variant="h6"
                  color="textSecondary">
                  {t("countryPage:heding.commonInfo")}
                </Typography>
                <Table className={classes.table} aria-label="commmon table">
                  <TableBody>
                    <TableRow key={activeCountry.name}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.commonName")}
                      </TableCell>
                      <TableCell align="right">{activeCountry.name}</TableCell>
                    </TableRow>

                    <TableRow key={"nativeName"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.nativeName")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.nativeName}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.population}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.population")}
                      </TableCell>
                      <TableCell align="right">
                        {getNumberFormatValue(activeCountry.population)}
                      </TableCell>
                    </TableRow>

                    <TableRow key={"currencies"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.currencies")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.currencies
                          .map((currency) => currency.name)
                          .join(", ")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={"languages"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.lang")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.languages
                          .map((language) => language.name)
                          .join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid container item xs={12} sm={6} md={4}>
              <TableContainer component={Paper}>
                <Typography
                  className={classes.tableHeading}
                  variant="h6"
                  color="textSecondary">
                  {t("countryPage:heding.geography")}
                </Typography>

                <Table className={classes.table} aria-label="geography table">
                  <TableBody>
                    <TableRow key={activeCountry.region || "region"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.region")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.region}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.subregion || "subregion"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.subregion")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.subregion}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.capital || "capital"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.capital")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.capital}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.demonym}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.demonym")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.demonym}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.latlng[0] || "lat/lng"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.latlng")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.latlng.join(", ")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.area}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.area")}
                      </TableCell>
                      <TableCell align="right">
                        {`${getNumberFormatValue(activeCountry.area)} km`}
                        <sup>2</sup>
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.borders[0] || "borders"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.borders")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.borders.join(", ")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.timezones[0] || "timezones"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.zones")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.timezones.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            <Grid container item xs={12} sm={6} md={4}>
              <TableContainer component={Paper}>
                <Typography
                  className={classes.tableHeading}
                  variant="h6"
                  color="textSecondary">
                  {t("countryPage:heding.codes")}
                </Typography>

                <Table className={classes.table} aria-label="commmon table">
                  <TableBody>
                    <TableRow key={"alpha2code"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.alpha2code")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.alpha2Code}
                      </TableCell>
                    </TableRow>

                    <TableRow key={"alpha3code"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.alpha3code")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.alpha2Code}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.numericCode}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.numeric")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.numericCode}
                      </TableCell>
                    </TableRow>

                    <TableRow
                      key={activeCountry.callingCodes[0] || "calling-codes"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.calling")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.callingCodes.join(", ")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={"currencies"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.currencyCode")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.currencies
                          .map((currency) => currency.code)
                          .join(", ")}
                      </TableCell>
                    </TableRow>

                    <TableRow key={activeCountry.topLevelDomain[0] || "domain"}>
                      <TableCell component="th" scope="row">
                        {t("countryPage:row.domain")}
                      </TableCell>
                      <TableCell align="right">
                        {activeCountry.topLevelDomain.join(", ")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

CountryDataDisplay.propTypes = {
  countryCode: PropTypes.string.isRequired,
};
