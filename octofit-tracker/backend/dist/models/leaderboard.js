"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    points: { type: Number, required: true, min: 0 },
    user: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose_1.Types.ObjectId, ref: 'Team', required: true },
}, { timestamps: true });
exports.LeaderboardModel = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
