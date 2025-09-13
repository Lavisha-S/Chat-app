"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("config"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var package_json_1 = require("../package.json");
var logger_1 = __importDefault(require("./utils/logger"));
var socket_1 = __importDefault(require("./socket"));
var port = config_1.default.get("port");
var host = config_1.default.get("host");
var corsOrigin = config_1.default.get("corsOrigin");
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true,
    },
});
app.get("/", function (_, res) {
    res.send("Server is up and running version:".concat(package_json_1.version, " \uD83D\uDE80"));
});
httpServer.listen(port, host, function () {
    logger_1.default.info("\uD83D\uDE80 Server version:".concat(package_json_1.version, " is listening on ").concat(host, ":").concat(port, " \uD83D\uDE80"));
    logger_1.default.info("http://".concat(host, ":").concat(port));
    (0, socket_1.default)({ io: io });
});
