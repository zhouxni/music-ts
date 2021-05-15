import React, { memo } from "react";
import { Route } from "react-router-dom";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { NavLink } from "react-router-dom";
import style from "./index.module.scss";
import "@/assets/icon/iconfont.css";
import Search from "./search";
import { KeepAlive } from "react-keep-alive";
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
      <Search />
      <div style={{ height: `calc(100% - ${px2rem(100)})` }}>
        {children &&
          children.map((route, index) => {
            return (
              <Route key={index} exact path={route.path}>
                <KeepAlive name={route.name}>
                  <route.component />
                </KeepAlive>
              </Route>
            );
          })}
      </div>
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
export default memo(Home);
