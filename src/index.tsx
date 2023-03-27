import React from "react";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import {store} from "./store";
import {SnackbarProvider} from "notistack";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <SnackbarProvider maxSnack={3} preventDuplicate={true}>
        <Provider store={store}>
            <App/>
        </Provider>
    </SnackbarProvider>
);