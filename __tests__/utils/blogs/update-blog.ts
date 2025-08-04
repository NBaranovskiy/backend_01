// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { getBlogDto } from './get-blog-dto';
import {BLOG_PATH} from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { ResourceType } from '../../../src/core/types/resource-type';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import {BlogAttributes} from "../../../src/services/blog/application/dtos/blog-attributes";
import {BlogUpdateInput} from "../../../src/services/blog/routes/input/blog-update.input";

export async function updateBlog(
  app: Express,
  blogId: string,
  blogDto?: BlogAttributes,
): Promise<void> {
  const testBlogData: BlogUpdateInput = {
    data: {
      type: ResourceType.Blogs,
      id: blogId,
      attributes: { ...getBlogDto(), ...blogDto },
    },
  };

  const updatedBlogResponse = await request(app)
    .put(`${BLOG_PATH}/${blogId}`)
    .set('Authorization', generateBasicAuthToken())
    .send(testBlogData)
    .expect(HttpStatus.NoContent);

  return updatedBlogResponse.body;
}
