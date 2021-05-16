import React, { useEffect } from "react";
import NavBar from "../component/navBar";
import { useHistory } from "react-router-dom";
import px2rem from "@/util/px2rem";
function RouteChild(props: any) {
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
      <div
        id="routeChild"
        style={{
          height: title ? `calc(100% - ${px2rem(50)})` : "100%",
          overflow: "auto",
        }}
      >
        <Route {...props} children={children} />
      </div>
    </>
  );
}

export default RouteChild;
