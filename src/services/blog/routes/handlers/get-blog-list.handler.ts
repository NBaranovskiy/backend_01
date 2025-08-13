// src/services/blog/handlers/get-blog-list.handler.ts

import { Request, Response } from 'express';
import { errorsHandler } from '../../../../core/errors/errors.handler';
import { mapToBlogListPaginatedOutput } from '../mappers/map-to-blog-list-paginated-output.util';
import { BlogQueryInput } from '../input/blog-query.input';
import { blogService } from "../../application/blog.service";
import { HttpStatus } from "../../../../core/types/http-statuses";
import { validationResult } from 'express-validator'; // ✅ Импортируем validationResult

export async function getBlogListHandler(
  req: Request<{}, {}, {}, BlogQueryInput>,
  res: Response,
) {
  try {
    // ✅ Проверяем результат валидации. Теперь req.query безопасно типизирован.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(HttpStatus.BadRequest).json({ errors: errors.array() });
      return
    }

    // ✅ req.query теперь имеет правильный тип BlogQueryInput
    const queryInput: BlogQueryInput = req.query;

    const { items, totalCount } = await blogService.findMany(queryInput);

    const blogListOutput = mapToBlogListPaginatedOutput(items, {
      pageNumber: queryInput.pageNumber,
      pageSize: queryInput.pageSize,
      totalCount,
    });

    res.status(HttpStatus.Ok).send(blogListOutput);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}