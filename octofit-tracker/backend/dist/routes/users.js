"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const models_1 = require("../models");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter.get('/', async (_request, response, next) => {
    try {
        const items = await models_1.UserModel.find().sort({ createdAt: 1 }).lean();
        response.json({
            resource: 'users',
            apiBaseUrl: config_1.apiBaseUrl,
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
