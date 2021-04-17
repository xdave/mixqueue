import { List, ListItem, makeStyles, Paper } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentTrack, getTracks } from "../../../../selectors/archive";
import { State, Track } from "../../../../types";
import { secondsToTime2, zeroPad } from "../../../../util/player";
import ScrollToItem from "../../../util/ScrollToItem";
import { Controller } from "./Controller";
import { Props } from "./Model";
import styles from "./styles";

const useStyles = makeStyles(styles);

const View: React.FunctionComponent<Props> = (props) => {
  const track = useSelector<State, Track>((state) =>
    getCurrentTrack(state, props.mixId)
  );
  const tracks = useSelector<State, Track[]>((state) =>
    getTracks(state, props.mixId)
  );
  const actions = bindActionCreators(Controller, useDispatch());
  const classes = useStyles();
  return (
    (tracks.length > 0 && (
      <Paper className={classes.tracklist}>
        <ScrollToItem
          itemSelector={classes.track}
          setHeight={() => `${window.innerHeight - 182}px`}
        >
          <List>
            {track &&
              tracks.map((t, index) => (
                <ListItem
                  key={`track-${index}-${t.title}`}
                  button
                  className={classNames({
                    [classes.track]: t.number === track.number,
                  })}
                  onClick={() => actions.setTime({ time: t.time })}
                >
                  <span>[{secondsToTime2(t.time)}]</span>
                  &nbsp;
                  <span>{zeroPad(t.number)}.</span>
                  &nbsp;
                  <span>{t.title}</span>
                </ListItem>
              ))}
          </List>
        </ScrollToItem>
      </Paper>
    )) || <div />
  );
};

export default View;
