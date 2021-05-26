import px2rem from "@/util/px2rem";
import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Toast } from "antd-mobile";
import { checkMusic } from "@/api/songer";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate, traceNumber, traceTime } from "@/util";
const Wrap = styled.div`
  .type {
    padding: ${px2rem(15)} ${px2rem(15)};
    padding-right: ${px2rem(50)};
    border-bottom: ${px2rem(1)} solid #eee;
    position: relative;
    p {
      font-size: ${px2rem(12)};
      color: #898989;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.5;
      margin-top: ${px2rem(5)};
    }
  }
  .type_1 {
    .mess {
      font-size: ${px2rem(12)};
      color: #898989;
      display: flex;
      white-space: nowrap;
      margin-top: ${px2rem(6)};
      line-height: 1.5;
      i {
        position: absolute;
        top: 50%;
        right: ${px2rem(20)};
        transform: translateY(-50%);
        font-size: ${px2rem(25)};
        color: #acb2b6;
      }
      p{
        margin-top: 0;
      }
    }
  }
  .type_1000,
  .type_1014,
  .type_10 {
    display: flex;
    align-items: center;
    img {
      width: ${px2rem(60)};
      border-radius: ${px2rem(5)};
      margin-right: ${px2rem(10)};
    }
    .mess {
      font-size: ${px2rem(12)};
      p {
        i {
          font-size: ${px2rem(12)};
          margin-left: ${px2rem(5)};
          display: inline-block;
          transform: scale(0.8);
        }
        span {
          margin-left: ${px2rem(5)};
        }
      }
    }
  }
  .type_1014 {
    img {
      width: ${px2rem(100)};
    }
  }
  .type_100,
  .type_1002 {
    display: flex;
    align-items: center;
    img {
      width: ${px2rem(50)};
      border-radius: 50%;
      margin-right: ${px2rem(10)};
    }
    h3 {
      font-size: ${px2rem(14)};
      span {
        color: #999999;
        margin-left: ${px2rem(5)};
      }
    }
  }
`;
function Song(props: any) {
  const { list, type } = props;
  const history = useHistory();
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
    <Wrap>
      {list.map((item: any, index: number) => {
        return (
          <div key={index}>
            {type === 1 && (
              <div className="type type_1" onClick={() => toMusic(item.id)}>
                {item.name}
                <div className="mess">
                  {item.ar.map((ar: any, index: any) => {
                    return (
                      <span key={index}>
                        {ar.name}
                        {index !== item.ar.length - 1 && <>、</>}
                      </span>
                    );
                  })}
                  {item.al.name && <p>&nbsp;-&nbsp;{item.al.name}</p>}
                  {item.mv > 0 && (
                    <i
                      className="iconfont icon-boshiweb_bofang"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/playmv?id=${item.mv}`);
                      }}
                    ></i>
                  )}
                </div>
                {item.alia[0] && <p>{item.alia[0]}</p>}
              </div>
            )}
            {type === 1000 && (
              <div
                className="type type_1000"
                onClick={() => history.push(`/rankDetail?id=${item.id}`)}
              >
                <LazyLoadImage src={item.coverImgUrl} />
                <div className="mess">
                  <h3>{item.name}</h3>
                  <p>
                    {item.trackCount}首歌曲 {item.creator.nickname}
                    <i className="iconfont icon-play1"></i>
                    {traceNumber(item.playCount)}次播放
                  </p>
                </div>
              </div>
            )}
            {type === 1014 && (
              <div
                className="type type_1014"
                onClick={() => {
                  if (item.type === 0) {
                    history.push(`/playmv?id=${item.vid}`);
                  } else {
                    history.push(`/playvideo?id=${item.vid}`);
                  }
                }}
              >
                <div style={{ position: "relative" }}>
                  <LazyLoadImage src={item.coverUrl} />
                  <span
                    style={{
                      position: "absolute",
                      right: px2rem(15),
                      bottom: px2rem(5),
                      color: "#fff",
                      fontSize: px2rem(12),
                    }}
                  >
                    {traceTime(item.durationms)}
                  </span>
                </div>
                <div className="mess">
                  <h3>{item.title}</h3>
                  <p>
                    {item.creator.map((user: any, index: any) => {
                      return (
                        <span key={index}>
                          {user.userName}
                          {index !== item.creator.length - 1 && <>、</>}
                        </span>
                      );
                    })}
                    &nbsp;|&nbsp;
                    <i className="iconfont icon-play1"></i>
                    {traceNumber(item.playTime)}次播放
                  </p>
                </div>
              </div>
            )}
            {type === 100 && (
              <div
                className="type type_100"
                onClick={() => history.push(`/songerdetail?id=${item.id}`)}
              >
                <LazyLoadImage src={item.img1v1Url} />
                <h3>
                  {item.name}
                  {item.alias[0] && <span>({item.alias[0]})</span>}
                </h3>
              </div>
            )}
            {type === 10 && (
              <div
                className="type type_10"
                onClick={() => history.push(`/album?id=${item.id}`)}
              >
                <LazyLoadImage src={item.picUrl} />
                <div className="mess">
                  <h3>{item.name}</h3>
                  <p>
                    {item.artist.name}
                    <span>{formatDate(item.publishTime, "yyyy-MM-dd")}</span>
                  </p>
                </div>
              </div>
            )}
            {type === 1002 && (
              <div className="type type_1002">
                <LazyLoadImage src={item.avatarUrl} />
                <div className="mess">
                  <h3>{item.nickname}</h3>
                  {item.signature && <p>{item.signature}</p>}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </Wrap>
  );
}

export default memo(Song);
