import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import reducer from './reducers';
import Foo from './components/Foo';

const store = configureStore(reducer);

class App extends React.PureComponent<{}, void> {
    render() {
        return (
            <Provider store={store}>
                {this.props.children}
            </Provider>
        );
    }
}

ReactDOM.render((
    <App>
        <Foo />
    </App>
), document.querySelector('#app'));
