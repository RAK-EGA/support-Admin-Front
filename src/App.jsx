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

import AcceptedTickets, {
  loader as acceptedTicketsLoader,
} from "./views/AcceptedTickets";
import TicketsHistory, {
  loader as ticketsHistoryLoader,
} from "./views/TicketsHistory";
import Ticket, {
  loader as ticketLoader,
  action as ticketAction,
} from "./views/Ticket";

import Requests, {
  loader as requestsLoader
} from "./views/Requests";
import AcceptedRequests, {
  loader as acceptedRequestsLoader
} from "./views/AcceptedRequests";
import RequestsHistory, {
  loader as requestsHistoryLoader
} from "./views/RequestsHistory";

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

import {
  action as dispatchAction,
} from "./views/DispatchTicket"
import {
  action as dispatchRequestAction,
} from "./views/DispatchRequest"
// import Users, {
//   action as usersAction,
//   loader as usersLoader,
// } from "./views/User";

// import {
//   action as deleteUsersAction,
// } from "./views/DeleteUsers"

import SignIn, {
  action as signInAction,
} from "./views/SignIn";
import EditAnnouncement, {
  loader as editAnnouncementLoader,
  action as editAnnouncementAction,
} from "./views/EditAnnouncement";
import Profile, {
  action as editProfileAction,
} from "./views/Profile";
import Auth from "./components/Auth";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorPage />}
    >
      <Route element={<Auth />}>
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
            />
            <Route
              path="tickets/:ticketId"
              element={<Ticket />}
              loader={ticketLoader}
              action={ticketAction}
            />
            <Route
              path="tickets/:ticketId/dispatch"
              action={dispatchAction}
            />
            <Route
              path="AcceptedTickets/"
              element={<AcceptedTickets />}
              loader={acceptedTicketsLoader}
            // action={} when going to specific
            />
            <Route
              path="AcceptedTickets/:ticketId"
              element={<Ticket />}
              loader={ticketLoader}
              action={ticketAction}
            />
            <Route
              path="TicketsHistory/"
              element={<TicketsHistory />}
              loader={ticketsHistoryLoader}
            // action={} when going to specific
            />
            <Route
              path="TicketsHistory/:ticketId"
              element={<Ticket />}
              loader={ticketLoader}
              action={ticketAction}
            />

            {/* AcceptedTickets */}
            <Route
              path="requests/"
              element={<Requests />}
              loader={requestsLoader}
            // action={}
            />

            <Route
              path="requests/:requestId"
              element={<Request />}
              loader={requestLoader}
              action={requestAction}
            />
            <Route
              path="requests/:requestId/dispatch"
              action={dispatchRequestAction}
            />
            <Route
              path="AcceptedRequests/"
              element={<AcceptedRequests />}
              loader={acceptedRequestsLoader}
            // action={} when going to specific
            />
            <Route
              path="AcceptedRequests/:requestId"
              element={<Request />}
              loader={requestLoader}
              action={requestAction}
            />
            <Route
              path="RequestsHistory/"
              element={<RequestsHistory />}
              loader={requestsHistoryLoader}
            // action={} when going to specific
            />
            <Route
              path="RequestsHistory/:requestId"
              element={<Request />}
              loader={requestLoader}
              action={requestAction}
            />

            <Route
              path="announcements/"
              element={<Announcements />}
              loader={announcementsLoader}
              action={announcementsAction}

            />
            <Route
              path="announcements/delete"
              action={deleteAnnouncementsAction}
            />
            {/* moved responsibility to Admin/Service domain */}
            {/* <Route
            path="users/"
            element={<Users />}
            action={usersAction}
            loader={usersLoader}
          />
          <Route
            path="users/delete"
            action={deleteUsersAction}
          /> */}
            <Route
              path="announcements/:id/:intent"
              element={<EditAnnouncement />}
              action={editAnnouncementAction}
              loader={editAnnouncementLoader}
            />
            <Route
              path="profile/"
              element={<Profile />}
              action={editProfileAction}
            // loader={editAnnouncementLoader}
            />


          </Route>
        </Route>

      </Route>

      <Route
        path="signIn/"
        element={<SignIn />}
        action={signInAction}

      >
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
