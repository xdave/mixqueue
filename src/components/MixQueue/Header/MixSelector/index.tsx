import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import classNames from "classnames";
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

const useStyles = makeStyles(styles);

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
  const classes = useStyles(props);
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
    const title = `title:mix OR title:guestmix OR title:best`;
    const creator = `creator:"David Gradwell" OR creator:"Dave Gradwell"`;
    const q = `(${title}) AND (${creator})`;
    actions.search({ q });
  }, [mixes.length === 0]);

  return (
    <div>
      <Button
        variant="outlined"
        // color="primary"
        tabIndex={`0` as any}
        aria-controls="mix-menu"
        aria-haspopup="true"
        onClick={handleOpen}
      >
        <Typography
          variant={width === "xs" ? "caption" : "body2"}
          className={classes.title}
        >
          {title}
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
          itemSelector={classes.active}
          setHeight={() => `${window.innerHeight / 2}px`}
        >
          {mixes.map((mix) => (
            <Link
              key={`mixlink-${mix.identifier}`}
              to={`/${mix.identifier}`}
              color="#000"
            >
              <MenuItem
                key={`mixlink-${mix.identifier}`}
                onClick={handleClose}
                className={classNames({
                  [classes.active]: props.mixId === mix.identifier,
                })}
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
