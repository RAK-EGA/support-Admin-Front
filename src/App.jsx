import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// import Root from "./views/Root";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<div>Hellow baby</div>}
      errorElement={<div>Oh no baby</div>}
    >

    </Route>
  )
);


function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App
