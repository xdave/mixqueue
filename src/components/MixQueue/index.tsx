import React from "react";
import { useMatch } from "react-router";
import Header from "./Header";
import Player from "./Player";

const Index: React.FunctionComponent = () => {
  const match = useMatch("/:mixId");
  return (
    <div>
      <Header mixId={match?.params.mixId!} />
      <Player />
    </div>
  );
};

export default Index;
