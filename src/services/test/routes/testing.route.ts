import { Request, Response, Router } from 'express';
import {blogCollection, postCollection} from "../../../db/mongo.db";
import {HttpStatus} from "../../../core/types/http-statuses";

export const testingRoute = Router({});

testingRoute.delete('/all-data', async (req: Request, res: Response) => {
  //truncate db
  await Promise.all([
    blogCollection.deleteMany(),
    postCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatus.NoContent);
});