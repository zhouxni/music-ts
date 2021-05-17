import React, { memo, useEffect, useRef, useState } from "react";
import { getPlayListComment } from "@Api/songer";
import { getUrlQuery } from "@/util";
import Comment from "@Component/comment";
import Loadmore from "@Component/loadmore";
function RankComment(props: any) {
  const { search } = props.location;
  const id = getUrlQuery(search).get("id");
  const [comment, setComment] = useState([]);
  const [hotComment, setHotComment] = useState([]);
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  useEffect(() => {
    pageNo.current = 1;
    setComment([]);
    setHotComment([]);
    setFinish(false);
    getPlayListComment({ id }).then((res: any) => {
      setComment(res.comments);
      setHotComment(res.hotComments);
      if (!res.more) {
        setFinish(true);
        return;
      }
      pageNo.current++;
    });
  }, [id]);
  const onLoad = () => {
    if (!load.current) {
      load.current = true;
      getPlayListComment({ id, offset: (pageNo.current - 1) * 20 })
        .then((res: any) => {
          setComment(comment.concat(res.comments));
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
    <Loadmore onload={onLoad} finished={finished}>
      <Comment
        bottomMsg={hotComment.length === 0 ? "" : "全部热门评论"}
        list={hotComment}
        title="热门评论"
        type={2}
        id={id}
      />
      <Comment list={comment} title="最新评论" type={2} />
    </Loadmore>
  );
}

export default memo(RankComment);
