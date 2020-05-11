import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@material-ui/core/styles";

import { searchCodes } from "../../slices/searchCodesSlice";
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

  const handleClick = () => {
    dispatch(searchCountriesReset());
    dispatch(searchCodes());
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
