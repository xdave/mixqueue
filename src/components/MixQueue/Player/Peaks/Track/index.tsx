import { makeStyles, withWidth } from "@material-ui/core";
import * as React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../../types";
import { qXFromPos } from "../../../../../util/player";
import { Props } from "./Model";
import { styles } from "./styles";

const useStyles = makeStyles(styles);

const View: React.FunctionComponent<Props> = ({ track }) => {
  const duration = useSelector<State, number>((state) => state.music.duration);
  const classes = useStyles();
  return (
    <div
      className={classes.track}
      style={{ left: qXFromPos(".peaks", track.time, duration) }}
    >
      <span className={classes.number}>{track.number}</span>
    </div>
  );
};

export default withWidth()(View);
