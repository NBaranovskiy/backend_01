import { Request, Response } from 'express';
import {blogService} from "../../application/blog.service";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";


export async function deleteBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await blogService.delete(id);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
