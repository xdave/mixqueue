import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
const { MuiThemeProvider } = require('material-ui/styles');
import { Provider } from 'react-redux';
import { configureStore } from './store';
import * as audioActions from './actions/audio'
import reducer from './reducers';
import AudioView from './components/AudioView';
import configureAudioControl from "./util/audio";

tap();

const store = configureStore(reducer);

const main = async () => {
    if (!store.getState().control) {
        const control = configureAudioControl(store);
        store.dispatch(audioActions.setAudioControl(() => control))
        store.dispatch(audioActions.mixesFetch());
    }
};

class App extends React.PureComponent<{}, void> {
    shouldComponentUpdate() {
        return false;
    }
    render() {
        return (
            <MuiThemeProvider>
                <Provider store={store}>
                    <div>
                        {this.props.children}
                    </div>
                </Provider>
            </MuiThemeProvider>
        );
    }
}

const Main = () => (
    <App>
        <AudioView />
    </App>
);

ReactDOM.render(<Main />, document.querySelector('#app'), main);
