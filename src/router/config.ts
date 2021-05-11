import Login from "../views/login";
import Phone from "../views/phone";
import VerCode from "../views/verCode";
import Home from "../views/home";
import MusicLib from "../views/musicLib";
import User from "../views/user";
interface Route {
  title?: string;
  component: (props: any) => JSX.Element;
  path: string;
  back?: boolean;
  children?: any[];
  exact?: boolean;
}
const routes: Route[] = [
  { title: "用户登录", component: Login, path: "/login", back: false },
  { title: "填写手机号", component: Phone, path: "/phone" },
  { title: "填写验证码", component: VerCode, path: "/vercode" },
  {
    component: Home,
    exact: false,
    path: "/home",
    children: [
      {
        component: MusicLib,
        path: "/home/musicLib",
      },
      {
        component: User,
        path: "/home/user",
      },
    ],
  },
];

export default routes;
