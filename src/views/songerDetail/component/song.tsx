import React, { memo, useMemo } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import "@/assets/icon/iconfont.css";
import { useHistory } from "react-router-dom";
const ListItem = styled.div`
  padding: ${px2rem(15)};
  border-bottom: ${px2rem(1)} solid #f0f0f0;
  position: relative;
  h3 {
    font-weight: 400;
    font-size: ${px2rem(16)};
    margin-bottom: ${px2rem(8)};
  }
  p {
    color: #5a5a5a;
    span {
      color: #828282;
    }
  }
  .icon-boshiweb_bofang {
    position: absolute;
    top: 50%;
    right: ${px2rem(30)};
    transform: translateY(-50%);
    font-size: ${px2rem(25)};
    color: #acb2b6;
  }
`;
function Song(props = { list: [] }) {
  const list = useMemo<any[]>(() => props.list, [props.list]);
  const history = useHistory();
  return (
    <>
      {list.map((song, index) => {
        return (
          <ListItem key={index}>
            <h3>{song.name}</h3>
            <p>
              {song.ar.map((ar: any) => ar.name).join("/")}
              <span> - {song.al.name}</span>
            </p>
            {song.mv >= 0 && (
              <i
                className="iconfont icon-boshiweb_bofang"
                onClick={() =>
                  history.push(`/playmv?id=${song.mv}`)
                }
              ></i>
            )}
          </ListItem>
        );
      })}
    </>
  );
}

export default memo(Song);
