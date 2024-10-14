"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
exports.default = (app) => {
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use((0, cors_1.default)({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    }));
};
