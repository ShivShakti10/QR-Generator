import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homepage from "./components/Homepage";
import BaseElement from "./components/BaseElement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseElement />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
