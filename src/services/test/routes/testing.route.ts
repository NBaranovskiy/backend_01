import { Request, Response, Router } from 'express';
import {blogCollection, postCollection} from "../../../db/mongo.db";
import {HttpStatus} from "../../../core/types/http-statuses";

export const testingRoute = Router({});

testingRoute.delete('/all-data', async (req: Request, res: Response) => {
  //truncate db
  try {
    await Promise.all([
    blogCollection.deleteMany(),
    postCollection.deleteMany(),
  ]);
  res.sendStatus(HttpStatus.NoContent);
  }catch (error) {
        console.error('Error deleting all data:', error);
        res.sendStatus(500); // Send 500 Internal Server Error if something goes wrong
    }
});