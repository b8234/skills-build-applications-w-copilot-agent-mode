"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_request, response) => {
    response.json({
        status: 'ok',
        port,
        database: mongoose_1.default.connection.name || 'octofit_db',
        mongoState: mongoose_1.default.connection.readyState,
    });
});
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(mongoUri);
        console.log(`MongoDB connected at ${mongoUri}`);
    }
    catch (error) {
        console.error('MongoDB connection failed', error);
    }
}
app.listen(port, () => {
    console.log(`OctoFit backend listening on http://localhost:${port}`);
});
void connectToDatabase();
