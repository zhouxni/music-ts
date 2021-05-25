import React, { useEffect, useState } from "react";
import { Djbanner } from "@Api/dj";
import styled from "styled-components";
import { Carousel } from "antd-mobile";
import px2rem from "@/util/px2rem";
import { NavLink } from "react-router-dom";
const Wrap = styled.div``;
const TabWrap = styled.div`
  overflow: hidden;
  margin-top: ${px2rem(10)};
  display: flex;
  justify-content: space-around;
  & > a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
  }
`;
function Transceiver() {
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    Djbanner().then((res) => {
      setBanners(res.data);
    });
  }, []);
  const tabs = [
    {
      title: "电台分类",
      icon: "icon-leimupinleifenleileibie2",
      color: "#8a8fdf",
      path: "/dj",
    },
    {
      title: "电台排行",
      icon: "icon-paixingbang",
      color: "#79b1ee",
      path:'/djrank'
    },
  ];
  return (
    <Wrap>
      {banners.length > 0 && (
        <Carousel infinite autoplay>
          {banners.map((banner: any, index) => {
            return (
              <img
                key={index}
                alt=""
                src={banner.pic}
                style={{ width: px2rem(375) }}
              />
            );
          })}
        </Carousel>
      )}
      <TabWrap>
        {tabs.map((tab, index) => {
          return (
            <NavLink key={index} to={tab.path || "/"}>
              <div
                style={{
                  width: px2rem(30),
                  height: px2rem(30),
                  borderRadius: "50%",
                  backgroundColor: tab.color,
                  textAlign: "center",
                  lineHeight: px2rem(30),
                  marginBottom: px2rem(5),
                }}
              >
                <i
                  className={`iconfont ${tab.icon}`}
                  style={{ color: "#fff" }}
                ></i>
              </div>
              <span>{tab.title}</span>
            </NavLink>
          );
        })}
      </TabWrap>
    </Wrap>
  );
}

export default Transceiver;
