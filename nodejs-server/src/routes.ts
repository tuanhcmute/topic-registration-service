import AuthRoutes from "./routes/auth.routes";
import Routes from "./interfaces/routes.interface";
import UserRoutes from "./routes/user.routes";
import HomeRoutes from "./routes/home.routes";
const apiRoutes: Routes[] = [
  new UserRoutes(),
  new AuthRoutes(),
  new HomeRoutes(),
];

export default apiRoutes;
