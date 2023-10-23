import { IRoutes } from "@interfaces";
import { AuthRoutes, UserRoutes, HomeRoutes, TopicRoutes } from "@routes/index";

const apiRoutes: IRoutes[] = [
  new HomeRoutes(),
  new AuthRoutes(),
  new UserRoutes(),
  new TopicRoutes(),
];

export default apiRoutes;
