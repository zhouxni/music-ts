import React, { memo, useEffect, useRef, useState } from "react";
import { getUrlQuery } from "@/util";
import { getSongUrl, getMusicComment, getMusicDetail } from "@Api/songer";
import { useLocation } from "react-router-dom";
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
function PlayMv() {
  const { search } = useLocation();
  const [url, setUrl] = useState("");
  const [comment, setComment] = useState([]);
  const [hotComment, setHotComment] = useState([]);
  const [song, setSong] = useState<any[]>([]);
  const id = getUrlQuery(search).get("id");
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
  }, []);
  const loadmore = () => {
    if (!load.current) {
      load.current = true;
      getMusicComment({
        id,
        offset: (pageNo.current - 1) * 20,
      }).then((res: any) => {
        setComment(comment.concat(res.comments));
        load.current = false;
        if (comment.concat(res.comments).length > res.total) {
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
        <div
          id="play"
          style={{
            backgroundImage:
              song.length > 0 ? `url(${song[0].al.picUrl})` : `none`,
          }}
        >
          <ReactPlayer width="100%" height={px2rem(200)} url={url} controls />
        </div>
        <Comment type={0} title="热门评论" list={hotComment} />
        <Comment type={0} title="最新评论" list={comment} />
      </Loadmore>
    </Wrap>
  );
}

export default memo(PlayMv);
