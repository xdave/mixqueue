import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getPeaks, getTracks } from "../../../../selectors/archive";
import { State, Track as TrackType, UI } from "../../../../types";
import {
  getTimeFromX,
  qXFromPos,
  secondsToTime2,
  setPosFromX,
} from "../../../../util/player";
import Controls from "../Controls";
import { Controller } from "./Controller";
import { Props } from "./Model";
import { styles } from "./styles";
import Track from "./Track";

const useStyles = makeStyles(styles);

const View: React.FunctionComponent<Props> = (props) => {
  const ui = useSelector<State, UI>((state) => state.ui);
  const duration = useSelector<State, number>((state) => state.music.duration);
  const currentTime = useSelector<State, number>(
    (state) => state.music.currentTime
  );
  const tracks = useSelector<State, TrackType[]>((state) =>
    getTracks(state, props.mixId)
  );
  const peaks = useSelector<State, string | undefined>((state) =>
    getPeaks(state, props.mixId)
  );
  const actions = bindActionCreators(Controller, useDispatch());

  const classes = useStyles();

  return (
    <div className={classes.peaksContainer}>
      <div className={classes.controlsContainer}>
        <div className={classes.controls}>
          <Controls mixId={props.mixId} />
        </div>
      </div>
      <div style={{ display: "flex", flexFlow: "row", height: "100%" }}>
        <div
          key={`peaks-display-${peaks}`}
          className={classNames(classes.peaks, "peaks")}
          style={{ backgroundImage: peaks ? `url("${peaks}")` : "none" }}
          onClick={setPosFromX(duration, actions.setTime)}
          onMouseEnter={() => actions.setSelectingPos({ selectingPos: true })}
          onMouseLeave={() => actions.setSelectingPos({ selectingPos: false })}
          onMouseMove={(e) => {
            const { left } = e.currentTarget.getBoundingClientRect();
            actions.setPosSelectionX({ posSelectX: e.clientX - left });
            const time = getTimeFromX(e, duration);
            actions.setPosSelectionTime({ posSelectTime: time });
          }}
        >
          <div
            className={classes.playbackPosition}
            style={{
              left: qXFromPos(".peaks", currentTime, duration),
            }}
          />

          <div
            className={classes.posSelector}
            style={{
              display: ui.selectingPos ? "block" : "none",
              left: `${ui.posSelectX}px`,
            }}
          >
            <div className={classes.posSelectTime}>
              {secondsToTime2(ui.posSelectTime)}
            </div>
          </div>

          {tracks.map((track, index) => (
            <Track key={index} track={track} />
          ))}

          <div className={classes.currentTime}>
            {secondsToTime2(currentTime)}
          </div>
          <div className={classes.duration}>{secondsToTime2(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default View;
