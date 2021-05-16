import React, { memo, useEffect, useState } from "react";
import { getUrlQuery } from "@/util/index";
import { getSongerInfo } from "@Api/songer";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import Button from "@Component/button";
import { Icon, Tabs, Badge } from "antd-mobile";
import Song from "./component/song";
import Album from "./component/album";
import Mv from "./component/mv";
import Desc from "./component/desc";
const Wrap = styled.div`
  position: relative;
  height: 100%;
  & > .header {
    height: ${px2rem(200)};
    background-color: #555459;
    display: flex;
    align-items: center;
    padding: 0 ${px2rem(20)};
    position: sticky;
    top: 0;
    z-index: 999;
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
  .am-tabs {
    height: calc(100% - ${px2rem(215)});
  }
  .tabCon {
    height: 100%;
  }
`;
const IconWrap = styled.div`
  position: absolute;
  top: ${px2rem(14)};
  left: ${px2rem(10)};
`;
function SongerDetail(props: any) {
  const history = useHistory();
  const [artist, setArtist] = useState<any>({});
  const tabs = [
    {
      title: (
        <Badge overflowCount={10000} text={artist.musicSize || 0}>
          单曲
        </Badge>
      ),
    },
    {
      title: (
        <Badge overflowCount={10000} text={artist.albumSize || 0}>
          专辑
        </Badge>
      ),
    },
    {
      title: (
        <Badge overflowCount={10000} text={artist.mvSize || 0}>
          MV
        </Badge>
      ),
    },
    { title: "详情" },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const id = getUrlQuery(props.location.search).get("id");
  useEffect(() => {
    setTabIndex(0);
    getSongerInfo({ id }).then((res: any) => {
      setArtist(res.artist);
    });
  }, [id]);
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
            <span>{artist.alias ? artist.alias[0] : ""}</span>
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
        destroyInactiveTab
        page={tabIndex}
        onChange={(tab, index) => {
          setTabIndex(index);
        }}
      >
        {tabIndex === 0 && (
          <div className="tabCon">
            <Song id={id} />
          </div>
        )}
        {tabIndex === 1 && (
          <div className="tabCon">
            <Album id={id} />
          </div>
        )}
        {tabIndex === 2 && (
          <div className="tabCon">
            <Mv id={id} />
          </div>
        )}
        {tabIndex === 3 && (
          <div className="tabCon">
            <Desc id={id} />
          </div>
        )}
      </Tabs>
    </Wrap>
  );
}

export default memo(SongerDetail);
