"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const micro_1 = __importDefault(require("micro"));
const find_my_way_1 = __importDefault(require("find-my-way"));
const find_routes_1 = __importDefault(require("./utils/find-routes"));
const import_routes_1 = __importDefault(require("./utils/import-routes"));
const add_route_1 = __importDefault(require("./utils/add-route"));
const light = ({ routes, opts, }) => {
    const router = find_my_way_1.default({
        ignoreTrailingSlash: true,
    });
    let routeObjs = [];
    if (typeof routes === 'string') {
        const files = find_routes_1.default(routes);
        routeObjs = import_routes_1.default(files, routes);
    }
    else {
        routeObjs = routes;
    }
    const server = micro_1.default(async (req, res) => router.lookup(req, res));
    routeObjs.forEach((route) => {
        add_route_1.default(router, route, opts);
    });
    return {
        router,
        server,
    };
};
exports.default = light;
