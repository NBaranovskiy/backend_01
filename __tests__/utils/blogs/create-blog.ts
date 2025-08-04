// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import {BLOG_PATH} from '../../../src/core/paths/paths';
import { getBlogDto } from './get-blog-dto';
import { ResourceType } from '../../../src/core/types/resource-type';
import {BlogAttributes} from "../../../src/services/blog/application/dtos/blog-attributes";
import {BlogCreateInput} from "../../../src/services/blog/routes/input/blog-create.input";

export async function createBlog(
  app: Express,
  blogDto?: BlogAttributes,
): Promise<BlogAttributes> {
  const testBlogData: BlogCreateInput = {
    data: {
      type: ResourceType.Blogs,
      attributes: { ...getBlogDto(), ...blogDto },
    },
  };

  const createdBlogResponse = await request(app)
    .post(BLOG_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testBlogData)
    .expect(HttpStatus.Created);

  return createdBlogResponse.body;
}
