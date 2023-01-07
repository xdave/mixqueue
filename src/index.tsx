import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { configureStore } from "./store";
import * as musicActions from "./actions/music";
import { music } from "./util/music";
import MixQueue from "./components/MixQueue";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./util/theme";

declare const window: {
  __MIXQUEUE_INIT__: boolean;
};

const store = configureStore();

const router = createHashRouter([
  {
    path: "/",
    element: <MixQueue />,
  },
  {
    path: "/:mixId",
    element: <MixQueue />,
  },
]);

const Main = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.Fragment>
        <RouterProvider router={router} />
      </React.Fragment>
    </ThemeProvider>
  </Provider>
);

const main = () => {
  if (!window.__MIXQUEUE_INIT__) {
    store.dispatch(musicActions.setControl({ control: music }));
    window.__MIXQUEUE_INIT__ = true;
  }
};

const container = document.querySelector("#app");
if (container) {
  const root = createRoot(container);
  root.render(<Main />);
  main();
}
