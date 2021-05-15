import React, { Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Routes from "./config";
import RouteChild from "./routeChild";
import KeepAlive, { AliveScope } from "react-activation";
function Router() {
  return (
    <Fragment>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Redirect to="/login"></Redirect>}
        />
        <AliveScope>
          {Routes.map((route, index) => {
            return (
              <Route
                exact={route.exact === false ? false : true}
                key={index}
                path={route.path}
                render={(props) =>
                  !route.keepAlive ? (
                    <RouteChild route={route} />
                  ) : (
                    <KeepAlive saveScrollPosition='screen'>
                      <RouteChild {...props} route={route} />
                    </KeepAlive>
                  )
                }
              />
            );
          })}
        </AliveScope>
      </Switch>
    </Fragment>
  );
}

export default Router;
