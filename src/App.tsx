import { Navigate, useRoutes } from "react-router";
import DataLayer from "./components/DataLayer";
import NoMatch from "./pages/404page";
import Home from "./pages/Home";

function App() {
  return (
    <>
      {useRoutes([
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "",
              element: <Navigate to="/governor/2019" replace />,
            },
            {
              path: ":title/:year",
              element: <DataLayer />,
            },
            {
              path: "*",
              element: <NoMatch />,
            },
          ],
        },
      ])}
    </>
  );
}

export default App;
