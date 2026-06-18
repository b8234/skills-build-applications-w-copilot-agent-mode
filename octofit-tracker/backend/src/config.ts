export const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

export const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';