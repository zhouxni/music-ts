import React, { useEffect } from "react";
import NavBar from "../component/navBar";
import { useHistory } from "react-router-dom";
function RouteChild(props: { route: any }) {
  const { title, component: Route, back, children, redirect } = props.route;
  const history = useHistory();
  useEffect(() => {
    if (redirect) {
      history.push(redirect);
    }
  }, []);
  return (
    <>
      {title ? <NavBar title={title} back={back} /> : <></>}
      <Route children={children} />
    </>
  );
}

export default RouteChild;
