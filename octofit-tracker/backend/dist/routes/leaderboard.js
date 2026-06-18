"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const models_1 = require("../models");
exports.leaderboardRouter = (0, express_1.Router)();
exports.leaderboardRouter.get('/', async (_request, response, next) => {
    try {
        const items = await models_1.LeaderboardModel.find()
            .populate('user', 'fullName username')
            .populate('team', 'name city')
            .sort({ rank: 1 })
            .lean();
        response.json({
            resource: 'leaderboard',
            apiBaseUrl: config_1.apiBaseUrl,
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
