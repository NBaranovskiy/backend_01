// src/index.ts
import express from 'express';
import { setupApp } from './setup-app';
import { SETTINGS } from './core/settings/settings';
import { runDB } from './db/mongo.db';

const app = express();
setupApp(app);

export const getApp = async () => {
  await runDB(SETTINGS.MONGO_URL);
  return app;
};

export default app;