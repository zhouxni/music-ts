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
import RankDetail from "@/views/rankDetail";
import RankComment from "@/views/rankComment";
import HotComment from "@/views/hotComment";
import PlayList from "@/views/playList";
import Boutique from "@/views/boutique";
import AllCategory from "@/views/allCategory";
import PlayListDetail from "@/views/playListDetail";
import Dj from "@/views/dj";
import DjProgram from "@/views/djProgram";
import PlayDj from "@/views/playDj";
import DjRank from "@/views/djRank";
import Search from "@/views/search";
import PlayVideo from "@/views/playVideo";
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
  { title: "排行榜", component: Rank, path: "/rank", keepAlive: true },
  {
    component: SongerDetail,
    path: "/songerdetail",
    keepAlive: true,
  },
  {
    title: "MV视频",
    component: PlayMv,
    path: "/playmv",
    keepAlive: true,
  },
  {
    title: "畅听音乐",
    component: PlayMusic,
    path: "/playmusic",
    keepAlive: true,
  },
  {
    component: Album,
    path: "/album",
    keepAlive: true,
  },
  {
    component: RankDetail,
    path: "/rankdetail",
    keepAlive: true,
  },
  {
    title: "评论",
    path: "/comment",
    component: RankComment,
    keepAlive: true,
  },
  {
    title: "热门评论",
    path: "/hotcomment",
    component: HotComment,
  },
  {
    title: "歌单",
    path: "/playlist",
    component: PlayList,
    keepAlive: true,
  },
  {
    title: "精品专区",
    path: "/boutique",
    component: Boutique,
    keepAlive: true,
  },
  {
    title: "全部分类",
    path: "/allcategory",
    component: AllCategory,
    keepAlive: true,
  },
  {
    title: "歌单展示",
    path: "/playlistdetail",
    component: PlayListDetail,
    keepAlive: true,
  },
  {
    title: "电台",
    path: "/dj",
    component: Dj,
    keepAlive: true,
  },
  {
    title: "电台节目",
    path: "/djprogram",
    component: DjProgram,
    keepAlive: true,
  },
  {
    title: "畅听电台",
    path: "/playdj",
    component: PlayDj,
    keepAlive: true,
  },
  {
    title: "电台榜单",
    path: "/djrank",
    component: DjRank,
    keepAlive: true,
  },
  {
    path: "/search",
    component: Search,
    keepAlive: true,
  },
  {
    title: "精彩视频",
    path: "/playvideo",
    component: PlayVideo,
    keepAlive: true,
  },
];

export default routes;
