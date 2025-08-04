// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import {BlogOutput} from "../../../src/services/blog/routes/output/blog.output";
import {BLOG_PATH} from "../../../src/core/paths/paths";

export async function getBlogById(
  app: Express,
  blogId: string,
): Promise<BlogOutput> {
  const blogResponse = await request(app)
    .get(`${BLOG_PATH}/${blogId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return blogResponse.body;
}
