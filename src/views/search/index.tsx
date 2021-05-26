import React, { memo, useEffect, useRef, useState } from "react";
import NavSearch from "../home/search";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { Searchhot, Searchsuggest, SearchResult } from "@Api/search";
import { Icon, Tabs } from "antd-mobile";
import Song from "./tab/song";
import Loadmore from "@Component/loadmore";
import { useHistory } from "react-router-dom";
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
    background: #fff;
  }
`;
function Search() {
  const [list, setList] = useState([]);
  const [slist, setSlist] = useState([]);
  const [rlist, setRlist] = useState([]);
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  const tabs = [
    { title: "单曲" },
    { title: "歌单" },
    { title: "视频" },
    { title: "歌手" },
    { title: "专辑" },
    { title: "用户" },
  ];
  const [tabIndex, setTabIndex] = useState(0);
  const [keywords, setKeyWords] = useState("");
  const [showRlist, setShowRlist] = useState(false);
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
      setShowRlist(false);
    }
  };
  const search = (keywords: string) => {
    setKeyWords(keywords);
    setTabIndex(0);
    setFinish(false);
    setShowRlist(true);
    pageNo.current = 1;
    getList(keywords, 1);
  };
  const history = useHistory();
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
            case 1014:
              if ((res.result.videos || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.videos || []
                  : rlist.concat(res.result.videos || [])
              );
              break;
            case 100:
              if ((res.result.artists || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.artists || []
                  : rlist.concat(res.result.artists || [])
              );
              break;
            case 10:
              if ((res.result.albums || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.albums || []
                  : rlist.concat(res.result.albums || [])
              );
              break;
            case 1002:
              if ((res.result.userprofiles || []).length === 0) {
                setFinish(true);
                return;
              }
              setRlist(
                pageNo.current === 1
                  ? res.result.userprofiles || []
                  : rlist.concat(res.result.userprofiles || [])
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
      <NavSearch
        icon={<Icon type="left" onClick={() => history.goBack()} />}
        onInput={onInput}
        keywords={keywords}
      />
      {slist.length === 0 && !showRlist && (
        <div className="search">
          <h3>热门搜索</h3>
          <div className="hots">
            {list.map((hot: any, index) => {
              return (
                <div
                  className="hot"
                  key={index}
                  onClick={() => {
                    search(hot.searchWord);
                  }}
                >
                  <p
                    style={{
                      maxWidth: px2rem(115),
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      display: 'inline-block',
                      lineHeight:'normal',
                      verticalAlign:'middle'
                    }}
                  >
                    {hot.searchWord}
                  </p>
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
      {showRlist && slist.length === 0 && (
        <div style={{ height: `calc(100% - ${px2rem(50)})` }}>
          <Tabs
            tabBarUnderlineStyle={{ borderColor: "#ffdf20" }}
            tabBarTextStyle={{ color: "#828282" }}
            tabBarActiveTextColor="#000"
            tabs={tabs}
            page={tabIndex}
            onChange={(tab, index) => {
              setTabIndex(index);
              setRlist([]);
              pageNo.current = 1;
              switch (index) {
                case 0:
                  getList(keywords, 1);
                  break;
                case 1:
                  getList(keywords, 1000);
                  break;
                case 2:
                  getList(keywords, 1014);
                  break;
                case 3:
                  getList(keywords, 100);
                  break;
                case 4:
                  getList(keywords, 10);
                  break;
                case 5:
                  getList(keywords, 1002);
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
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 1000)}
                >
                  <Song list={rlist} type={1000} />
                </Loadmore>
              </div>
            )}
            {tabIndex === 2 && (
              <div className="tabCon">
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 1014)}
                >
                  <Song list={rlist} type={1014} />
                </Loadmore>
              </div>
            )}
            {tabIndex === 3 && (
              <div className="tabCon">
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 100)}
                >
                  <Song list={rlist} type={100} />
                </Loadmore>
              </div>
            )}
            {tabIndex === 4 && (
              <div className="tabCon">
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 10)}
                >
                  <Song list={rlist} type={10} />
                </Loadmore>
              </div>
            )}
            {tabIndex === 5 && (
              <div className="tabCon">
                <Loadmore
                  finished={finished}
                  onload={() => getList(keywords, 1002)}
                >
                  <Song list={rlist} type={1002} />
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
