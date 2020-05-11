import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { MaterialColors } from "../../materialUIVariables";

const useStyles = makeStyles((theme) => ({
  root: {
    background: MaterialColors.clPrimary,
    border: 0,
    borderRadius: 3,
    color: "white",
    height: 40,
    padding: "0 30px",
    "&:hover": {
      backgroundColor: MaterialColors.clPrimaryHover,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: "0.8rem 0",
    },
  },
}));

export const ButtonGeneric = (props) => {
  const classes = useStyles(props);
  return (
    <>
      <Button
        {...props}
        className={`${props.className} ${classes.root}`}
        variant="contained"
      />
    </>
  );
};

ButtonGeneric.propTypes = {
  props: PropTypes.any,
};