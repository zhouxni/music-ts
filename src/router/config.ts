import Login from "@/views/login";
import Phone from "@/views/phone";
import VerCode from "@/views/verCode";
import Home from "@/views/home";
import MusicLib from "@/views/musicLib";
import User from "@/views/user";
import Songer from "@/views/songer";
import Rank from "@/views/rank";
import SongerDetail from "@/views/songerDetail";
import PlayMv from "@/views/playmv";
import PlayMusic from "@/views/playMusic";
import Album from "@/views/album";
interface Route {
  title?: string;
  component: any;
  path: string;
  back?: boolean;
  children?: any[];
  exact?: boolean;
  redirect?: string;
  keepAlive?: boolean;
  name?: string;
}
const routes: Route[] = [
  {
    title: "用户登录",
    component: Login,
    path: "/login",
    back: false,
  },
  { title: "填写手机号", component: Phone, path: "/phone" },
  {
    title: "填写验证码",
    component: VerCode,
    path: "/vercode",
  },
  {
    component: Home,
    exact: false,
    path: "/home",
    redirect: "/home/musicLib",
    keepAlive: true,
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
  {
    title: "歌手",
    component: Songer,
    path: "/songer",
    keepAlive: true,
  },
  { title: "排行榜", component: Rank, path: "/rank" },
  {
    component: SongerDetail,
    path: "/songerdetail",
    keepAlive: true,
  },
  {
    title: "MV视频",
    component: PlayMv,
    path: "/playmv",
  },
  {
    title: "畅听音乐",
    component: PlayMusic,
    path: "/playmusic",
  },
  {
    component: Album,
    path: "/album",
    keepAlive: true,
  },
];

export default routes;
