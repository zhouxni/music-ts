import px2rem from "@/util/px2rem";
import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
const Wrap = styled.div<{ ref: any }>`
  height: 100%;
  overflow: auto;
  .finish_text {
    color: #9e9e9e;
    text-align: center;
    margin: ${px2rem(10)} 0;
  }
`;
function Loadmore(props: any) {
  const loadref = useRef<any>();
  const loadRefWrap = useRef<any>();
  const { onload, finished } = props;
  useEffect(() => {
    const dom = loadref.current;
    const domWrap = loadRefWrap.current;
    const fn = () => {
      if (finished) {
        return;
      }
      if (dom.offsetHeight + dom.scrollTop >= domWrap.offsetHeight) {
        if (onload) {
          onload();
        }
      }
    };
    dom.addEventListener("scroll", fn);
    return () => {
      dom.removeEventListener("scroll", fn);
    };
  });
  return (
    <Wrap className="loadmore" ref={loadref}>
      <div className="loadmore_wrap" ref={loadRefWrap}>
        {React.Children.map(props.children, (child) => (
          <>{child}</>
        ))}
        {finished && <p className="finish_text">没有更多了</p>}
      </div>
    </Wrap>
  );
}

export default memo(Loadmore);
