import React, { memo, useState } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { useHistory } from "react-router-dom";
import { phone as phoneCheck } from "@Config/regexp";
import { Toast } from "antd-mobile";
import Button from "@Component/button";
const Wrap = styled.div`
  padding: ${px2rem(15)};
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
function Phone() {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const toVercode = () => {
    if (!phone.trim()) {
      Toast.info("请输入手机号");
      return;
    }
    if (!phoneCheck.test(phone)) {
      Toast.info("请输入正确的手机号");
      return;
    }
    history.push({ pathname: "/vercode", state: { phone } });
  };
  return (
    <Wrap>
      <form style={{ marginBottom: px2rem(30), width: "100%" }}>
        <Input
          type="number"
          value={phone}
          placeholder="请输入手机号"
          onChange={(e) => setPhone(e.target.value)}
        />
      </form>
      <Button color="#fce024" onClick={toVercode}>
        下一步
      </Button>
      <a
        style={{ color: "#989898", fontSize: px2rem(13) }}
        onClick={() => history.push("/login")}
      >
        账号密码登录
      </a>
    </Wrap>
  );
}

export default memo(Phone);
