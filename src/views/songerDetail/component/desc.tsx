import React, { memo, useEffect, useState } from "react";
import { getArtistDetail, getSimiArtist } from "@Api/songer";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Wrap = styled.div`
  padding: ${px2rem(15)};
  h3 {
    font-weight: 700;
    margin-bottom: ${px2rem(5)};
  }
  p {
    color: #303030;
    line-height: 2;
    text-indent: ${px2rem(20)};
  }
  .open {
    padding: ${px2rem(10)};
    color: #4b6593;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .simi {
    padding: ${px2rem(15)} 0;
  }
  .artists {
    white-space: nowrap;
    overflow: auto;
    margin-top: ${px2rem(15)};
    &::-webkit-scrollbar {
      height: 0;
    }
    .artists_item {
      width: ${px2rem(50)};
      display: inline-block;
      vertical-align: top;
      &:not(:last-of-type) {
        margin-right: ${px2rem(15)};
      }
      h4 {
        white-space: pre-wrap;
        word-break: break-all;
      }
    }
    img {
      width: ${px2rem(50)};
      border-radius: 50%;
    }
  }
`;
function Desc(props: { id: string | null }) {
  const [desc, setDesc] = useState<any>({});
  const [artists, setArtists] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const { id } = props;
  console.log(1)
  useEffect(() => {
    getArtistDetail({ id }).then((res) => {
      setDesc(res.data.artist);
    });
    getSimiArtist({ id }).then((res: any) => {
      setArtists(res.artists);
    });
  }, []);
  return (
    <Wrap>
      <div className="desc">
        <h3>歌手信息</h3>
        <div
          style={{ height: open ? "auto" : px2rem(140), overflow: "hidden" }}
        >
          <p>{desc.briefDesc}</p>
        </div>
        <div className="open" onClick={() => setOpen(!open)}>
          更多歌手信息
          <Icon size="xs" type={open ? "up" : "down"} />
        </div>
      </div>
      {artists.length > 0 && (
        <div className="simi">
          <h3>相似歌手</h3>
          <div className="artists">
            {artists.map((artist, index) => {
              return (
                <div
                  key={index}
                  onClick={() => history.push(`/songerdetail?id=${artist.id}`)}
                  className="artists_item"
                >
                  <LazyLoadImage src={artist.img1v1Url} />
                  <h4>{artist.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Wrap>
  );
}

export default memo(Desc);
