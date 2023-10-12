import Routes from "./interfaces/routes.interface";
import HomeRoutes from "./routes/home.routes";
import AuthRoutes from "./routes/auth.routes";
const apiRoutes: Routes[] = [new HomeRoutes(), new AuthRoutes()];

export default apiRoutes;
