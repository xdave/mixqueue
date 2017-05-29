import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './store';
import reducer from './reducers';
import * as audioActions from './actions/audio'
import configureAudioControl, { createGetAudio } from "./util/audio";
import theme from './util/theme';
import MixQueue from './components/MixQueue';
require('smoothscroll-polyfill').polyfill();

const { MuiThemeProvider } = require('material-ui/styles');

declare const window: {
    __MIXQUEUE_INIT__: boolean;
} & Window;

const store = configureStore(reducer);

const main = async () => {
    if (!window.__MIXQUEUE_INIT__) {
        tap();
        const getAudio = createGetAudio();
        const control = configureAudioControl(store, getAudio);
        store.dispatch(audioActions.setAudioControl(() => control))
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

const Main = () => (
    <App>
        <MuiThemeProvider>
            <MixQueue />
        </MuiThemeProvider>
    </App>
);

ReactDOM.render(<Main />, document.querySelector('#app'), main);
