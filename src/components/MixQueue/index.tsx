import React, { useEffect } from "react";
import { useMatch } from "react-router";
import Header from "./Header";
import Player from "./Player";
import * as musicActions from "../../actions/music";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../types";
import { bindActionCreators } from "redux";

const Index: React.FunctionComponent = () => {
  const match = useMatch("/:mixId");
  const playing = useSelector<State, boolean>((state) => state.music.playing);
  const actions = bindActionCreators(
    {
      play: musicActions.play,
      pause: musicActions.pause,
    },
    useDispatch()
  );

  const listener = (e: KeyboardEvent) => {
    if (e.code === "Space" || e.key === " ") {
      if (playing) {
        actions.pause();
      } else {
        actions.play();
      }
    }
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  useEffect(() => {
    const root = document.body;
    root.addEventListener("keyup", listener);
    return () => {
      root.addEventListener("keyup", listener);
    };
  });

  return (
    <div>
      <Header mixId={match?.params.mixId!} />
      <Player />
    </div>
  );
};

export default Index;
