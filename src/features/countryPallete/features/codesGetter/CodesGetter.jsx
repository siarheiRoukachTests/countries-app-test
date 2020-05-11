import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";

import { searchCodes, searchCodesReset } from "../../slices/searchCodesSlice";
import { searchCountriesReset } from "../../slices/searchCountriesSlice";
import { ButtonGeneric } from "../../../../ui/buttonGeneric/ButtonGeneric";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(4, 0),
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
}));

export const CodesGetter = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const fetchCodes = useCallback(() => {
    dispatch(searchCountriesReset());
    dispatch(searchCodes());
  }, [dispatch]);

  useEffect(() => {
    const { getCodes } = qs.parse(location.search);

    getCodes ? fetchCodes() : dispatch(searchCodesReset());
  }, [dispatch, fetchCodes, location.search]);

  const handleClick = () => {
    history.push({
      search: "?" + new URLSearchParams({ getCodes: "all" }).toString(),
    });
  };

  return (
    <ButtonGeneric
      type="submit"
      variant="contained"
      className={classes.submit}
      onClick={handleClick}>
      {t("common:getCodes")}
    </ButtonGeneric>
  );
};
