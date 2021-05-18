import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { useLocation } from "react-router-dom";
import { getHighqualityList, getPlayListTop } from "@Api/songer";
import Loadmore from "@Component/loadmore";
import Category from "@/views/musicLib/component/recomm/category";
import px2rem from "@/util/px2rem";
import styled from "styled-components";
const Wrap = styled.div`
  height: 100%;
  .switch {
    width: ${px2rem(120)};
    height: ${px2rem(30)};
    padding: 0 ${px2rem(17)};
    position: absolute;
    top: ${px2rem(-7)};
    border-radius: ${px2rem(30)};
    right: ${px2rem(8)};
    background-color: #eff3f2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #7c7c7c;
    & > span {
      position: relative;
      z-index: 2;
    }
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      width: 50%;
      height: 100%;
      border-radius: ${px2rem(30)};
      border: ${px2rem(1)} solid #eeeeee;
      z-index: 1;
      box-sizing: border-box;
      transition: all 0.3s;
    }
  }
  .switchNew {
    &::after {
      transform: translate3d(100%, 0, 0);
    }
  }
`;
function PlayListDetail(props: any) {
  const { search } = props.location;
  const name = decodeURIComponent(getUrlQuery(search).get("name") || "");
  const type = decodeURIComponent(getUrlQuery(search).get("type") || "");
  const before = useRef(undefined);
  const [finished, setFinish] = useState(false);
  const load = useRef(false);
  const pageNo = useRef(1);
  const [list, setList] = useState<any[]>([]);
  const [tab, setTab] = useState(0);
  useEffect(() => {
    if (type === "0") {
      getPlayListTop({ cat: name, order: tab === 0 ? "hot" : "new" }).then(
        (res: any) => {
          setList(res.playlists);
          if (!res.more) {
            setFinish(true);
            return;
          }
          pageNo.current++;
        }
      );
    } else {
      getHighqualityList({ cat: name }).then((res: any) => {
        setList(res.playlists);
        if (!res.more) {
          setFinish(true);
          return;
        }
        before.current = res.lasttime;
      });
    }
  }, [name]);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      if (type === "1") {
        getHighqualityList({ cat: name, before: before.current })
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
        getPlayListTop({
          cat: name,
          offset: (pageNo.current - 1) * 50,
          order: tab === 0 ? "hot" : "new",
        })
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
  const tabChange = (val: number) => {
    if (val === tab) return;
    setTab(val);
    setList([]);
    pageNo.current = 1;
    setFinish(false);
    getPlayListTop({ cat: name, order: val === 0 ? "hot" : "new" }).then(
      (res: any) => {
        setList(res.playlists);
        if (!res.more) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      }
    );
  };
  return (
    <Wrap>
      <Loadmore finished={finished} onload={onLoad}>
        <div style={{ padding: `0 ${px2rem(8)}`, position: "relative" }}>
          {type === "0" && (
            <div className={`switch ${tab === 1 ? "switchNew" : ""}`}>
              <span
                style={{ color: tab === 1 ? "#7c7c7c" : "#3b3b3b" }}
                onClick={() => tabChange(0)}
              >
                最热
              </span>
              <span
                style={{ color: tab === 0 ? "#7c7c7c" : "#3b3b3b" }}
                onClick={() => tabChange(1)}
              >
                最新
              </span>
            </div>
          )}
          <Category
            list={list}
            title={type === "1" ? "精品歌单" : "全部歌单"}
            type={2}
          />
        </div>
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayListDetail);
