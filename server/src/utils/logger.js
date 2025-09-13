"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = __importDefault(require("pino"));
var dayjs_1 = __importDefault(require("dayjs"));
var loggerOptions = {
    base: { pid: false },
    timestamp: function () { return ",\"time\":\"".concat((0, dayjs_1.default)().format(), "\""); },
};
var log = (0, pino_1.default)(__assign(__assign({}, loggerOptions), { transport: {
        target: "pino-pretty",
        options: { colorize: true },
    } }));
exports.default = log;
