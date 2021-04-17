import { makeStyles } from "@material-ui/core";
import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";

type Props = {
  to: string;
  color?: string;
};

const useStyles = makeStyles({
  link: {
    color: ({ color }: { color?: string }) => color || "#fff",
    textDecoration: "none",
    "& :visited": {
      "text-decoration": "none",
    },
  },
  active: {
    fontWeight: "bold",
  },
});

const Link: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles(props);
  return (
    <RouterLink
      to={props.to}
      className={classes.link}
      activeClassName={classes.active}
    >
      {props.children}
    </RouterLink>
  );
};

export default Link;
