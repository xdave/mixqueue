import { styled } from "@mui/material/styles";
import * as React from "react";
import { NavLink } from "react-router-dom";

interface Props extends React.PropsWithChildren {
  className?: string;
  to: string;
  color?: string;
  isActive?: boolean;
}

const StyledNavLink = styled(NavLink)<Props>(({ color, isActive }) => ({
  color: color || "#fff",
  textDecoration: "none",
  "& :visited": {
    "text-decoration": "none",
  },
  fontWeight: isActive ? "bold" : undefined,
}));

const Link: React.FunctionComponent<Props> = (props) => {
  const { isActive: _, ...rest } = props;
  return <StyledNavLink {...rest}>{props.children}</StyledNavLink>;
};

export default Link;
