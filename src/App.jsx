import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./views/Root";
import Tickets, {
  loader as ticketsLoader,
} from "./views/Tickets";

import Requests, {
  loader as requestsLoader
} from "./views/Requests";
import Index from "./views/Index";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<div>Oh no baby</div>}
    >
      <Route errorElement={<div>Oh no baby</div>}>
        <Route index element={<Index />} />
        <Route
          path="tickets/"
          element={<Tickets />}
          loader={ticketsLoader}
        // action={} when going to specific
        />
        <Route
          path="requests/"
          element={<Requests />}
          loader={requestsLoader}
        // action={}
        />

      </Route>
    </Route>
  )
);


function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App
