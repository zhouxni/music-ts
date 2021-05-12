import React from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";
import "@/assets/icon/iconfont.css";
const Tab = styled.div`
  width: 100%;
  height: ${px2rem(50)};
  border-top: ${px2rem(1)} solid #eee;
  position: fixed;
  left: 0;
  bottom: 0;
`;
function Home(props: { children: any[] }) {
  const { children } = props;
  return (
    <>
      {children &&
        children.map(({ component, path }, index) => {
          return <Route exact key={index} path={path} component={component} />;
        })}
      <Tab>
        <NavLink
          className={style.nav}
          activeClassName={style.tabActive}
          to="/home/musicLib"
          style={{ fontSize: px2rem(14) }}
        >
          <i
            className="iconfont icon-Homehomepagemenu1"
            style={{ fontSize: px2rem(20) }}
          ></i>
          曲库
        </NavLink>
        <NavLink
          className={style.nav}
          activeClassName={style.tabActive}
          to="/home/user"
          style={{ fontSize: px2rem(14) }}
        >
          <i
            className="iconfont icon-user1"
            style={{ fontSize: px2rem(20) }}
          ></i>
          本地
        </NavLink>
      </Tab>
    </>
  );
}
export default Home;
