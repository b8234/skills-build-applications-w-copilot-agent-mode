"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamsRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const models_1 = require("../models");
exports.teamsRouter = (0, express_1.Router)();
exports.teamsRouter.get('/', async (_request, response, next) => {
    try {
        const items = await models_1.TeamModel.find()
            .populate('captain', 'fullName username')
            .populate('members', 'fullName username')
            .sort({ createdAt: 1 })
            .lean();
        response.json({
            resource: 'teams',
            apiBaseUrl: config_1.apiBaseUrl,
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
