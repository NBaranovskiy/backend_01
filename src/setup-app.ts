import express, { Express } from 'express';

import { BLOG_PATH, POST_PATH, TESTING_PATH } from './core/paths/paths';
import {testingRoute} from "./services/test/routes/testing.route";
import {blogRoute} from "./services/blog/routes/blog.route";
import {postRoute} from "./services/post/routes/post.route";


export const setupApp = (app: Express) => {
  app.use(express.json());

  app.use(BLOG_PATH, blogRoute);
  app.use(POST_PATH, postRoute);
  app.use(TESTING_PATH, testingRoute);
  return app;
};