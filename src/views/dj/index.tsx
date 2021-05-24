import React, { memo, useEffect, useState } from "react";
import { DjCatelist, DjList } from "@Api/dj";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { traceNumber } from "@/util";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";
const Wrap = styled.div`
  height: 100%;
  display: flex;
  .categorys {
    height: 100%;
    overflow: auto;
    border-right: ${px2rem(1)} solid #eee;
  }
  .category {
    padding: ${px2rem(20)};
  }
  .categoryActive {
    background-color: #fce024;
    color: #fff;
  }
  .dj {
    display: flex;
    align-items: center;
    margin-top: ${px2rem(20)};
    img {
      width: ${px2rem(60)};
      border-radius: 50%;
      margin: 0 ${px2rem(15)};
    }
    i {
      font-size: ${px2rem(12)};
      margin-right: ${px2rem(5)};
    }
  }
`;
function Dj() {
  const [cates, setCate] = useState([]);
  const [tab, setTab] = useState(-1);
  const [list, setList] = useState([]);
  const history = useHistory();
  useEffect(() => {
    DjCatelist().then((res: any) => {
      setCate(res.categories);
      setTab(() => {
        if (res.categories.length > 0) {
          return res.categories[0].id;
        }
        return -1;
      });
      if (res.categories.length > 0) {
        getList(res.categories[0].id);
      }
    });
  }, []);
  const getList = (tab: number) => {
    DjList({ type: tab }).then((res: any) => {
      setList(res.djRadios);
    });
  };
  const tabChange = (type: number) => {
    if (tab === type) return;
    setTab(type);
    setList([]);
    getList(type);
  };
  return (
    <Wrap>
      <div className="categorys">
        {cates.map((cate: any, index) => {
          return (
            <div
              className={`category ${tab === cate.id ? "categoryActive" : ""}`}
              key={index}
              onClick={() => tabChange(cate.id)}
            >
              {cate.name}
            </div>
          );
        })}
      </div>
      <div style={{ flex: "1", overflow: "auto" }}>
        {list.map((dj: any, index) => {
          return (
            <div
              key={index}
              className="dj"
              onClick={() => history.push(`/djprogram?id=${dj.id}`)}
            >
              <LazyLoadImage src={dj.picUrl} />
              <div className="dj_info">
                <h3>{dj.name}</h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#8D8D8D",
                    marginTop: px2rem(8),
                  }}
                >
                  <i className="iconfont icon-play1"></i>
                  {traceNumber(dj.playCount)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Wrap>
  );
}

export default memo(Dj);
