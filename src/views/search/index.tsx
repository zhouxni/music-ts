import React, { memo, useEffect, useRef, useState } from "react";
import NavSearch from "../home/search";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { Searchhot, Searchsuggest, SearchResult } from "@Api/search";
import { Icon, Tabs } from "antd-mobile";
import Song from "./tab/song";
import Loadmore from "@Component/loadmore";
const Wrap = styled.div`
  height: 100%;
  .search {
    padding: ${px2rem(20)};
    h3 {
      font-weight: 700;
      margin-bottom: ${px2rem(15)};
    }
    .hots {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .hot {
      width: ${px2rem(150)};
      color: #363636;
      line-height: ${px2rem(40)};
      border-bottom: ${px2rem(1)} solid #f1f1f1;
      img {
        width: ${px2rem(25)};
        vertical-align: middle;
        margin-left: ${px2rem(6)};
      }
    }
  }
  .slist {
    padding: ${px2rem(15)};
    border-bottom: ${px2rem(1)} solid #eeeeee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tabCon {
    height: 100%;
  }
`;
function Search() {
  const [list, setList] = useState([]);
  const [slist, setSlist] = useState([]);
  const [rlist, setRlist] = useState([]);
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  const tabs = [{ title: "单曲" }, { title: "歌单" }];
  const [tabIndex, setTabIndex] = useState(0);
  const [keywords, setKeyWords] = useState("");
  useEffect(() => {
    Searchhot().then((res) => {
      setList(res.data);
    });
  }, []);
  const onInput = (val: string) => {
    if (val) {
      Searchsuggest({ keywords: val, type: "mobile" }).then((res: any) => {
        setSlist(res.result.allMatch || []);
      });
    } else {
      setSlist([]);
      setRlist([]);
    }
  };
  const search = (keywords: string) => {
    setKeyWords(keywords);
    setTabIndex(0);
    pageNo.current = 1;
    getList(keywords, 1);
  };
  const getList = (keywords: string, type: number) => {
    if (!load.current) {
      load.current = true;
      SearchResult({ keywords, offset: (pageNo.current - 1) * 30, type })
        .then((res: any) => {
          if (slist.length > 0) {
            setSlist([]);
          }
          switch (type) {
            case 1:
              if ((res.result.songs || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.songs || []
                  : rlist.concat(res.result.songs || [])
              );

              break;
            case 1000:
              if ((res.result.playlists || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.playlists || []
                  : rlist.concat(res.result.playlists || [])
              );
              break;
            default:
              break;
          }
          pageNo.current++;
        })
        .finally(() => {
          load.current = false;
        });
    }
  };
  return (
    <Wrap>
      <NavSearch onInput={onInput} />
      {slist.length === 0 && rlist.length === 0 && (
        <div className="search">
          <h3>热门搜索</h3>
          <div className="hots">
            {list.map((hot: any, index) => {
              return (
                <div className="hot" key={index}>
                  {hot.searchWord}
                  {hot.iconUrl && <img alt="" src={hot.iconUrl} />}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {slist.map((list: any, index) => {
        return (
          <div
            className="slist"
            key={index}
            onClick={() => search(list.keyword)}
          >
            {list.keyword}
            <Icon type="right" color="#acacac" />
          </div>
        );
      })}
      {rlist.length > 0 && slist.length === 0 && (
        <div style={{ height: `calc(100% - ${px2rem(50)})` }}>
          <Tabs
            tabBarUnderlineStyle={{ borderColor: "#ffdf20" }}
            tabBarTextStyle={{ color: "#828282" }}
            tabBarActiveTextColor="#000"
            tabs={tabs}
            page={tabIndex}
            onChange={(tab, index) => {
              setTabIndex(index);
              pageNo.current = 1;
              switch (index) {
                case 0:
                  getList(keywords, 1);
                  break;
                case 1:
                  getList(keywords, 1000);
                  break;
                default:
                  break;
              }
            }}
          >
            {tabIndex === 0 && (
              <div className="tabCon">
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 1)}
                >
                  <Song list={rlist} type={1} />
                </Loadmore>
              </div>
            )}
            {tabIndex === 1 && (
              <div className="tabCon">
                <Loadmore>
                  <Song list={rlist} type={1000} />
                </Loadmore>
              </div>
            )}
          </Tabs>
        </div>
      )}
    </Wrap>
  );
}

export default memo(Search);
