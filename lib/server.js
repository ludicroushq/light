"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = __importDefault(require("micro"));
const find_my_way_1 = __importDefault(require("find-my-way"));
const find_routes_1 = __importDefault(require("./utils/find-routes"));
const import_route_1 = __importDefault(require("./utils/import-route"));
const light = ({ routes: routesPath, log = true, }) => {
    const router = find_my_way_1.default({
        ignoreTrailingSlash: true,
    });
    const server = micro_1.default(async (req, res) => router.lookup(req, res));
    const routes = find_routes_1.default(routesPath);
    routes.forEach((route) => {
        import_route_1.default(router, route, {
            log,
        });
    });
    return {
        router,
        server,
    };
};
exports.default = light;
