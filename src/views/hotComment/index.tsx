import React, { memo, useEffect, useRef, useState } from "react";
import { getHotComment } from "@Api/songer";
import { useLocation } from "react-router-dom";
import { getUrlQuery } from "@/util";
import Loadmore from "@Component/loadmore";
import Comment from "@Component/comment";
function HotComment() {
  const { search } = useLocation();
  const param = getUrlQuery(search);
  const [comment, setComment] = useState([]);
  const [finished, setFinish] = useState(false);
  const pageNo = useRef(1);
  const load = useRef(false);
  useEffect(() => {
    getHotComment({ id: param.get("id"), type: param.get("type") }).then(
      (res: any) => {
        setComment(res.hotComments);
        if (!res.hasMore) {
          setFinish(true);
          return;
        }
        pageNo.current++;
      }
    );
  }, []);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getHotComment({
        id: param.get("id"),
        type: param.get("type"),
        offset: (pageNo.current - 1) * 20,
      })
        .then((res: any) => {
          setComment(comment.concat(res.hotComments));
          if (!res.hasMore) {
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
    <Loadmore onload={onLoad} finished={finished}>
      <Comment
        list={comment}
        title="热门评论"
        type={Number(param.get("type"))}
      />
    </Loadmore>
  );
}

export default memo(HotComment);
