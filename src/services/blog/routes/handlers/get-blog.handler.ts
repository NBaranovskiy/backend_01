import { Request, Response } from 'express';
import { blogService } from "../../application/blog.service";
import { mapToBlogOutput } from "../mappers/map-to-driver-output.util";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { errorsHandler } from "../../../../core/errors/errors.handler";

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    // ❗ Используем findById, чтобы получить null, если блог не существует
    const blog = await blogService.findById(id);

    // ❗ Если блог не найден, возвращаем 404 Not Found
    if (!blog) {
      res.status(HttpStatus.NotFound).send('Blog not found.');
      return
    }

    // Если блог существует, продолжаем как обычно
    const blogOutput = mapToBlogOutput(blog);
    res.status(HttpStatus.Ok).send(blogOutput);

  } catch (e: unknown) {
    // Этот блок обработает только другие непредвиденные ошибки
    errorsHandler(e, res);
  }
}