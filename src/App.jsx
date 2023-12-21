import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Root from "./views/Root";
import Tickets from "./views/Tickets";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<div>Oh no baby</div>}
    >
      <Route errorElement={<div>Oh no baby</div>}>
        <Route index element={<div>AA</div>} />
        <Route
          path="tickets/"
          element={<Tickets/>}
          // loader={}
          // action={}
        />
        <Route
          path="contacts/:contactId/edit"
          element={<div>AA</div>}
          // loader={}
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
