import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import { ButtonNav } from "../../../../ui/buttonNav/ButtonNav";

import { getNumberFormatValue } from "../../lib/valueDisplayFormatter";
import { MaterialColors } from "../../../../materialUIVariables";

const useStyles = makeStyles({
  card: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  row: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  buttonNav: {
    margin: 0,
    "&:hover": {
      backgroundColor: MaterialColors.clPrimaryHover,
    },
  },
  avatar: {
    borderRadius: 0,
    width: "60px",
  },
});

export const CountryPalleteItem = ({ countryData }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  let location = useLocation();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="flag"
            src={countryData.flag}
            className={classes.avatar}
          />
        }
        title={countryData.name}
        subheader={countryData.nativeName}
      />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow key={countryData.alpha2Code}>
              <TableCell component="th" scope="row">
                {t("paletteItem:code")}
              </TableCell>
              <TableCell align="right">{countryData.alpha2Code}</TableCell>
            </TableRow>

            {countryData.capital ? (
              <TableRow key={countryData.capital}>
                <TableCell component="th" scope="row">
                  {t("paletteItem:capital")}
                </TableCell>
                <TableCell align="right">{countryData.capital}</TableCell>
              </TableRow>
            ) : null}

            {countryData.population ? (
              <TableRow key={countryData.population}>
                <TableCell component="th" scope="row">
                  {t("paletteItem:population")}
                </TableCell>
                <TableCell align="right">
                  {getNumberFormatValue(countryData.population)}
                </TableCell>
              </TableRow>
            ) : null}

            {countryData.region ? (
              <TableRow key={countryData.region}>
                <TableCell component="th" scope="row">
                  {t("paletteItem:region")}
                </TableCell>
                <TableCell align="right">{countryData.region}</TableCell>
              </TableRow>
            ) : null}
          </TableBody>
        </Table>
      </CardContent>
      <CardActions>
        <ButtonNav
          className={classes.buttonNav}
          fullWidth
          to={{
            pathname: `/country/${countryData.alpha2Code}`,
            state: { from: location },
          }}>
          {t("paletteItem:view")}
        </ButtonNav>
      </CardActions>
    </Card>
  );
};

CountryPalleteItem.propTypes = {
  countryData: PropTypes.object,
};
