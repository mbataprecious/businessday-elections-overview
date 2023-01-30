import { useRoutes } from "react-router";
import NoMatch from "./pages/404page";
import Home from "./pages/Home";
import MapFuture from "./pages/MapFuture";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <>
      {useRoutes([
        {
          path: "",
          element: <Home />,
        },
        {
          path: "map",
          element: <MapPage />,
          children: [],
        },
        {
          path: "map/future",
          element: <MapFuture />,
          children: [],
        },
        {
          path: "*",
          element: <NoMatch />,
        },
      ])}
    </>
  );
}

export default App;
