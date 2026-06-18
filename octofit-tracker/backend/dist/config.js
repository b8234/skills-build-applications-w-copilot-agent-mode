"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.apiBaseUrl = exports.port = void 0;
exports.port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
exports.apiBaseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
exports.mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
