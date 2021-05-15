import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import "@/assets/icon/iconfont.css";
import { useHistory } from "react-router-dom";
import { getSongs } from "@Api/songer";
import Loadmore from "@/component/loadmore";
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
function Song(props: { id: string | null }) {
  const history = useHistory();
  const [list, setList] = useState<any[]>([]);
  const [finished, setFinish] = useState(false);
  const pageNo = useRef(1);
  const load = useRef(false);
  useEffect(() => {
    getSongs({ id: props.id, limit: 20 }).then((res: any) => {
      setList(res.songs);
      if (res.songs.length >= res.total) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, []);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getSongs({
        id: props.id,
        offset: (pageNo.current - 1) * 20,
        limit: 20,
      }).then((res: any) => {
        const newList = list.concat(res.songs);
        load.current = false;
        setList(newList);
        if (newList.length >= res.total) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      });
    }
  };
  return (
    <Loadmore onload={onLoad} finished={finished}>
      {list.map((song, index) => {
        return (
          <ListItem
            key={index}
            style={{
              opacity: song.mv === 0 ? "0.5" : "1",
              pointerEvents: song.mv === 0 ? "none" : "auto",
            }}
            onClick={() => history.push(`/playmusic?id=${song.id}`)}
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
    </Loadmore>
  );
}

export default memo(Song);
