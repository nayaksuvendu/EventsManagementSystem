import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './redux/Store.js'
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>
  <Toaster reverseOrder={false}/> 
      <App/>
    </BrowserRouter>
  </Provider>
);
