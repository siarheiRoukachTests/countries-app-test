import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(4),
  },
}));

const NOTFOUND = 404;

export const ErrorMessage = ({ status }) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        className={classes.text}
        variant="h6"
        color="textSecondary"
        align="center">
        {Number(status) === NOTFOUND
          ? "404 Not Found"
          : "Something went wrong, try again later."}
      </Typography>
    </>
  );
};

ErrorMessage.propTypes = {
  status: PropTypes.number.isRequired,
};

