import React from "react";
import styled from "styled-components";
import px2rem from "../../util/px2rem";
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
  &::placeholder {
    color: #989898;
  }
`;
const Button = styled.button`
  width: 100%;
  height: ${px2rem(40)};
  border-radius: ${px2rem(4)};
  margin-bottom: ${px2rem(15)};
  border: none;
  outline: none;
  font-size: ${px2rem(14)};
  background: ${(props) => props.color};
  position: relative;
  &:active::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;
function Login() {
  return (
    <Wrap>
      <form style={{ marginBottom: px2rem(30) }}>
        <Input placeholder="邮箱 / 手机号" />
        <Input type="password" placeholder="6-16位密码" />
      </form>
      <Button color="#fce024">登录</Button>
      <Button color="#f2f2f0">手机号快捷登录</Button>
      <a style={{ color: "#989898", fontSize: px2rem(13) }}>忘记密码</a>
    </Wrap>
  );
}

export default Login;
