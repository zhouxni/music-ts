import React, { memo, useState } from "react";
import styled from "styled-components";
import px2rem from "@/util/px2rem";
import { cellphone, emaillogin } from "@Api/login";
import { phone, email } from "@Config/regexp";
import { Toast } from "antd-mobile";
import Button from "@Component/button";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { Encrypt } from "@Config/secret";
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
function Login() {
  const [account, setAccount] = useState("");
  const [password, setPass] = useState("");
  const history = useHistory();
  const login = () => {
    if (!account.trim()) {
      Toast.info("请输入邮箱或手机号");
      return;
    }
    if (!password.trim()) {
      Toast.info("请输入密码");
      return;
    }
    if (!phone.test(account) && !email.test(account)) {
      Toast.info("邮箱或手机号错误");
      return;
    }
    if (phone.test(account)) {
      cellphone({ phone: account, password }).then((res: any) => {
        Cookies.set("token", Encrypt(res.token));
      });
    } else {
      emaillogin({ email: account, password }).then((res: any) => {
        Cookies.set("token", Encrypt(res.token));
      });
    }
  };
  return (
    <Wrap>
      <form style={{ marginBottom: px2rem(30), width: "100%" }}>
        <Input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          placeholder="邮箱 / 手机号"
        />
        <Input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="6-16位密码"
        />
      </form>
      <Button color="#fce024" onClick={login}>
        登录
      </Button>
      <Button color="#f2f2f0" onClick={() => history.push("/phone")}>
        手机号快捷登录
      </Button>
      <a
        style={{ color: "#989898", fontSize: px2rem(13) }}
        onClick={() =>
          Toast.info("暂不支持，请用手机号一键登录", 3, () =>
            history.push("/phone")
          )
        }
      >
        忘记密码
      </a>
    </Wrap>
  );
}

export default memo(Login);
