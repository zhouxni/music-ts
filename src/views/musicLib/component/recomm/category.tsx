import React, { memo, useMemo } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "@/assets/icon/iconfont.css";
import { useHistory } from "react-router-dom";
const DesName = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: ${px2rem(5)};
`;
function Category(props: { title: string; list: any[]; type: number }) {
  const { title, list, type } = props;
  const history = useHistory();
  const memoList = useMemo(() => list, [list]);
  const traceNumber = (num: number) => {
    return String(num).length > 4 ? (num / 10000).toFixed(2) + "万" : num;
  };
  const play = (id: number) => {
    switch (type) {
      case 1:
        history.push(`/playmv?id=${id}`);
        break;
      case 0:
        history.push(`/playmusic?id=${id}`);
        break;
      case 2:
        history.push(`/rankDetail?id=${id}`);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <h3 style={{ margin: `${px2rem(15)} 0`, fontWeight: 700 }}>{title}</h3>
      {memoList.length > 0 && (
        <>
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            {memoList.map((song, index) => {
              return (
                <li
                  style={{
                    width: "30%",
                    marginBottom: px2rem(10),
                  }}
                  key={index}
                  onClick={() => {
                    play(song.id);
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <LazyLoadImage
                      src={song.picUrl || song.coverUrl || song.coverImgUrl}
                      width="100%"
                    />
                    <i
                      style={{
                        position: "absolute",
                        bottom: px2rem(10),
                        left: px2rem(10),
                        color: "#fff",
                      }}
                      className="iconfont icon-play"
                    >
                      <span
                        style={{ fontSize: px2rem(12), marginLeft: px2rem(3) }}
                      >
                        {song.playCount ? traceNumber(song.playCount) : ""}
                      </span>
                    </i>
                  </div>
                  <DesName>{song.name}</DesName>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </>
  );
}

export default memo(Category);
