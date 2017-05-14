import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './store';
import reducer from './reducers';
import * as audioActions from './actions/audio'
import AudioView from './components/AudioView';
import configureAudioControl, { createGetAudio } from "./util/audio";
// import { Mix } from "./types/index";

const { MuiThemeProvider } = require('material-ui/styles');

declare const window: {
    __MIXQUEUE_INIT__: boolean;
} & Window;

const store = configureStore(reducer);
// const defaultMix = 'DaveGradwellMixSessionApril23rd2017';

const main = async () => {
    if (!window.__MIXQUEUE_INIT__) {
        tap();
        const getAudio = createGetAudio();
        const control = configureAudioControl(store, getAudio);
        store.dispatch(audioActions.setAudioControl(() => control))
        await store.dispatch(audioActions.mixesFetch());
        // const fetchedMix: Mix = await store.dispatch(audioActions.mixFetch(defaultMix)) as any;
        // store.dispatch(audioActions.setActiveMix(fetchedMix));
        // store.dispatch(audioActions.setActiveTrack(fetchedMix.cueSheet.tracks[0]));
        // store.dispatch(audioActions.setSource(fetchedMix.sources[0]));
        window.__MIXQUEUE_INIT__ = true;
    }
};

class App extends React.Component<{}, void> {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter store={store} history={history}>
                    <div>
                        {this.props.children}
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}

const Main = () => (
    <App>
        <MuiThemeProvider>
            <Switch>
                <Route exact path="/" component={AudioView} />
                <Route component={() => (
                    <div>404 Not found!</div>
                )} />
            </Switch>
        </MuiThemeProvider>
    </App>
);

ReactDOM.render(<Main />, document.querySelector('#app'), main);
