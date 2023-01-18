import { useRoutes } from "react-router";
import NoMatch from "./pages/404page";
import Home from "./pages/Home";
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
          path: "*",
          element: <NoMatch />,
        },
      ])}
    </>
  );
}

export default App;
