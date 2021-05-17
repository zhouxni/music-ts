import React, { memo, useEffect, useRef, useState } from "react";
import {
  getPlayListHot,
  getPlayListTop,
  getPlayListCategory,
} from "@Api/songer";
import { Icon } from "antd-mobile";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import Category from "@/views/musicLib/component/recomm/category";
import Loadmore from "@Component/loadmore";
import { useHistory } from "react-router-dom";
const Wrap = styled.div`
  padding: ${px2rem(15)};
  .category {
    overflow: hidden;
    .tag {
      width: ${px2rem(108)};
      padding: ${px2rem(15)} 0;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      background-color: #f4f8fb;
      margin-bottom: ${px2rem(10)};
      &:not(:nth-child(3n + 3)) {
        margin-right: ${px2rem(10)};
      }
    }
    .tagActive {
      background: #fce024;
      color: #fff;
    }
  }
  .switch {
    width: ${px2rem(120)};
    height: ${px2rem(30)};
    padding: 0 ${px2rem(17)};
    position: absolute;
    top: ${px2rem(-7)};
    border-radius: ${px2rem(30)};
    right: 0;
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
function PlayList() {
  const [tags, setTag] = useState<any[]>([{ name: "全部" }]);
  const [topList, setTopList] = useState<any[]>([]);
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  const [tab, setTab] = useState(0);
  const [tagName, setTagName] = useState("全部");
  const history = useHistory();
  useEffect(() => {
    getPlayListCategory();
    getPlayListHot().then((res: any) => {
      setTag([
        ...tags,
        ...res.tags,
        ...[
          { name: "全部分类", navigation: true },
          { name: "精品专区", navigation: true },
        ],
      ]);
    });
    getPlayListTop().then((res: any) => {
      setTopList(res.playlists);
      if (!res.more) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, []);
  const tabChange = (val: number) => {
    if (val === tab) return;
    setTab(val);
    init(val, tagName);
  };
  const init = (tab: number, tagName: string) => {
    setFinish(false);
    pageNo.current = 1;
    setTopList([]);
    getPlayListTop({ order: tab === 0 ? "hot" : "new", cat: tagName }).then(
      (res: any) => {
        setTopList(res.playlists);
        if (!res.more) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      }
    );
  };
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getPlayListTop({
        offset: (pageNo.current - 1) * 50,
        order: tab === 0 ? "hot" : "new",
        cat: tagName,
      })
        .then((res: any) => {
          setTopList(topList.concat(res.playlists));
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
  const changeList = (name: string) => {
    if (name === "精品专区") {
      history.push("/boutique");
      return;
    }
    if (name === "全部分类") {
      history.push("/allcategory");
      return;
    }
    setTagName(name);
    init(tab, name);
  };
  return (
    <Loadmore onload={onLoad} finished={finished}>
      <Wrap>
        <div className="category">
          {tags.map((tag, index) => {
            return (
              <div
                className={`tag ${tagName === tag.name ? "tagActive" : ""}`}
                key={index}
                onClick={() => changeList(tag.name)}
              >
                {tag.name}
                {tag.navigation && <Icon type="right" size="xs" />}
              </div>
            );
          })}
        </div>
        <div style={{ position: "relative" }}>
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
          <Category type={2} title="热门歌单" list={topList} />
        </div>
      </Wrap>
    </Loadmore>
  );
}

export default memo(PlayList);
