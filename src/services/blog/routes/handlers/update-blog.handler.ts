import { Request, Response } from 'express';
import {blogService} from "../../application/blog.service";
import {HttpStatus} from "../../../../core/types/http-statuses";
import {errorsHandler} from "../../../../core/errors/errors.handler";
import {BlogUpdateInput} from "../input/blog-update.input";


export async function updateBlogHandler(
  req: Request<{ id: string }, {}, BlogUpdateInput>,
  res: Response,
) {
  try {
    const id = req.params.id;

    await blogService.update(id, req.body.data.attributes);

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
