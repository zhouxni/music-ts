import React, { memo, useEffect, useRef, useState } from "react";
import { getSongAlbum } from "@Api/songer";
import styled from "styled-components";
import { LazyLoadImage } from "react-lazy-load-image-component";
import px2rem from "@/util/px2rem";
import { formatDate } from "@/util";
import Loadmore from "@Component/loadmore";
import { useHistory } from "react-router-dom";
const AlbumItem = styled.div`
  padding: ${px2rem(15)};
  display: flex;
  border-bottom: ${px2rem(1)} solid #f0f0f0;
  align-items: center;
  img {
    width: ${px2rem(50)};
    height: ${px2rem(50)};
    border-radius: ${px2rem(4)};
  }
  .album_info {
    padding-left: ${px2rem(10)};
    & > h4 {
      margin-bottom: ${px2rem(5)};
    }
    & > span {
      color: #929292;
      font-size: ${px2rem(12)};
    }
  }
`;
function Album(props: { id: string | null }) {
  const { id } = props;
  const [albums, setAlbums] = useState<any[]>([]);
  const [finished, setFinish] = useState(false);
  const history = useHistory();
  const pageNo = useRef(1);
  const load = useRef(false);
  useEffect(() => {
    getSongAlbum({ id }).then((res: any) => {
      setAlbums(res.hotAlbums);
      if (!res.more) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, []);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getSongAlbum({ id, offset: (pageNo.current - 1) * 30 })
        .then((res: any) => {
          setAlbums(albums.concat(res.hotAlbums));
          if (!res.more) {
            setFinish(true);
            return;
          }
          pageNo.current++;
        })
        .finally(() => {
          load.current = false;
        });
    }
  };
  return (
    <Loadmore onload={onLoad} finished={finished}>
      {albums.map((album, index) => {
        return (
          <AlbumItem
            key={index}
            onClick={() => history.push(`/album?id=${album.id}`)}
          >
            {<LazyLoadImage src={album.picUrl} />}
            <div className="album_info">
              <h4>{album.name}</h4>
              <span>{formatDate(album.publishTime, "yyyy-MM-dd")}</span>
            </div>
          </AlbumItem>
        );
      })}
    </Loadmore>
  );
}

export default memo(Album);
