require('smoothscroll-polyfill').polyfill();
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './store';
import reducer from './reducers';
import * as audioActions from './actions/audio'
// import AudioView from './components/AudioView';
import configureAudioControl, { createGetAudio } from "./util/audio";
import { State } from "./types/index";
// import Preload from './components/util/Preload';
// import Test0r from './components/Test0r';
import Another from './components/Another';

const { MuiThemeProvider } = require('material-ui/styles');
import theme from './util/theme';

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
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <ConnectedRouter history={history}>
                        <div>
                            {this.props.children}
                        </div>
                    </ConnectedRouter>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

const C = connect(
    (state: State) => state,
    dispatch => ({
        actions: {
            audio: bindActionCreators({ ...audioActions }, dispatch)
        }
    })
);

const Layout = C(() => (
    <Another />
));

/*const Layout = C(({ actions }) => (
    <Switch>
        <Route exact path="/" render={() => (
            <Preload preload={() => actions.audio.mixesFetch()}>
                <AudioView />
            </Preload>
        )} />
        <Route path="/test" component={Test0r} />
        <Route exact path="/another" component={Another} />
        <Route exact path="/another/:id" component={Another} />
        <Route component={() => (
            <div>404 Not found!</div>
        )} />
    </Switch>
));*/

const Main = () => (
    <App>
        <MuiThemeProvider>
            <Layout />
        </MuiThemeProvider>
    </App>
);

ReactDOM.render(<Main />, document.querySelector('#app'), main);
