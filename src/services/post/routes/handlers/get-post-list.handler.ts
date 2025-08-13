import { Request, Response } from 'express';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { PostQueryInput } from "../input/post-query.input";
import { postService } from "../../application/post.service";
import { mapToPostListPaginatedOutput } from "../mappers/map-to-post-list-paginated-output.util";
import { validationResult } from 'express-validator'; // ✅ Импортируем validationResult
import { HttpStatus } from '../../../../core/types/http-statuses';

export async function getPostListHandler(
  req: Request<{}, {}, {}, PostQueryInput>,
  res: Response,
) {
  try {
    // ✅ Проверяем результат валидации. Если есть ошибки, сразу возвращаем 400.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BadRequest).json({ errors: errors.array() });
      return
    }

    // ✅ Теперь TypeScript знает, что req.query имеет правильные типы.
    // Мы можем безопасно использовать его.
    const queryInput: PostQueryInput = req.query;

    const { items, totalCount } = await postService.findMany(queryInput);

    const postListOutput = mapToPostListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HttpStatus.Ok).send(postListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}