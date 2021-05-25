import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { Djprogram, Djdetail } from "@Api/dj";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import Loadmore from "@Component/loadmore";
import { Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";
const Wrap = styled.div`
  .header {
    height: ${px2rem(200)};
    background-color: #555459;
    display: flex;
    align-items: center;
    padding: 0 ${px2rem(20)};
    position: sticky;
    top: 0;
    z-index: 999;
    img {
      width: ${px2rem(120)};
      border-radius: 50%;
      margin-right: ${px2rem(15)};
    }
    h3,
    p {
      color: #fff;
    }
    p {
      margin-top: ${px2rem(20)};
      line-height: 1.5;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
`;
const ListItem = styled.div`
  padding: ${px2rem(15)};
  border-bottom: ${px2rem(1)} solid #f0f0f0;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    font-weight: 400;
    font-size: ${px2rem(16)};
    margin-right: ${px2rem(8)};
  }
`;
function PlayDj(props: any) {
  const { location } = props;
  const id = getUrlQuery(location.search).get("id");
  const [list, setList] = useState<any>([]);
  const [info, setInfo] = useState<any>({});
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  const history = useHistory();
  useEffect(() => {
    getList();
    Djdetail({ rid: id }).then((res) => {
      setInfo(res.data);
    });
  }, [id]);
  const getList = () => {
    if (!load.current) {
      load.current = true;
      Djprogram({ rid: id, offset: (pageNo.current - 1) * 30 })
        .then((res: any) => {
          setList(
            pageNo.current === 1 ? res.programs : list.concat(res.programs)
          );
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
  return (
    <Wrap>
      {Object.keys(info).length > 0 && (
        <div className="header">
          <img alt="" src={info.picUrl} />
          <div className="header_desc">
            <h3>{info.name}</h3>
            <p>
              {info.category}--{info.desc}
            </p>
          </div>
        </div>
      )}
      <Loadmore onload={getList} finished={finished}>
        {list.map((dj: any, index: number) => {
          return (
            <ListItem key={index} onClick={() => history.push(`/playdj?id=${dj.mainSong.id}`)}>
              <h3>{dj.name}</h3>
              <Icon type="right" color="#acb2b6" />
            </ListItem>
          );
        })}
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayDj);
