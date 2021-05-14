import React, { memo, useEffect, useState } from "react";
import { getRankDetail } from "@Api/rank";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { formatDate } from "@/util/index";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Wrap = styled.div`
  padding: ${px2rem(15)} ${px2rem(10)} 0;
  img {
    width: ${px2rem(115)};
    display: block;
    border-radius: ${px2rem(4)};
  }
  .icon-play,
  .date {
    position: absolute;
    bottom: ${px2rem(10)};
    right: ${px2rem(10)};
    font-size: ${px2rem(20)};
    color: #fff;
  }
  .date {
    left: ${px2rem(10)};
    font-size: ${px2rem(12)};
  }
  .list {
    margin-bottom: ${px2rem(10)};
    display: flex;
    align-items: center;
    .tracks {
      padding-left: ${px2rem(10)};
      flex: 1;
      overflow: hidden;
    }
    .trackItem {
      p {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      &:not(:last-of-type) {
        margin-bottom: ${px2rem(15)};
      }
    }
  }
  .official {
    margin-top: ${px2rem(50)};
    & > h3 {
      text-align: center;
    }
    &_list {
      display: flex;
      flex-wrap: wrap;
      margin-top: ${px2rem(20)};
    }
    &_item {
      position: relative;
      margin-bottom: ${px2rem(5)};
      &:not(:nth-child(3n + 3)) {
        margin-right: ${px2rem(5)};
      }
    }
  }
`;
function Rank() {
  const [rankList, setRankList] = useState([]);
  useEffect(() => {
    getRankDetail().then((res: any) => {
      setRankList(res.list);
    });
  }, []);
  return (
    <Wrap>
      {rankList
        .filter((rank: any) => rank.tracks.length)
        .map((rank: any, index) => {
          return (
            <div key={index} className="list">
              <div style={{ position: "relative" }}>
                <p className="date">
                  {formatDate(rank.updateTime, "MM-dd")}更新
                </p>
                <i className="iconfont icon-play"></i>
                <LazyLoadImage src={rank.coverImgUrl} width={px2rem(100)} />
              </div>
              <div className="tracks">
                {rank.tracks.map((track: any, index: number) => {
                  return (
                    <div key={index} className="trackItem">
                      <p>
                        {index + 1}.{track.first}
                        <span>-{track.second}</span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      <div className="official">
        <h3>官方榜</h3>
        <div className="official_list">
          {rankList
            .filter((rank: any) => rank.tracks.length === 0)
            .map((rank: any, index) => {
              return (
                <div className="official_item">
                  <p className="date">
                    {formatDate(rank.updateTime, "MM-dd")}更新
                  </p>
                  <i className="iconfont icon-play"></i>
                  <LazyLoadImage src={rank.coverImgUrl} width={px2rem(100)} />
                </div>
              );
            })}
        </div>
      </div>
    </Wrap>
  );
}

export default memo(Rank);
