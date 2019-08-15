"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const emojic_1 = __importDefault(require("emojic"));
const chalk_1 = __importDefault(require("chalk"));
const decache_1 = __importDefault(require("decache"));
const logger_1 = __importDefault(require("../../utils/logger"));
const index_1 = require("../../index");
const find_routes_1 = __importDefault(require("../../utils/find-routes"));
const import_route_1 = __importDefault(require("../../utils/import-route"));
exports.command = 'dev [dir]';
exports.aliases = ['d'];
exports.desc = 'start a development server';
exports.builder = {
    log: {
        alias: 'l',
        description: 'enable or disable logs',
        boolean: true,
        default: true,
    },
    port: {
        alias: 'p',
        description: 'specify which port the server should run on',
    },
    dir: {
        default: './',
        description: 'base directory for the light server',
        hidden: true,
    },
};
const handle = async (argv) => {
    logger_1.default.start(`${emojic_1.default.fire} igniting the server ${emojic_1.default.fire}`);
    const cwd = path_1.join(process.cwd(), argv.dir);
    const routesPath = path_1.join(cwd, './routes');
    const app = index_1.server({
        routes: routesPath,
        log: argv.log,
    });
    const { HOST = '0.0.0.0', } = process.env;
    let { PORT = 3000, } = process.env;
    if (argv.port) {
        PORT = argv.port;
    }
    app.server.listen(PORT, HOST, () => {
        logger_1.default.listening(`on port ${PORT}`);
        logger_1.default.hmr('starting the hot reloader');
        const chokidar = require('chokidar'); // eslint-disable-line
        const watcher = chokidar.watch(cwd);
        watcher.on('ready', () => {
            // TODO: if the following `decache` solution doesn't work, this does
            // let absolute = '';
            // Module.prototype.require = new Proxy(Module.prototype.require,{
            //   apply(target, thisArg, argumentsList){
            //     let name = argumentsList[0];
            //     if (path.isAbsolute(name)) {
            //       absolute = path.dirname(name);
            //       name = '';
            //     }
            //     if (!name.endsWith('.js')) {
            //       name += '.js';
            //     }
            //     delete require.cache[path.join(absolute, name)];
            //     return Reflect.apply(target, thisArg, argumentsList)
            //   }
            // });
            logger_1.default.hmr('watching for changes');
        });
        watcher.on('change', (p) => {
            logger_1.default.hmr(`swapping out ${chalk_1.default.yellow(path_1.relative(cwd, p))}`);
            app.router.reset();
            const routes = find_routes_1.default(routesPath);
            routes.forEach((route) => {
                if (route.path) {
                    decache_1.default(route.path);
                }
                import_route_1.default(app.router, route, {
                    log: argv.log,
                });
            });
        });
    });
};
exports.handler = (argv) => {
    handle(argv).catch((err) => {
        logger_1.default.fatal(err);
        process.exit(1);
    });
};
