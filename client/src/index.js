import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import  './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/Store.js';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(                                     
  <Provider store={store}>
  <BrowserRouter>
  <Toaster/>
  <App/>   
  </BrowserRouter>
  </Provider>

);
