import { Action, Middleware, Reducer, Store } from "redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// import { routerMiddleware } from "react-router-redux";
// import { createHashHistory as createHistory } from "history";
import { State } from "../types";
import { MusicControl } from "../util/music";
import { createReducer } from "../reducers";

const prod = process.env.NODE_ENV === "production";

declare module "redux" {
  export interface Store<S> {
    asyncReducers: { [idx: string]: Reducer<S> };
  }
}

declare const window: {
  __REDUX_STORE__: Store<State>;
  __MUSIC__: MusicControl;
};

// export const history = createHistory();

// const r = require;

// const composeEnhancers: typeof compose = !prod
//   ? require("redux-devtools-extension").composeWithDevTools({})
//   : compose;

const getCommonMiddleware = () => [
  thunk,
  // routerMiddleware(history)
];

const getDevMiddleware = (): Middleware[] =>
  prod
    ? []
    : [
        // require("redux-immutable-state-invariant").default(),
        require("redux-logger").createLogger({
          level: "info",
          collapsed: true,
          diff: true,
          predicate: (_: State, action: Action) =>
            [/TIME_UPDATE/, /SELECTION/, /SELECTING/].every(
              (t) => !t.test(action.type)
            ),
        }),
      ];

export const injectAsyncReducer = (
  store: Store<State>,
  name: string,
  asyncReducer: Reducer<State>
) => {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
};

export const configureStore = () => {
  const existingStore = window.__REDUX_STORE__;
  const music = window.__MUSIC__;
  const asyncReducers = existingStore ? existingStore.asyncReducers : {};
  const reducer = createReducer(asyncReducers);

  const middleware = [...getCommonMiddleware(), ...getDevMiddleware()];

  const store = existingStore
    ? (existingStore.replaceReducer(reducer), existingStore)
    : (window.__REDUX_STORE__ = createStore(
        reducer,
        compose(applyMiddleware(...middleware))
      ));

  store.asyncReducers = asyncReducers;

  music ? music : (window.__MUSIC__ = new MusicControl(store));

  return store as Store<State>;
};
