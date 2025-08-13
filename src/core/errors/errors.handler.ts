import { Response } from 'express';
import { RepositoryNotFoundError } from './repository-not-found.error';
import { HttpStatus } from '../types/http-statuses';
import { DomainError } from './domain.error';
import { ValidationErrorListOutput } from '../types/validationError.dto';

// Добавим новый тип для простоты
type ValidationErrorType = {
  status: HttpStatus;
  detail: string;
  source?: string;
  code?: string | null;
};

// Функция для формирования ответа, которая соответствует ожидаемому формату для ошибок валидации
export const createErrorMessages = (
  errors: ValidationErrorType[]
): ValidationErrorListOutput => {
  return {
    errorsMessages: errors.map(error => ({
      message: error.detail,
      field: error.source || '',
    })),
  };
};

export function errorsHandler(error: unknown, res: Response): void {
  // 1. Обработка ошибки "Ресурс не найден" (404)
  if (error instanceof RepositoryNotFoundError) {
    const httpStatus = HttpStatus.NotFound;
    res.status(httpStatus).send(); // Отправляем пустой ответ или с простым сообщением
    return;
  }

  // 2. Обработка доменных ошибок (422 Unprocessable Entity)
  if (error instanceof DomainError) {
    const httpStatus = HttpStatus.UnprocessableEntity;
    res.status(httpStatus).send({ // Отправляем кастомный объект, если это нужно
      errors: [
        {
          status: httpStatus,
          source: { pointer: error.source },
          detail: error.message,
          code: error.code,
        },
      ],
    });
    return;
  }

  // 3. Обработка ошибок валидации (400 Bad Request)
  // Это самый частый случай, когда нужно использовать createErrorMessages
  // Важно: в вашем коде выше нет прямого вызова, но это пример того, как это должно работать
  // Если ошибка валидации (например, из express-validator) попадает в этот обработчик
  // то она должна быть обработана здесь
  // Пример (предполагаем, что у вас есть какой-то тип ошибки валидации)
  // if (error instanceof CustomValidationError) {
  //   res.status(HttpStatus.BadRequest).send(createErrorMessages(error.errors));
  //   return;
  // }

  // 4. Обработка всех остальных ошибок (500 Internal Server Error)
  res.status(HttpStatus.InternalServerError).send();
}