import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Routes from "./config";
import RouteChild from "./routeChild";
import { KeepAlive } from "react-keep-alive";
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
          if (route.keepAlive === false) {
            return (
              <Route
                exact={route.exact === false ? false : true}
                key={index}
                path={route.path}
                render={() => <RouteChild route={route} />}
              />
            );
          } else {
            return (
              <Route key={index} path={route.path}>
                <KeepAlive name={route.name}>
                  <route.component />
                </KeepAlive>
              </Route>
            );
          }
        })}
      </Switch>
    </Fragment>
  );
}

export default Router;
