import { Request, Response } from 'express';

import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {postService} from "../../application/post.service";



export async function updatePostHandler(
  req: Request<{ id: string }, {}>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await postService.update(id, req.body);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
