import React, { memo, useMemo, useState } from "react";
import styled from "styled-components";
import { Icon } from "antd-mobile";
import { getFloorComment } from "@Api/songer";
import { useLocation } from "react-router-dom";
import { getUrlQuery } from "@/util";
import px2rem from '@/util/px2rem'
const Wrap = styled.div`
  background-color: #fafafa;
  color: #1996e4;
  padding:0 ${px2rem(8)};
  line-height:1.5;
`;
function FloorComment(props = { info: {}, type: 1 }) {
  const comm = useMemo<any>(() => props.info, [props.info]);
  const { search } = useLocation();
  const id = getUrlQuery(search).get("id");
  const [floorComment, setFloorComment] = useState<any[]>([]);
  return (
    <Wrap>
      {floorComment.length === 0 &&
        comm.showFloorComment &&
        comm.showFloorComment.showReplyCount && (
          <div
            className="floor"
            onClick={() =>
              getFloorComment({
                parentCommentId: comm.commentId,
                id,
                type: props.type,
              }).then((res) => {
                setFloorComment(res.data.comments);
              })
            }
          >
            {comm.showFloorComment.replyCount}条回复
            <Icon type="right" size="xxs" />
          </div>
        )}
      {floorComment.length > 0 &&
        floorComment.map((floor, index) => {
          return (
            <div key={index} className="floor_info">
              <p>@{floor.user.nickname}: <span style={{color:"#858586"}}>{floor.content}</span></p>
            </div>
          );
        })}
    </Wrap>
  );
}
export default memo(FloorComment);
