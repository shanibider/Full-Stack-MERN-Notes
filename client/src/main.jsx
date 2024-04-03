import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import NoteList from "./components/NoteList";
import "./index.css";
import NoteForm from "./components/NoteForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <NoteList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <NoteForm />, // Render CreateNote component for /create path
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <NoteForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
