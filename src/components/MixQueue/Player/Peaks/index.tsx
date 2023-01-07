import { styled } from "@mui/material/styles";
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
import Track from "./Track";

const PeaksContainer = styled("div")(() => ({
  position: "relative",
  width: "100%",
  height: "80px",
  backgroundColor: "rgba(0,43,89,0.75)",
}));

const ControlsContainer = styled("div")(() => ({
  position: "absolute",
  height: "100%",
}));

const ControlsWrapper = styled("div")(() => ({
  position: "absolute",
  top: "calc(50% - 10px)",
  height: "20px",
  "& svg": {
    color: "#fff",
  },
  "& button": {
    height: "20px",
  },
}));

const Peaks = styled("div")(() => ({
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 100%",
  width: "100%",
}));

const PlaybackPosition = styled("div")(() => ({
  position: "absolute",
  borderLeft: "1px dashed white",
  height: "100%",
}));

const PosSelector = styled("div")(() => ({
  position: "absolute",
  borderLeft: "1px dotted white",
  height: "100%",
}));

const PosSelectTime = styled("div")(() => ({
  color: "rgba(255, 255, 255,0.6)",
  fontFamily: "monospace",
  fontSize: "9px",
  position: "absolute",
  top: "calc(50% - 4.5px)",
}));

const CurrentTime = styled("div")(() => ({
  color: "rgba(255, 255, 255,0.6)",
  fontFamily: "monospace",
  fontSize: "9px",
  position: "absolute",
  bottom: "0px",
}));

const Duration = styled("div")(() => ({
  color: "rgba(255, 255, 255,0.6)",
  fontFamily: "monospace",
  fontSize: "9px",
  position: "absolute",
  bottom: "0px",
  right: "0px",
}));

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

  return (
    <PeaksContainer>
      <ControlsContainer>
        <ControlsWrapper>
          <Controls mixId={props.mixId} />
        </ControlsWrapper>
      </ControlsContainer>
      <div style={{ display: "flex", flexFlow: "row", height: "100%" }}>
        <Peaks
          key={`peaks-display-${peaks}`}
          className="peaks"
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
          <PlaybackPosition
            style={{
              left: qXFromPos(".peaks", currentTime, duration),
            }}
          />

          <PosSelector
            style={{
              display: ui.selectingPos ? "block" : "none",
              left: `${ui.posSelectX}px`,
            }}
          >
            <PosSelectTime>{secondsToTime2(ui.posSelectTime)}</PosSelectTime>
          </PosSelector>

          {tracks.map((track, index) => (
            <Track key={index} track={track} />
          ))}

          <CurrentTime>{secondsToTime2(currentTime)}</CurrentTime>
          <Duration>{secondsToTime2(duration)}</Duration>
        </Peaks>
      </div>
    </PeaksContainer>
  );
};

export default View;
