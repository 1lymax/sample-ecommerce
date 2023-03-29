import React from "react";
import {Route, Routes} from "react-router";
import {publicRoutes} from "../config/routes";

import {Main} from "./Main";

const AppRouter = () => {
    return (
        <Routes>
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            <Route path="*" element={<Main/>}/>
        </Routes>
    );
};

export default AppRouter;