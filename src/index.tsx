import React from 'react';
import ReactDOM from 'react-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './css/index.css';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from "mobx-react";
import { createRootStore } from "./stores/rootStore";
import { onPatch } from "mobx-state-tree";

const store = createRootStore;

onPatch(store, (patch) => {
  console.log(patch);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
