import { List, ListItemButton, Paper } from "@mui/material";
import styled from "@mui/styles/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getCurrentTrack, getTracks } from "../../../../selectors/archive";
import { State, Track } from "../../../../types";
import { secondsToTime2, zeroPad } from "../../../../util/player";
import ScrollToItem from "../../../util/ScrollToItem";
import { Controller } from "./Controller";
import { Props } from "./Model";

const Tracklist = styled(Paper)(() => ({}));

const TrackListItem = styled(ListItemButton)(() => ({
  display: "flex",
  justifyContent: "start",
  "& span": {
    padding: "3px",
  },
}));

const View: React.FunctionComponent<Props> = (props) => {
  const track = useSelector<State, Track>((state) =>
    getCurrentTrack(state, props.mixId)
  );
  const tracks = useSelector<State, Track[]>((state) =>
    getTracks(state, props.mixId)
  );
  const actions = bindActionCreators(Controller, useDispatch());
  return tracks.length > 0 ? (
    <Tracklist>
      <ScrollToItem
        itemSelector={"active"}
        setHeight={() => `${window.innerHeight - 182}px`}
      >
        <List>
          {track &&
            tracks.map((t, index) => (
              <TrackListItem
                key={`track-${index}-${t.title}`}
                sx={{
                  fontWeight: t.number === track.number ? "bold" : undefined,
                }}
                onClick={() => actions.setTime({ time: t.time })}
                className={t.number === track.number ? "active" : ""}
              >
                <span>[{secondsToTime2(t.time)}]</span>
                <span>{zeroPad(t.number)}.</span>
                <span>{t.title}</span>
              </TrackListItem>
            ))}
        </List>
      </ScrollToItem>
    </Tracklist>
  ) : (
    <div />
  );
};

export default View;
