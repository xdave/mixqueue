import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux';
import { configureStore, history } from './store';
import reducer from './reducers';
import * as audioActions from './actions/audio'
import configureAudioControl, { createGetAudio } from "./util/audio";
import theme from './util/theme';
import MixQueue from './components/MixQueue';
import Test from './components/Test';

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
            <div>
                <Switch>
                    <Route exact path="/test" render={() =>
                        <Test msg="This is a test." />} />
                    <Route render={() => <MixQueue />}/>
                </Switch>
            </div>
        </MuiThemeProvider>
    </App>
);

ReactDOM.render(<Main />, document.querySelector('#app'), main);
