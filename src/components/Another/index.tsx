import * as React from 'react';
import Header from './Header';
import MixList from './MixList'
import Player from './Player';

type Type = React.SFC<{}>;

const Index: Type = () => (
    <div>
        <Header />
        <MixList />
        <Player />
    </div>
);

export default Index;
