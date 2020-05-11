import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { MaterialColors } from "../../materialUIVariables";

const AntSwitch = withStyles({
  switchBase: {
    color: MaterialColors.clPrimary,
    "&$checked": {
      color: MaterialColors.clPrimary,
      "& + $track": {
        opacity: 1,
        backgroundColor: MaterialColors.clPrimary,
        borderColor: MaterialColors.clPrimary,
      },
    },
  },
  checked: {},
  track: { backgroundColor: MaterialColors.clPrimary },
})(Switch);

export const SwitchLang = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(
    localStorage.getItem("i18nextLng") !== "en-US"
  );

  useEffect(() => {
    lang ? i18n.changeLanguage("ru-RU") : i18n.changeLanguage("en-US");
  }, [lang, i18n]);

  return (
    <Typography component="div">
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>EN</Grid>
        <Grid item>
          <AntSwitch
            checked={lang}
            onChange={() => setLang(!lang)}
            value="lang"
          />
        </Grid>
        <Grid item>RU</Grid>
      </Grid>
    </Typography>
  );
};
