import Routes from "./interfaces/routes.interface";
import HomeRoutes from "./routes/home.routes";
import AuthRoutes from "./routes/auth.routes";
import UserRoutes from "./routes/user.routes";
const apiRoutes: Routes[] = [
  new HomeRoutes(),
  new AuthRoutes(),
  new UserRoutes(),
];

export default apiRoutes;
