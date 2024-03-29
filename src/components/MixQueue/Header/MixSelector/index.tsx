import { Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getMixById, getMixes } from "../../../../selectors/archive";
import { MixInfo, MixSearchResult, State } from "../../../../types";
import Link from "../../../util/Link";
import ScrollToItem from "../../../util/ScrollToItem";
import { useWidth } from "../../../util/use-width.hook";
import { Controller } from "./Controller";
import { Props } from "./Model";
import styles from "./Stylesheet";

export const View: React.FunctionComponent<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const mixes = useSelector<State, MixSearchResult[]>((state) =>
    getMixes(state)
  );
  const mix = useSelector<State, MixInfo | undefined>((state) =>
    getMixById(state, props.mixId)
  );
  const title = mix ? mix.metadata.title : "Select a mix...";
  const actions = bindActionCreators(Controller, useDispatch());
  const width = useWidth();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    actions.mixListToggle({ value: true });
  };

  const handleClose = () => {
    setAnchorEl(null);
    actions.mixListToggle({ value: false });
  };
  useEffect(() => {
    const uploader = `uploader:${atob(`ZGVmdC5wcm9kdWN0aW9uc0BnbWFpbC5jb20=`)}`;
    const mediatype = `mediatype:audio`;
    const q = `(${uploader} AND ${mediatype})`;
    actions.search({ q });
  }, [mixes.length === 0]);

  const classes = styles();

  return (
    <div>
      <Button
        variant="outlined"
        aria-controls="mix-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Typography
          variant={width === "xs" ? "caption" : "body2"}
          sx={classes.title}
        >
          <b>{title}</b>
        </Typography>
      </Button>
      <Menu
        id="mix-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <ScrollToItem
          itemSelector={"active"}
          setHeight={() => `${window.innerHeight / 2}px`}
        >
          {mixes.map((mix) => (
            <Link
              className={props.mixId === mix.identifier ? "active" : ""}
              key={`mixlink-${mix.identifier}`}
              to={`/${mix.identifier}`}
              color="#000"
              isActive={props.mixId === mix.identifier}
            >
              <MenuItem
                key={`mixlink-${mix.identifier}`}
                onClick={handleClose}
                style={{
                  fontWeight:
                    props.mixId === mix.identifier ? "bold" : undefined,
                }}
              >
                {mix.title}
              </MenuItem>
            </Link>
          ))}
        </ScrollToItem>
      </Menu>
    </div>
  );
};

export default View;
