import React, { Fragment } from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Routes from "./config";
import NavBar from "../component/navBar";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/login"></Redirect>}
        />
        {Routes.map((route, index) => {
          return (
            <Fragment key={index}>
              <NavBar title={route.title} />
              <Route path={route.path} exact component={route.component} />
            </Fragment>
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
