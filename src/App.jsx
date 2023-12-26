import Root from "./views/Root";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Tickets, {
  loader as ticketsLoader,
} from "./views/Tickets";

import Ticket, {
  loader as ticketLoader,
  action as ticketAction,
} from "./views/Ticket";

import Requests, {
  loader as requestsLoader
} from "./views/Requests";

import Request, {
  loader as requestLoader,
  action as requestAction,
} from "./views/Request";

import Index from "./views/Index";

import ErrorPage from "./views/ErrorPage";

import Announcements, {
  loader as announcementsLoader,
  action as announcementsAction,
} from "./views/Announcements";

import {
  action as deleteAnnouncementsAction,
} from "./views/DeleteAnnouncements"


import Users,{
  action as usersAction,
  loader as usersLoader,
} from "./views/User";

import {
  action as deleteUsersAction,
} from "./views/DeleteUsers"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
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
        <Route
          path="tickets/:ticketId"
          element={<Ticket />}
          loader={ticketLoader}
          action={ticketAction}
        />
        <Route
          path="requests/:requestId"
          element={<Request />}
          loader={requestLoader}
          action={requestAction}
        />

        <Route
          path="announcements/"
          element={<Announcements />}
          loader={announcementsLoader}
          action={announcementsAction }
        />
        <Route
          path="announcements/delete"
          action={deleteAnnouncementsAction}
        />
        <Route
          path="users/"
          element={<Users/>}
          action={usersAction}
          loader={usersLoader}
        />
        <Route
          path="users/delete"
          action={deleteUsersAction}
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
