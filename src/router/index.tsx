import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Routes from "./config";
import RouteChild from "./routeChild";
function Router() {
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/login"></Redirect>}
        />
        {Routes.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              exact
              render={() => <RouteChild route={route} />}
            />
          );
        })}
      </Switch>
    </Fragment>
  );
}

export default Router;
