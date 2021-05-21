import React, { memo, useEffect, useRef, useState } from "react";
import { DjCatelist, DjList } from "@Api/dj";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { traceNumber } from "@/util";
import Loadmore from "@Component/loadmore";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
  const [finished, setFinish] = useState(false);
  const pageNo = useRef(1);
  const load = useRef(false);
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
        getList(res.categories[0].id, pageNo.current);
      }
    });
  }, []);
  const getList = (tab: number, page: number) => {
    if (!load.current) {
      load.current = true;
      DjList({ type: tab, offset: (page - 1) * 10 })
        .then((res: any) => {
          page === 1
            ? setList(res.djRadios)
            : setList(list.concat(res.djRadios));
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
  const onLoad = () => {
    getList(tab, pageNo.current);
    // if (!load.current) {
    //   load.current = true;
    //   DjList({ type: tab, offset: (pageNo.current - 1) * 10 })
    //     .then((res: any) => {
    //       setList(list.concat(res.djRadios));
    //       if (!res.hasMore) {
    //         setFinish(true);
    //         return;
    //       }
    //       pageNo.current++;
    //     })
    //     .finally(() => {
    //       load.current = false;
    //     });
    // }
  };
  const tabChange = (type: number) => {
    if (tab === type) return;
    setTab(type);
    setFinish(false);
    setList([]);
    pageNo.current = 1;
    getList(type, pageNo.current);
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
      <div style={{ flex: "1" }}>
        <Loadmore finished={finished} onload={onLoad}>
          {list.map((dj: any, index) => {
            return (
              <div key={index} className="dj">
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
        </Loadmore>
      </div>
    </Wrap>
  );
}

export default memo(Dj);
