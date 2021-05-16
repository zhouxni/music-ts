import React, { memo, useEffect, useRef, useState } from "react";
import { getMvList } from "@Api/songer";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { useHistory } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loadmore from "@Component/loadmore";
const ListItem = styled.div`
  padding: ${px2rem(15)};
  display: flex;
  border-bottom: ${px2rem(1)} solid #f0f0f0;
  align-items: center;
  img {
    width: ${px2rem(120)};
    border-radius: ${px2rem(4)};
  }
  .cover {
    position: absolute;
    top: ${px2rem(5)};
    left: ${px2rem(5)};
    color: #fff;
    font-size: ${px2rem(12)};
    background: rgba(0, 0, 0, 0.65);
    padding: ${px2rem(3)} ${px2rem(5)};
    border-radius: ${px2rem(3)};
  }
  .mv_info {
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
function Mv(props: { id: string | null }) {
  const [list, setList] = useState([]);
  const history = useHistory();
  const pageNo = useRef(1);
  const [finished, setFinish] = useState(false);
  const load = useRef(false);
  useEffect(() => {
    getMvList({ id: props.id }).then((res: any) => {
      setList(res.mvs);
      if (!res.hasMore) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, []);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getMvList({ id: props.id, offset: (pageNo.current - 1) * 10 })
        .then((res: any) => {
          setList(list.concat(res.mvs));
          if (!res.hasMore) {
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
    <>
      <Loadmore onload={onLoad} finished={finished}>
        {list.map((mv: any, index) => {
          return (
            <ListItem
              key={index}
              onClick={() => history.push(`/playmv?id=${mv.id}`)}
            >
              <div style={{ position: "relative" }}>
                <LazyLoadImage src={mv.imgurl} />
                <span className="cover">MV</span>
              </div>
              <div className="mv_info">
                <h4>{mv.name}</h4>
                <span>
                  {mv.artistName} | {mv.playCount}次播放
                </span>
              </div>
            </ListItem>
          );
        })}
      </Loadmore>
    </>
  );
}

export default memo(Mv);
