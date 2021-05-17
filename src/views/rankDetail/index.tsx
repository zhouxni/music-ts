import React, { memo, useEffect, useState } from "react";
import { getUrlQuery } from "@/util/index";
import { checkMusic, getPlayList } from "@Api/songer";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { Icon, Toast } from "antd-mobile";
import { formatDate } from "@/util";
import "@/assets/icon/iconfont.css";
import copy from "copy-to-clipboard";
const Wrap = styled.div`
  position: relative;
  height: 100%;
  overflow: auto;
  & > .header {
    background-color: #555459;
    padding: 0 ${px2rem(20)};
    position: sticky;
    top: 0;
    z-index: 999;
    img {
      width: ${px2rem(120)};
      border-radius: ${px2rem(6)};
    }
    .header_mess {
      padding-left: ${px2rem(15)};
      h3 {
        color: #fff;
        margin-bottom: ${px2rem(15)};
      }
      span {
        color: #b8b2b2;
      }
    }
    .operate {
      padding: ${px2rem(20)} ${px2rem(10)};
      display: flex;
      justify-content: space-between;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;
        & > i {
          font-size: ${px2rem(25)};
          margin-bottom: ${px2rem(5)};
        }
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
const ListItem = styled.div`
  padding: ${px2rem(15)};
  padding-right: ${px2rem(60)};
  border-bottom: ${px2rem(1)} solid #f0f0f0;
  position: relative;
  h3 {
    font-weight: 400;
    font-size: ${px2rem(16)};
    margin-bottom: ${px2rem(8)};
  }
  p {
    color: #5a5a5a;
    span {
      color: #828282;
    }
  }
  .icon-boshiweb_bofang {
    position: absolute;
    top: 50%;
    right: ${px2rem(30)};
    transform: translateY(-50%);
    font-size: ${px2rem(25)};
    color: #acb2b6;
  }
`;
function RankDetail(props: any) {
  const history = useHistory();
  const [rank, setRank] = useState<any>({});
  const id = getUrlQuery(props.location.search).get("id");
  useEffect(() => {
    (document.querySelector("#wrapRank") as HTMLElement).scrollTop = 0;
    getPlayList({ id }).then((res: any) => {
      setRank(res.playlist);
    });
  }, [id]);
  const toMusic = (id: number) => {
    checkMusic({ id })
      .then(() => {
        history.push(`/playmusic?id=${id}`);
      })
      .catch(() => {
        Toast.info("亲爱的,暂无版权");
      });
  };
  return (
    <Wrap id="wrapRank">
      {Object.keys(rank).length > 0 && (
        <div className="header">
          <IconWrap onClick={() => history.goBack()}>
            <Icon type="left" color="#fff" />
          </IconWrap>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: px2rem(50),
            }}
          >
            <img alt="" src={rank.coverImgUrl} />
            <div className="header_mess">
              <h3>{rank.name}</h3>
              <p style={{ color: "#f5efed", fontSize: px2rem(12) }}>
                更新时间: {formatDate(rank.trackUpdateTime, "yyyy-MM-dd")}
              </p>
            </div>
          </div>
          <div className="operate">
            <div onClick={() => history.push(`/comment?id=${id}`)}>
              <i className="iconfont icon-pinglun"></i>
              <span>{rank.commentCount}</span>
            </div>
            <div>
              <i className="iconfont icon-tianjiazengjiajia"></i>
              <span>添加到</span>
            </div>
            <div
              onClick={() => {
                copy(window.location.href);
                Toast.info("链接已复制成功");
              }}
            >
              <i className="iconfont icon-fenxiang"></i>
              <span>分享</span>
            </div>
          </div>
        </div>
      )}
      {rank.tracks &&
        rank.tracks.map((song: any, index: any) => {
          return (
            <ListItem
              key={index}
              style={{
                opacity: song.mv === 0 ? "0.5" : "1",
                pointerEvents: song.mv === 0 ? "none" : "auto",
              }}
              onClick={() => {
                toMusic(song.id);
              }}
            >
              <h3>{song.name}</h3>
              <p>
                {song.ar.map((ar: any) => ar.name).join("/")}
                <span> - {song.al.name}</span>
              </p>
              {song.mv >= 0 && (
                <i
                  className="iconfont icon-boshiweb_bofang"
                  onClick={(e) => {
                    e.stopPropagation();
                    history.push(`/playmv?id=${song.mv}`);
                  }}
                ></i>
              )}
            </ListItem>
          );
        })}
    </Wrap>
  );
}

export default memo(RankDetail);
