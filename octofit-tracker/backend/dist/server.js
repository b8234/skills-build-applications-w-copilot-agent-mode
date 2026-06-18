"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
const database_1 = require("./database");
const activities_1 = require("./routes/activities");
const leaderboard_1 = require("./routes/leaderboard");
const teams_1 = require("./routes/teams");
const users_1 = require("./routes/users");
const workouts_1 = require("./routes/workouts");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/users', users_1.usersRouter);
app.use('/api/teams', teams_1.teamsRouter);
app.use('/api/activities', activities_1.activitiesRouter);
app.use('/api/leaderboard', leaderboard_1.leaderboardRouter);
app.use('/api/workouts', workouts_1.workoutsRouter);
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        apiBaseUrl: config_1.apiBaseUrl,
        port: config_1.port,
        database: mongoose_1.default.connection.name || 'octofit_db',
        mongoState: mongoose_1.default.connection.readyState,
    });
});
async function connectToDatabase() {
    try {
        await (0, database_1.connectToDatabase)();
        console.log(`MongoDB connected at ${database_1.mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
}
app.listen(config_1.port, () => {
    console.log(`OctoFit backend listening on http://localhost:${config_1.port}`);
});
void connectToDatabase();
