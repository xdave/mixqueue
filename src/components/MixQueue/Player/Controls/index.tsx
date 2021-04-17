import { IconButton } from "@material-ui/core";
import { Pause, PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getMixById } from "../../../../selectors/archive";
import { MixInfo, State } from "../../../../types";
import { Controller } from "./Controller";
import { Props } from "./Model";

const Controls: React.FunctionComponent<Props> = (props) => {
  const playing = useSelector<State, boolean>((state) => state.music.playing);
  const mix = useSelector<State, MixInfo | undefined>((state) =>
    getMixById(state, props.mixId)
  );
  const actions = bindActionCreators(Controller, useDispatch());

  const play = () => {
    if (mix) {
      actions.play();
    }
  };

  return (
    <div className={props.className}>
      <IconButton onClick={playing ? actions.pause : play}>
        {playing ? <Pause /> : <PlayArrow />}
      </IconButton>
    </div>
  );
};

export default Controls;
