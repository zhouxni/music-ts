import React from "react";
import { Route, Switch } from "react-router-dom";
function Home(props: { children: any[] }) {
  const { children } = props;
  console.log(children, "-----");
  return (
    <>
      <p>home</p>
      <Switch>
        {children &&
          children.map(({ component, path }, index) => {
            console.log(path);
            return (
              <Route exact key={index} path={path} component={component} />
            );
          })}
      </Switch>
    </>
  );
}
export default Home;
