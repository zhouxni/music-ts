import Login from "../views/login";
interface Route {
  title: string;
  component: () => JSX.Element;
  path: string;
}
const routes: Route[] = [
  { title: "用户登录", component: Login, path: "/login" },
];

export default routes;
