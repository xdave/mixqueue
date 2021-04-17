import React from "react";
import Header from "./Header";
import Player from "./Player";
import { Route, useRouteMatch } from "react-router-dom";

const Index: React.FunctionComponent = () => {
  const match = useRouteMatch<{ mixId: string }>();
  return (
    <div>
      <Header mixId={match.params.mixId} />
      <Route exact path={`/:mixId`} component={Player} />
    </div>
  );
};

export default Index;
