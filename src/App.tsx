import { Navigate, useRoutes } from "react-router";
import DataLayer from "./components/DataLayer";
import NoMatch from "./pages/404page";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import StateDataPage from "./pages/StateDataPage";

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
              element: <MapPage />,
            },
            {
              path: "/state/:stateCode/:title/:year",
              element: <StateDataPage />,
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
