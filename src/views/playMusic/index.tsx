import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { getSongUrl, getMusicComment, getMusicDetail } from "@Api/songer";
import styled from "styled-components";
import "@/assets/icon/iconfont.css";
import Comment from "@Component/comment";
import Loadmore from "@Component/loadmore";
import ReactPlayer from "react-player";
import px2rem from "@/util/px2rem";
const Wrap = styled.div`
  position: relative;
  height: 100%;
  #play {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 1;
    background: no-repeat center;
    background-size: 100% auto;
  }
`;
function PlayMv(props: any) {
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState([]);
  const [hotComment, setHotComment] = useState([]);
  const [song, setSong] = useState<any[]>([]);
  const id = getUrlQuery(props.location.search).get("id");
  const pageNo = useRef(1);
  const load = useRef(false);
  const [finished, setFinish] = useState(false);
  useEffect(() => {
    getSongUrl({ id }).then((res) => {
      setUrl(res.data[0].url);
    });
    getMusicDetail({ ids: id }).then((res: any) => {
      setSong(res.songs);
    });
    getMusicComment({ id }).then((res: any) => {
      setComment(res.comments);
      setHotComment(res.hotComments);
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
      getMusicComment({
        id,
        offset: (pageNo.current - 1) * 20,
      })
        .then((res: any) => {
          setComment(comment.concat(res.comments));
          if (comment.concat(res.comments).length > res.total) {
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
        <div
          id="play"
          style={{
            backgroundImage:
              song.length > 0 ? `url(${song[0].al.picUrl})` : `none`,
            backgroundColor: "#000",
          }}
        >
          <ReactPlayer width="100%" height={px2rem(200)} url={url} controls />
        </div>
        <Comment
          bottomMsg={hotComment.length === 0 ? "" : "全部热门评论"}
          type={0}
          title="热门评论"
          list={hotComment}
          id={id}
        />
        <Comment type={0} title="最新评论" list={comment} />
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayMv);
