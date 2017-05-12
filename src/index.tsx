import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as tap from 'react-tap-event-plugin';
const { MuiThemeProvider } = require('material-ui/styles');
import { Provider } from 'react-redux';
import { configureStore } from './store';
import * as audioActions from './actions/audio'
import reducer from './reducers';
import AudioView from './components/AudioView';
import { default as configureAudioControl, AudioControl } from "./util/audio";

declare const window: {
    __APP_INIT__: boolean;
    __AUDIO_ELEMENT__: AudioControl;
} & Window;

const store = configureStore(reducer);

const main = async () => {
    if (!window.__APP_INIT__) {
        tap();
        window.__AUDIO_ELEMENT__ = configureAudioControl(store);
        store.dispatch(audioActions.setAudioControl(window.__AUDIO_ELEMENT__))
        store.dispatch(audioActions.mixesFetch());
    }
    window.__APP_INIT__ = true;
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
