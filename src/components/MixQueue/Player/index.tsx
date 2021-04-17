import { makeStyles, Paper } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { bindActionCreators } from "redux";
import { getAudioUrls, getMixById } from "../../../selectors/archive";
import { getMusicElement, getPlayableUrl } from "../../../selectors/music";
import { MixInfo, State } from "../../../types";
import { Controller } from "./Controller";
import { Props } from "./Model";
import Peaks from "./Peaks";
import { styles } from "./styles";
import Tracklist from "./Tracklist";

const useStyles = makeStyles(styles);

const View = () => {
  const match = useRouteMatch<Props>();
  const mix = useSelector<State, MixInfo | undefined>((state) =>
    getMixById(state, match.params.mixId)
  );
  const el = useSelector(getMusicElement);
  const urls = getAudioUrls(mix);
  const url = useSelector<State, string>((state) =>
    getPlayableUrl(state, el, urls)
  );
  const actions = bindActionCreators(Controller, useDispatch());

  useEffect(() => {
    actions.fetchMetadata({ id: match.params.mixId });
  }, [match.params.mixId]);

  useEffect(() => {
    actions.setSrc({ src: url });
  }, [url]);

  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Peaks mixId={match.params.mixId} />
      </Paper>
      <Tracklist mixId={match.params.mixId} />
    </div>
  );
};

export default View;
