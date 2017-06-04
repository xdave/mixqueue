

require('smoothscroll-polyfill').polyfill();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { configureStore, history } from './store';
import * as musicActions from './actions/music'
import { music } from "./util/music";
import theme from './util/theme';
import MixQueue from './components/MixQueue';

declare const window: {
    __MIXQUEUE_INIT__: boolean;
};

const store = configureStore();

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
        <Switch>
            <Route exact path="/" component={MixQueue} />
            <Route path="/:mixId" component={MixQueue} />
        </Switch>
    </App>
);

const main = () => {
    if (!window.__MIXQUEUE_INIT__) {
        tap();
        store.dispatch(musicActions.setControl({ control: music }));
        window.__MIXQUEUE_INIT__ = true;
    }
};

ReactDOM.render(<Main />, document.querySelector('#app'), main);
