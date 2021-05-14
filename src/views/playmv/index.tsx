import React, { memo, useEffect, useState } from "react";
import { getUrlQuery } from "@/util";
import { getMv, getComment, getNewComment } from "@Api/songer";
import { useLocation } from "react-router-dom";
import { Svideo } from "supervideo";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import "@/assets/icon/iconfont.css";
import Comment from "./component/comment";
const Wrap = styled.div`
  #play {
    width: 100%;
  }
`;
function PlayMv() {
  const { search } = useLocation();
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const id = getUrlQuery(search).get("id");
  useEffect(() => {
    getMv({ id }).then((res) => {
      // new Svideo("play", { source: res.data.url });
    });
    getComment({ id, type: 1 }).then((res: any) => {
      setComment(res.hotComments);
    });
    getNewComment({ id, type: 1, sortType: 3 }).then((res: any) => {
      setNewComment(res.data.comments);
    });
  }, []);
  return (
    <Wrap>
      <div id="play"></div>
      <Comment id={id} title="热门评论" list={comment} />
      <Comment id={id} title="最新评论" list={newComment} />
    </Wrap>
  );
}

export default memo(PlayMv);
