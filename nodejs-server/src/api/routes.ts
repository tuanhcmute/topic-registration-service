import { IRoutes } from "@interfaces";
import { AuthRoutes, UserRoutes, HomeRoutes } from "@routes/index";

const apiRoutes: IRoutes[] = [
  new HomeRoutes(),
  new AuthRoutes(),
  new UserRoutes(),
];

export default apiRoutes;
