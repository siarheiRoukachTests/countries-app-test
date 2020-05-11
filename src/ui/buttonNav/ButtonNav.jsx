import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { MaterialColors } from "../../materialUIVariables";

const useStyles = makeStyles((theme) => ({
  root: {
    background: MaterialColors.clPrimary,
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 32,
    padding: "0 30px",
    margin: "0 1rem",
    "&:hover": {
      backgroundColor: MaterialColors.clPrimaryHover,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0.8rem 0",
      height: 40,
    },
  },
}));

export const ButtonNav = (props) => {
  const classes = useStyles();
  return (
    <>
      <Button
        {...props}
        className={`${props.className} ${classes.root}`}
        variant="contained"
        component={Link}
      />
    </>
  );
};

ButtonNav.propTypes = {
  props: PropTypes.any,
};

