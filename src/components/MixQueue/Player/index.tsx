import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getAudioUrls, getMixById } from "../../../selectors/archive";
import { getMusicElement, getPlayableUrl } from "../../../selectors/music";
import { MixInfo, State } from "../../../types";
import { Controller } from "./Controller";
import Peaks from "./Peaks";
import Tracklist from "./Tracklist";

const View = () => {
  const match = useMatch("/:mixId");
  const mix = useSelector<State, MixInfo | undefined>((state) =>
    getMixById(state, match?.params.mixId!)
  );
  const el = useSelector(getMusicElement);
  const urls = getAudioUrls(mix);
  const url = useSelector<State, string>((state) =>
    getPlayableUrl(state, el, urls)
  );
  const actions = bindActionCreators(Controller, useDispatch());

  useEffect(() => {
    actions.fetchMetadata({ id: match?.params.mixId! });
  }, [match?.params.mixId]);

  useEffect(() => {
    actions.setSrc({ src: url });
  }, [url]);

  return (
    <div>
      <Paper sx={{ position: "relative", margin: 1, padding: 1 }}>
        <Peaks mixId={match?.params.mixId!} />
      </Paper>
      <Tracklist mixId={match?.params.mixId!} />
    </div>
  );
};

export default View;
