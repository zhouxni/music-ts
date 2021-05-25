import React, { memo, useState } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import "@/assets/icon/iconfont.css";
const Wrap = styled.div`
  height: ${px2rem(50)};
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #ffdf20;
  i {
    position: absolute;
    top: 50%;
    left: ${px2rem(10)};
    transform: translateY(-50%);
  }
  .icon-sousuo {
    left: ${px2rem(5)};
    font-size: ${px2rem(22)};
  }
`;
const Input = styled.input`
  width: 100%;
  border-radius: ${px2rem(15)};
  background-color: #fff;
  height: ${px2rem(35)};
  border: none;
  outline: none;
  padding: 0 ${px2rem(30)};
`;
function Search(props: any) {
  const { onClick, onInput } = props;
  const [value, setVal] = useState("");
  return (
    <Wrap>
      <i className="iconfont icon-gengduo"></i>
      <div style={{ width: "75%", position: "relative" }}>
        <i className="iconfont icon-sousuo"></i>
        <Input
          value={value}
          type="search"
          placeholder="歌曲/歌手/歌词/专辑"
          onClick={() => {
            if (onClick) onClick();
          }}
          onInput={(e: any) => {
            setVal(e.target.value);
            if (onInput) onInput(e.target.value);
          }}
        />
      </div>
    </Wrap>
  );
}

export default memo(Search);
