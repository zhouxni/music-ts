import React from "react";
import NavBar from "../component/navBar";
function RouteChild(props: { route: any }) {
  const { title, component: Route, back, children } = props.route;
  return (
    <>
      {title ? <NavBar title={title} back={back} /> : <></>}
      <Route children={children} />
    </>
  );
}

export default RouteChild;
