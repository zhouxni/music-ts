import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { getMv, getMvComment } from "@Api/songer";
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
function PlayMv(props: any) {
  const [comment, setComment] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const id = getUrlQuery(props.location.search).get("id");
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => {
    (document.querySelector(".loadmore") as HTMLElement).scrollTop = 0;
    getMv({ id }).then((res) => {
      setUrl(res.data.url);
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
  }, [id]);
  const loadmore = () => {
    if (!load.current) {
      load.current = true;
      getMvComment({
        id,
        offset: (pageNo.current - 1) * 20,
      })
        .then((res: any) => {
          setNewComment(newComment.concat(res.comments));
          if (newComment.concat(res.comments).length > res.total) {
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
      <Loadmore onload={loadmore} finished={finished}>
        <div id="play">
          <video width="100%" controls src={url}></video>
        </div>
        <Comment
          bottomMsg={comment.length === 0 ? "" : "全部热门评论"}
          id={id}
          type={1}
          title="热门评论"
          list={comment}
        />
        <Comment type={1} title="最新评论" list={newComment} />
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayMv);
