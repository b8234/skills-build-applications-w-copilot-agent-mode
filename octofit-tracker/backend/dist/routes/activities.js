"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitiesRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const models_1 = require("../models");
exports.activitiesRouter = (0, express_1.Router)();
exports.activitiesRouter.get('/', async (_request, response, next) => {
    try {
        const items = await models_1.ActivityModel.find()
            .populate('user', 'fullName username')
            .sort({ completedAt: -1 })
            .lean();
        response.json({
            resource: 'activities',
            apiBaseUrl: config_1.apiBaseUrl,
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
