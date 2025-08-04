// @ts-ignore
import request from 'supertest';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { Express } from 'express';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import { POST_PATH } from '../../../src/core/paths/paths';
import { ResourceType } from '../../../src/core/types/resource-type';
import {PostAttributes} from "../../../src/services/post/application/dtos/post-attributes";
import {PostOutput} from "../../../src/services/post/routes/output/post.output";
import {getPostDto} from "./get-post-dto";

export async function createPost(
  app: Express,
  postDto?: PostAttributes,
): Promise<PostOutput> {
  const post = await createPost(app);

  const defaultPostData = getPostDto(post.data.id);

  const testPostData = {
    data: {
      type: ResourceType.Posts,
      attributes: { ...defaultPostData, ...postDto },
    },
  };

  const createdPostResponse = await request(app)
    .post(POST_PATH)
    .set('Authorization', generateBasicAuthToken())
    .send(testPostData)
    .expect(HttpStatus.Created);

  return createdPostResponse.body;
}