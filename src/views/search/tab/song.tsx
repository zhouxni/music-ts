import px2rem from "@/util/px2rem";
import React, { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Toast } from "antd-mobile";
import { checkMusic } from "@/api/songer";
const Wrap = styled.div`
  .type {
    padding: ${px2rem(15)} ${px2rem(15)};
    padding-right: ${px2rem(50)};
    border-bottom: ${px2rem(1)} solid #eee;
    position: relative;
    .mess {
      font-size: ${px2rem(12)};
      color: #898989;
      display: flex;
      white-space: nowrap;
      margin-top: ${px2rem(6)};
      line-height: 1.5;
      i {
        position: absolute;
        top: 50%;
        right: ${px2rem(20)};
        transform: translateY(-50%);
        font-size: ${px2rem(25)};
        color: #acb2b6;
      }
    }
    p {
      font-size: ${px2rem(12)};
      color: #898989;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-height: 1.5;
    }
  }
`;
function Song(props: any) {
  const { list, type } = props;
  const history = useHistory();
  const toMusic = (id: number) => {
    checkMusic({ id })
      .then(() => {
        history.push(`/playmusic?id=${id}`);
      })
      .catch(() => {
        Toast.info("亲爱的,暂无版权");
      });
  };
  return (
    <Wrap>
      {list.map((item: any, index: number) => {
        return (
          <div key={index}>
            {type === 1 && (
              <div className="type type_1" onClick={() => toMusic(item.id)}>
                {item.name}
                <div className="mess">
                  {item.ar.map((ar: any, index: any) => {
                    return (
                      <span key={index}>
                        {ar.name}
                        {index !== item.ar.length - 1 && <>、</>}
                      </span>
                    );
                  })}
                  {item.al.name && <p>&nbsp;-&nbsp;{item.al.name}</p>}
                  {item.mv > 0 && (
                    <i
                      className="iconfont icon-boshiweb_bofang"
                      onClick={(e) => {
                        e.stopPropagation();
                        history.push(`/playmv?id=${item.mv}`);
                      }}
                    ></i>
                  )}
                </div>
                {item.alia[0] && <p>{item.alia[0]}</p>}
              </div>
            )}
            {type === 1000 && (
              <div
                className="type type_1000"
                onClick={() => history.push(`/rankDetail?id=${item.id}`)}
              >
                {item.name}
              </div>
            )}
          </div>
        );
      })}
    </Wrap>
  );
}

export default memo(Song);
