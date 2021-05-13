import React, { memo, useEffect, useState } from "react";
import {
  getBanner,
  getRecommSongList,
  getDjHot,
  getMv,
  getNewSong,
  getRecommRadio,
} from "@Api/musicLib";
import { Carousel } from "antd-mobile";
import px2rem from "@/util/px2rem";
import styled from "styled-components";
import Category from "./category";
import { NavLink } from "react-router-dom";
const TabWrap = styled.div`
  overflow: hidden;
  margin-top: ${px2rem(10)};
  & > a {
    float: left;
    width: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #000;
  }
`;
function Recomm() {
  const [banners, setBanners] = useState([]);
  const [recommSongList, setRecommSongList] = useState([]);
  const [DjList, setDjList] = useState([]);
  const [mvList, setMvList] = useState([]);
  const [newSongList, setNewSongList] = useState([]);
  const [recommRadio, setRecommRadio] = useState([]);
  useEffect(() => {
    getBanner().then((res: any) => {
      setBanners(res.banners);
    });
    Promise.all([
      getRecommSongList(),
      getDjHot(),
      getMv(),
      getNewSong(),
      getRecommRadio(),
    ]).then(([res1, res2, res3, res4, res5]) => {
      setRecommSongList((res1 as any).result);
      setDjList((res2 as any).djRadios);
      setMvList((res3 as any).result);
      setNewSongList((res4 as any).result);
      setRecommRadio((res5 as any).programs);
    });
  }, []);
  const tabs = [
    { title: "歌手", icon: "icon-yonghu", color: "#8a8fdf", path: "/songer" },
    {
      title: "排行榜",
      icon: "icon-paixingbang",
      color: "#79b1ee",
      path: "/rank",
    },
    { title: "歌单", icon: "icon-gedan", color: "#7bd8bd" },
    { title: "电台", icon: "icon-diantai2", color: "#fac54f" },
  ];
  return (
    <>
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
      <Category title="推荐mv" list={mvList} />
      <Category title="推荐新音乐" list={newSongList} />
      <Category title="推荐歌单" list={recommSongList} />
      <Category title="推荐电台" list={DjList} />
      <Category title="推荐节目" list={recommRadio} />
    </>
  );
}

export default memo(Recomm);
