import { Request, Response } from 'express';

import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {postService} from "../../application/post.service";
import {mapToPostOutput} from "../mappers/map-to-post-output.util";


export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postService.findByIdOrFail(id);

    const postOutput = mapToPostOutput(post);

    res.status(HttpStatus.Ok).send(postOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
