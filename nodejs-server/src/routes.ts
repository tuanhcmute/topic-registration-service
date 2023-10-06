import Routes from "./interfaces/routes.interface";
import HomeRoutes from "./routes/home.routes";
const apiRoutes: Routes[] = [new HomeRoutes()];

export default apiRoutes;
