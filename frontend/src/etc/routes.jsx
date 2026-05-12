import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants";

import Layout     from "../components/Layout";
import Home       from "../pages/Home";
import UsersPage  from "../pages/Users";
import UserDetail from "../pages/UserDetail";
import UsersJson  from "../pages/UsersJson";
import NotFound   from "../pages/NotFound";

/**
 * AppRoutes
 * Central route configuration for the app.
 * Rendered once inside <BrowserRouter> in App.jsx.
 *
 * Route tree:
 *   /                 → Home (overview + API health)
 *   /users            → UsersPage (DB CRUD table)
 *   /users/json       → UsersJson  (filesystem JSON store)
 *   /users/:id        → UserDetail (single user detail + edit/delete)
 *   *                 → NotFound   (404 fallback)
 */
export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME}        element={<Home />}       />
        <Route path={ROUTES.USERS}       element={<UsersPage />}  />
        <Route path={ROUTES.USERS_JSON}  element={<UsersJson />}  />
        <Route path={ROUTES.USER_DETAIL} element={<UserDetail />} />
        <Route path="*"                  element={<NotFound />}   />
      </Route>
    </Routes>
  );
}