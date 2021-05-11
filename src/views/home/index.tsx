import React from "react";
import { Route } from "react-router-dom";
function Home(props: { children: any[] }) {
  const { children } = props;
  return (
    <>
      <p>home</p>
      {children &&
        children.map(({ component, path }, index) => {
          return <Route exact key={index} path={path} component={component} />;
        })}
    </>
  );
}
export default Home;
