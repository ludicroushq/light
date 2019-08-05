"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const emojic_1 = __importDefault(require("emojic"));
const logger_1 = __importDefault(require("../../utils/logger"));
const index_1 = require("../../index");
exports.command = 'start [dir]';
exports.aliases = ['s'];
exports.desc = 'start a production server';
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
    });
};
exports.handler = (argv) => {
    handle(argv).catch((err) => {
        logger_1.default.fatal(err);
        process.exit(1);
    });
};
