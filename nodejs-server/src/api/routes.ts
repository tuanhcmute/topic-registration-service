import { IRoutes } from "@interfaces";
import { AuthRoutes, UserRoutes, TopicRoutes } from "@routes/index";

const apiRoutes: IRoutes[] = [
  new AuthRoutes(),
  new UserRoutes(),
  new TopicRoutes(),
];

export default apiRoutes;
