import React from "react";

import { Provider } from "react-redux";
import { setupStore } from "../store";
export const store = setupStore();

export const withRedux = (component: () => React.ReactNode) => () =>
  <Provider store={store} children={component()} />
