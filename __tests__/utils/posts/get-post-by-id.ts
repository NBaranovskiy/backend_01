// @ts-ignore
import request from 'supertest';
import { Express } from 'express';
import { HttpStatus } from '../../../src/core/types/http-statuses';
import { POST_PATH } from '../../../src/core/paths/paths';
import { generateBasicAuthToken } from '../generate-admin-auth-token';
import {PostOutput} from "../../../src/services/post/routes/output/post.output";


export async function getPostById(
  app: Express,
  rideId: string,
): Promise<PostOutput> {
  const getResponse = await request(app)
    .get(`${POST_PATH}/${rideId}`)
    .set('Authorization', generateBasicAuthToken())
    .expect(HttpStatus.Ok);

  return getResponse.body;
}