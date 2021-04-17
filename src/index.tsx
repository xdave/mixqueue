require("smoothscroll-polyfill").polyfill();

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { configureStore } from "./store";
import * as musicActions from "./actions/music";
import { music } from "./util/music";
import MixQueue from "./components/MixQueue";
import { CssBaseline } from "@material-ui/core";

declare const window: {
  __MIXQUEUE_INIT__: boolean;
};

const store = configureStore();

const App: React.FunctionComponent = (props) => (
  <Provider store={store}>
    <HashRouter>
      <div>{props.children}</div>
    </HashRouter>
  </Provider>
);

const Main = () => (
  <React.Fragment>
    <CssBaseline />
    <App>
      <Switch>
        <Route exact path="/" component={MixQueue} />
        <Route path="/:mixId" component={MixQueue} />
      </Switch>
    </App>
  </React.Fragment>
);

const main = () => {
  if (!window.__MIXQUEUE_INIT__) {
    store.dispatch(musicActions.setControl({ control: music }));
    window.__MIXQUEUE_INIT__ = true;
  }
};

ReactDOM.render(<Main />, document.querySelector("#app"), main);

export default { main, Main, App };
