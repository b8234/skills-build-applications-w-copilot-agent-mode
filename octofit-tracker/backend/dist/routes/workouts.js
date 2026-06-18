"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutsRouter = void 0;
const express_1 = require("express");
const config_1 = require("../config");
const models_1 = require("../models");
exports.workoutsRouter = (0, express_1.Router)();
exports.workoutsRouter.get('/', async (_request, response, next) => {
    try {
        const items = await models_1.WorkoutModel.find()
            .populate('assignedTo', 'fullName username')
            .sort({ createdAt: 1 })
            .lean();
        response.json({
            resource: 'workouts',
            apiBaseUrl: config_1.apiBaseUrl,
            count: items.length,
            items,
        });
    }
    catch (error) {
        next(error);
    }
});
