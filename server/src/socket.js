"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var logger_1 = __importDefault(require("./utils/logger"));
var EVENTS = {
    connection: "connection",
    CLIENT: {
        CREATE_ROOM: "CREATE_ROOM",
        SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
        JOIN_ROOM: "JOIN_ROOM",
    },
    SERVER: {
        ROOMS: "ROOMS",
        JOINED_ROOM: "JOINED_ROOM",
        ROOM_MESSAGE: "ROOM_MESSAGE",
    },
};
var rooms = {};
function socket(_a) {
    var io = _a.io;
    io.on(EVENTS.connection, function (socket) {
        logger_1.default.info("New client connected with id:".concat(socket.id));
        socket.on("disconnect", function () {
            console.log("Client disconnected");
        });
        // show all the rooms to the client
        socket.emit(EVENTS.SERVER.ROOMS, rooms);
        /**
         * Client creates a new room
         * @param roomName
         */
        socket.on(EVENTS.CLIENT.CREATE_ROOM, function (_a) {
            var roomName = _a.roomName;
            console.log("Client joined ".concat(roomName));
            // create a roomId
            var roomId = (0, nanoid_1.nanoid)();
            // add a new room to rooms object
            rooms[roomId] = { name: roomName };
            // socket.join(roomId)
            socket.join(roomId);
            // broadcast an event saying that a new room has been created
            socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);
            // emit back to the room creator with all the rooms
            socket.emit(EVENTS.SERVER.ROOMS, rooms);
            // emit an event back to room creator that they have joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
        /**
         * When a client sends a new room message
         * @param roomId
         * @param message
         * @param username
         */
        socket.on(EVENTS.CLIENT.SEND_ROOM_MESSAGE, function (_a) {
            var roomId = _a.roomId, message = _a.message, username = _a.username;
            console.log("Client sent a new message to ".concat(roomId));
            var time = new Date(); // get the current time
            // emit an event to all clients in the room with this roomid
            socket.to(roomId).emit(EVENTS.SERVER.ROOM_MESSAGE, {
                message: message,
                username: username,
                time: "".concat(time.getHours(), ":").concat(time.getMinutes()),
            });
        });
        /**
         * When a client joins a room
         * @param roomId
         */
        socket.on(EVENTS.CLIENT.JOIN_ROOM, function (roomId) {
            console.log("Client joined ".concat(roomId));
            // socket.join(roomId)
            socket.join(roomId);
            // emit an event back to room creator that they have joined the room
            socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
        });
    });
}
exports.default = socket;
