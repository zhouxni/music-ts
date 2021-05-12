import React, { useEffect, useState } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { useLocation } from "react-router-dom";
import Button from "@Component/button";
import { captchaSent } from "@Api/login";
const Wrap = styled.div`
  padding: ${px2rem(20)};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Input = styled.input`
  width: 100%;
  height: ${px2rem(45)};
  border: none;
  border-bottom: ${px2rem(1)} solid #e5e5e5;
  outline: none;
  padding: 0 10px;
  font-size: ${px2rem(14)};
  &::placeholder {
    color: #989898;
  }
`;
function VerCode() {
  const { state } = useLocation();
  const [second, setSecond] = useState(60);
  useEffect(() => {
    captchaSent({ phone: (state as any).phone });
    timeCount();
  }, []);
  const sendCapthch = () => {
    console.log(second);
    if (second === 0) {
      setSecond(60);
      captchaSent({ phone: (state as any).phone });
      timeCount();
    }
  };
  const timeCount = () => {
    const timer = setInterval(() => {
      setSecond((preSecond) => {
        if (preSecond === 1) {
          clearInterval(timer);
        }
        return preSecond - 1;
      });
    }, 1000);
  };
  return (
    <Wrap>
      <p style={{ fontSize: px2rem(14), margin: `${px2rem(15)} 0` }}>
        我们已经发送了短信验证码到你的手机
      </p>
      <p style={{ fontSize: px2rem(16) }}>{(state as any).phone}</p>
      <Input placeholder="请输入验证码" />
      <Button
        fontColor="#ffffff"
        color="#fce024"
        style={{
          pointerEvents: second > 0 ? "none" : "auto",
          opacity: second > 0 ? "0.6" : "1",
        }}
        onClick={sendCapthch}
      >
        {second > 0 ? `${second}S` : "重新发送"}
      </Button>
    </Wrap>
  );
}

export default VerCode;
