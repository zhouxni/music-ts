import px2rem from "@/util/px2rem";
import React, { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getHighqualityList, getPlayListTop } from "@Api/songer";
import Loadmore from "@Component/loadmore";
import Category from "@/views/musicLib/component/recomm/category";
const Wrap = styled.div`
  height: 100%;
  .tags {
    overflow: hidden;
  }
  .tag {
    float: left;
    width: 25%;
    padding: ${px2rem(15)} 0;
    text-align: center;
    border-bottom: ${px2rem(1)} solid #efefef;
    &:not(:nth-child(4n + 4)) {
      border-right: ${px2rem(1)} solid #efefef;
    }
  }
  .tabActive {
    color: #efefef;
    background: #fce024;
  }
`;
function PlayCategory(props: { tags: any[]; type: number }) {
  const { tags, type } = props;
  const [list, setList] = useState<any[]>([]);
  const [tab, setTab] = useState("全部");
  const before = useRef(undefined);
  const [finished, setFinish] = useState(false);
  const load = useRef(false);
  const pageNo = useRef(1);
  useEffect(() => {
    if (type === 1) {
      getHighqualityList({}).then((res: any) => {
        setList(res.playlists);
        if (!res.more) {
          setFinish(true);
          return;
        }
        before.current = res.lasttime;
      });
    } else {
      getPlayListTop({}).then((res: any) => {
        setList(res.playlists);
        if (!res.more) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      });
    }
  }, []);
  const init = (tag: string) => {
    setTab(tag);
    setFinish(false);
    setList([]);
    if (type === 1) {
      before.current = undefined;
      getHighqualityList({ cat: tag, before: before.current }).then(
        (res: any) => {
          setList(res.playlists);
          if (!res.more) {
            setFinish(true);
            return;
          }
          before.current = res.lasttime;
        }
      );
    } else {
      pageNo.current = 1;
      getPlayListTop({ cat: tag, offset: (pageNo.current - 1) * 50 }).then(
        (res: any) => {
          setList(res.playlists);
          if (!res.more) {
            setFinish(true);
            return;
          }
          pageNo.current++;
        }
      );
    }
  };
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      if (type === 1) {
        getHighqualityList({ cat: tab, before: before.current })
          .then((res: any) => {
            setList(list.concat(res.playlists));
            if (!res.more) {
              setFinish(true);
              return;
            }
            before.current = res.lasttime;
          })
          .finally(() => {
            load.current = false;
          });
      } else {
        getPlayListTop({ cat: tab, offset: (pageNo.current - 1) * 50 })
          .then((res: any) => {
            setList(list.concat(res.playlists));
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
    }
  };
  return (
    <Wrap>
      <Loadmore onload={onLoad} finished={finished}>
        <div className="tags">
          {tags.map((tag, index) => {
            return (
              <div
                key={index}
                className={`tag ${tab === tag.name ? "tabActive" : ""}`}
                onClick={() => init(tag.name)}
              >
                {tag.name}
              </div>
            );
          })}
        </div>
        <div style={{ padding: `0 ${px2rem(8)}` }}>
          <Category
            list={list}
            title={type === 1 ? "精品歌单" : "全部歌单"}
            type={2}
          />
        </div>
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayCategory);
