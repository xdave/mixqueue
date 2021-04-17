import {
  AppBar,
  Grid,
  Hidden,
  Icon,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { LibraryMusic } from "@material-ui/icons";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import archive from "../../../icons/archive.svg";
import github from "../../../icons/github.svg";
import mixcloud from "../../../icons/mixcloud.svg";
import preact from "../../../icons/preact.svg";
import soundcloud from "../../../icons/soundcloud.svg";
import { getMusicElement } from "../../../selectors/music";
import CustomIcon from "../../util/Icon";
import Link from "../../util/Link";
import { Controller } from "./Controller";
import MixSelector from "./MixSelector";
import { Props } from "./Model";
import { Stylesheet } from "./Stylesheet";

const useStyles = makeStyles(Stylesheet);

export const View: React.FunctionComponent<Props> = (props) => {
  const actions = bindActionCreators(Controller, useDispatch());
  const el = useSelector(getMusicElement);
  const unload = async () => {
    await actions.stop();
    el.src = "";
    actions.loadedMetadata({ duration: 0 });
  };
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Grid container className={classes.gridContainer}>
          <Hidden only={["xs"]}>
            <Grid item onClick={unload}>
              <Link to={`/`}>
                <Icon>
                  <LibraryMusic />
                </Icon>
              </Link>
            </Grid>
          </Hidden>
          <Hidden only={["xs"]}>
            <Grid item>
              <Typography>MixQueue</Typography>
            </Grid>
          </Hidden>
          <Grid item>
            <MixSelector mixId={props.mixId} />
          </Grid>
          <Hidden only={["xs", "sm"]}>
            <Grid item style={{ marginLeft: "auto" }}>
              <Grid container>
                <Grid item>
                  <a
                    href="https://archive.org/details/@xdavehome"
                    target="_blank"
                  >
                    <CustomIcon
                      src={archive}
                      title="Files hosted at the Internet Archive"
                      alt="archive.org"
                    />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://www.mixcloud.com/xdavehome/" target="_blank">
                    <CustomIcon
                      src={mixcloud}
                      title="More on Mixcloud!"
                      alt="Mixcloud"
                    />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://soundcloud.com/xdavehome" target="_blank">
                    <CustomIcon
                      src={soundcloud}
                      title="Check out my SoundCloud!"
                      alt="SoundCloud"
                    />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://preactjs.com/" target="_blank">
                    <CustomIcon
                      src={preact}
                      title="Powered by Preact"
                      alt="Preact"
                    />
                  </a>
                </Grid>
                <Grid item>
                  <a href="https://github.com/xdave/mixqueue" target="_blank">
                    <CustomIcon
                      src={github}
                      title="Star on GitHub!"
                      alt="GitHub"
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default View;
