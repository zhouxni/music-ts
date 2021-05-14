import React, { memo, useEffect, useState } from "react";
import { getUrlQuery } from "@/util/index";
import { getSongerInfo, getArtist, getDesc } from "@Api/songer";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import Button from "@Component/button";
import { Icon, Tabs, Badge } from "antd-mobile";
import { useHistory } from "react-router-dom";
import Song from "./component/song";
import Album from "./component/album";
import Mv from "./component/mv";
import Desc from "./component/desc";
const Wrap = styled.div`
  & > .header {
    height: ${px2rem(200)};
    background-color: #555459;
    display: flex;
    align-items: center;
    padding: 0 ${px2rem(20)};
    position: relative;
    margin-bottom: ${px2rem(15)};
    img {
      width: ${px2rem(120)};
      border-radius: 50%;
    }
    .header_mess {
      padding-left: ${px2rem(15)};
      h3 {
        color: #fff;
        margin-bottom: ${px2rem(8)};
      }
      span {
        color: #b8b2b2;
      }
    }
  }
`;
const IconWrap = styled.div`
  position: absolute;
  top: ${px2rem(14)};
  left: ${px2rem(10)};
`;
function SongerDetail() {
  const { search } = useLocation();
  const [songList, setSongList] = useState([]);
  const [artist, setArtist] = useState<any>({});
  const history = useHistory();
  const id = getUrlQuery(search).get("id");
  const tabs = [
    { title: "单曲" },
    { title: <Badge text={artist.albumSize || 0}>专辑</Badge> },
    { title: <Badge text={artist.mvSize || 0}>MV</Badge> },
    { title: "详情" },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  useEffect(() => {
    getSongerInfo({ id }).then((res: any) => {
      setSongList(res.hotSongs);
      setArtist(res.artist);
    });
  }, []);
  return (
    <Wrap>
      {Object.keys(artist).length > 0 && (
        <div className="header">
          <IconWrap onClick={() => history.goBack()}>
            <Icon type="left" color="#fff" />
          </IconWrap>
          <img alt="" src={artist.img1v1Url} />
          <div className="header_mess">
            <h3>{artist.name}</h3>
            <span>{artist.alias[0]}</span>
            <br />
            <Button
              style={{
                borderRadius: px2rem(20),
                fontSize: px2rem(16),
                margin: `${px2rem(8)} 0 0`,
                width: px2rem(95),
              }}
              fontColor="#e4e0df"
              color="#b7b1b1"
            >
              + 收藏
            </Button>
          </div>
        </div>
      )}
      <Tabs
        tabBarUnderlineStyle={{ borderColor: "#ffdf20" }}
        tabBarTextStyle={{ color: "#828282" }}
        tabBarActiveTextColor="#000"
        tabs={tabs}
        onChange={(tab, index) => {
          setTabIndex(index);
        }}
      >
        {tabIndex === 0 && <Song list={songList} />}
        {tabIndex === 1 && <Album />}
        {tabIndex === 2 && <Mv />}
        {tabIndex === 3 && <Desc />}
      </Tabs>
    </Wrap>
  );
}

export default memo(SongerDetail);
