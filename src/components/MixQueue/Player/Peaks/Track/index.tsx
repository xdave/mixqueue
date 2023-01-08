import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../../types";
import { qXFromPos } from "../../../../../util/player";
import { Props } from "./Model";

const Track = styled("div")(() => ({
  position: "absolute",
  borderLeft: "1px dotted rgba(255,255,255,0.4)",
  height: "100%",
  color: "#fff",
}));

const TrackNumber = styled("span")(() => ({
  fontSize: "9px",
}));

const View: React.FunctionComponent<Props> = ({ track }) => {
  const duration = useSelector<State, number>((state) => state.music.duration);
  return (
    <Track style={{ left: qXFromPos(".peaks", track.time, duration) }}>
      <TrackNumber>{track.number}</TrackNumber>
    </Track>
  );
};

export default View;
