import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import store from "./redux/store";
import {apiSlice} from "./redux/ApiSlice";
import {ApiProvider} from "@reduxjs/toolkit/dist/query/react";
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ApiProvider api={apiSlice}>
            <App />
        </ApiProvider>
     </Provider>
 );

