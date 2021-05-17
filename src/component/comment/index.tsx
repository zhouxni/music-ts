import React, { memo, useMemo } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatDate } from "@/util";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import "@/assets/icon/iconfont.css";
import FloorComment from "./floorComment";
import { Icon } from "antd-mobile";
import { useHistory } from "react-router-dom";
const Wrap = styled.div`
  .comment {
    padding: ${px2rem(15)};
    .comm_user {
      display: flex;
      align-items: flex-end;
      img {
        width: ${px2rem(40)};
        border-radius: 50%;
      }
      .comm_right {
        flex: 1;
        padding-left: ${px2rem(8)};
        position: relative;
        h4 {
          color: #6b768c;
          font-weight: 400;
          margin-bottom: ${px2rem(3)};
        }
        .count {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          color: #4a4e4d;
        }
      }
    }
    .comm_list {
      padding-left: ${px2rem(48)};
      p {
        margin: ${px2rem(10)} 0;
        word-break: break-all;
      }
    }
    .floor {
      color: #658095;
      font-size: ${px2rem(12)};
      display: flex;
      align-items: center;
      margin-bottom: ${px2rem(10)};
    }
    .bottom {
      display: flex;
      padding-top: ${px2rem(20)};
      color: #4b6593;
      justify-content: center;
      align-items: center;
    }
  }
`;
const ListItem = styled.div``;
function Comment(props: {
  id?: string | null;
  list: any[];
  title: string;
  type: number;
  bottomMsg?: string;
}) {
  const history = useHistory();
  const list = useMemo(() => props.list, [props.list]);
  const { title, type, bottomMsg, id } = props;
  return (
    <Wrap>
      <div className="comment">
        <h3 style={{ marginBottom: px2rem(15) }}>{title}</h3>
        {list.length === 0 && (
          <p style={{ color: "#828282", textAlign: "center" }}>暂无评论...</p>
        )}
        {list.map((comm, index) => {
          return (
            <ListItem key={index}>
              <div className="comm_user">
                <LazyLoadImage src={comm.user.avatarUrl} />
                <div className="comm_right">
                  <h4>{comm.user.nickname}</h4>
                  <span style={{ color: "#a19d9a", fontSize: px2rem(12) }}>
                    {formatDate(comm.time, "yyyy-MM-dd HH:mm:ss")}
                  </span>
                  <div className="count">
                    <span
                      style={{ fontSize: px2rem(12), marginRight: px2rem(5) }}
                    >
                      {comm.likedCount}
                    </span>
                    <i className="iconfont icon-dianzan1"></i>
                  </div>
                </div>
              </div>
              <div className="comm_list">
                <p>{comm.content}</p>
                <FloorComment type={type} info={comm} />
              </div>
            </ListItem>
          );
        })}
        {bottomMsg && (
          <div
            className="bottom"
            onClick={() => history.push(`/hotcomment?id=${id}&type=${type}`)}
          >
            {bottomMsg}
            <Icon type="right" size="xs" />
          </div>
        )}
      </div>
    </Wrap>
  );
}

export default memo(Comment);
