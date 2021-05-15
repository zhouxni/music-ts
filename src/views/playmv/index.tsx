import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { getMv, getComment, getNewComment, getMvComment } from "@Api/songer";
import { useLocation } from "react-router-dom";
import { Svideo } from "supervideo";
import styled from "styled-components";
import "@/assets/icon/iconfont.css";
import Comment from "@Component/comment";
import Loadmore from "@Component/loadmore";
const Wrap = styled.div`
  position: relative;
  height: 100%;
  #play {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
  }
`;
function PlayMv() {
  const { search } = useLocation();
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const id = getUrlQuery(search).get("id");
  const cursor = useRef(0);
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  useEffect(() => {
    getMv({ id }).then((res) => {
      new Svideo("play", { source: res.data.url });
    });
    getMvComment({ id }).then((res: any) => {
      setComment(res.hotComments);
      setNewComment(res.comments);
      if (res.comments.length > res.total) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, []);
  const loadmore = () => {
    if (!load.current) {
      load.current = true;
      getMvComment({
        id,
        offset: (pageNo.current - 1) * 20,
      }).then((res: any) => {
        setNewComment(newComment.concat(res.comments));
        load.current = false;
        if (newComment.concat(res.comments).length > res.total) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      });
    }
  };
  return (
    <Wrap>
      <Loadmore onload={loadmore} finished={finished}>
        <div id="play"></div>
        <Comment type={1} title="热门评论" list={comment} />
        <Comment type={1} title="最新评论" list={newComment} />
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayMv);
