import {configureStore} from "@reduxjs/toolkit";


export const store =
    configureStore({
        reducer: {
            // [playlistSlice.name]: playlistSlice.reducer,

            // [trackApi.reducerPath]: trackApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                // .concat(authApi.middleware),
        // devTools: true,
    });




export type AppStore = ReturnType<typeof store.getState>;
export type AppState = ReturnType<AppStore['getState']>;
