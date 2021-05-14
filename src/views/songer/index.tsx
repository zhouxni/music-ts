import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Tab from "./tab";
import { getSonger } from "@/api/songer";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { Icon } from "antd-mobile";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useHistory } from "react-router-dom";
const Wrap = styled.div`
  & > .topList {
    margin-top: ${px2rem(15)};
    & > h3 {
      padding: 0 ${px2rem(10)};
      margin-bottom: ${px2rem(10)};
    }
    ul {
      padding: 0 ${px2rem(18)};
    }
    li {
      padding: ${px2rem(8)} 0;
      border-bottom: ${px2rem(1)} solid #f6f6f6;
      display: flex;
      align-items: center;
      & > .songInfo {
        flex: 1;
        padding-left: ${px2rem(10)};
        h4 {
          font-weight: 400;
          span {
            color: #9e9e9e;
            margin-left: ${px2rem(3)};
          }
        }
        p {
          color: #9e9e9e;
          margin-top: ${px2rem(5)};
        }
      }
    }
    img {
      width: ${px2rem(50)};
      border-radius: 50%;
    }
  }
`;
function Songer() {
  const history = useHistory();
  const tab1 = useMemo(
    () => [
      { id: -1, name: "全部" },
      { id: 7, name: "华语" },
      { id: 96, name: "欧美" },
      { id: 8, name: "日本" },
      { id: 16, name: "韩国" },
      { id: 0, name: "其他" },
    ],
    []
  );
  const tab2 = useMemo(
    () => [
      { id: -1, name: "全部" },
      { id: 1, name: "男歌手" },
      { id: 2, name: "女歌手" },
      { id: 3, name: "乐队" },
    ],
    []
  );
  const [selectType, setSelectType] = useState(-1);
  const [selectArea, setSelectArea] = useState(-1);
  const [songerList, setSongerList] = useState([]);
  useEffect(() => {
    getList(-1, -1);
  }, []);
  const onSelectArea = useCallback(
    (area) => {
      setSelectArea(area);
      getList(selectType, area);
    },
    [selectType]
  );
  const onSelectType = useCallback(
    (type) => {
      setSelectType(type);
      getList(type, selectArea);
    },
    [selectArea]
  );
  const getList = (type: number, area: number) => {
    getSonger({ type, area }).then((res: any) => {
      setSongerList(res.artists);
    });
  };
  return (
    <Wrap>
      <Tab active={selectArea} onSelect={onSelectArea} list={tab1} />
      <Tab active={selectType} onSelect={onSelectType} list={tab2} />
      <div className="topList">
        <h3>歌手排行榜</h3>
        <ul>
          {songerList.map((songer: any, index) => {
            return (
              <li
                onClick={() => {
                  history.push(`/songerdetail?id=${songer.id}`);
                }}
                key={index}
              >
                <LazyLoadImage src={songer.img1v1Url} width={px2rem(50)} />
                <div className="songInfo">
                  <h4>
                    {songer.name}
                    {songer.alias[0] && <span>({songer.alias[0]})</span>}
                  </h4>
                  <p>
                    单曲{songer.musicSize} 专辑{songer.albumSize}
                  </p>
                </div>
                <Icon type="right" color="#dadada" />
              </li>
            );
          })}
        </ul>
      </div>
    </Wrap>
  );
}

export default memo(Songer);
