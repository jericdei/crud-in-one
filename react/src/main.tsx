import "./index.css";
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css

import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import Crud from "./routes/crud";

const router = createBrowserRouter([
{
    path: "/",
    element: <Root />,
    children: [
        {
            path: "/",
            element: <Crud />
        }
    ]
},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
