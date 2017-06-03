import * as React from 'react';
import Header from './Header';
import MixList from './MixList'
import Player from './Player';
import Tracklist from './Player/Tracklist';
import { Route, RouteComponentProps, withRouter } from "react-router-dom";

export type RouteProps = RouteComponentProps<{ mixId: string }>;

const Index: React.SFC<RouteProps> = ({ match }) => (
    <div>
        <Header mixId={match.params.mixId} />
        <MixList mixId={match.params.mixId} />
        <Route exact path={`/:mixId`} component={Player} />
        <Tracklist mixId={match.params.mixId} />
    </div>
);

export default withRouter(Index);
