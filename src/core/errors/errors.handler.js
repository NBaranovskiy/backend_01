"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createErrorMessages = void 0;
exports.errorsHandler = errorsHandler;
const repository_not_found_error_1 = require("./repository-not-found.error");
const http_statuses_1 = require("../types/http-statuses");
const domain_error_1 = require("./domain.error");
// Функция для формирования ответа, которая соответствует ожидаемому формату для ошибок валидации
const createErrorMessages = (errors) => {
    return {
        errorsMessages: errors.map(error => ({
            message: error.detail,
            field: error.source || '',
        })),
    };
};
exports.createErrorMessages = createErrorMessages;
function errorsHandler(error, res) {
    // 1. Обработка ошибки "Ресурс не найден" (404)
    if (error instanceof repository_not_found_error_1.RepositoryNotFoundError) {
        const httpStatus = http_statuses_1.HttpStatus.NotFound;
        res.status(httpStatus).send(); // Отправляем пустой ответ или с простым сообщением
        return;
    }
    // 2. Обработка доменных ошибок (422 Unprocessable Entity)
    if (error instanceof domain_error_1.DomainError) {
        const httpStatus = http_statuses_1.HttpStatus.UnprocessableEntity;
        res.status(httpStatus).send({
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
    res.status(http_statuses_1.HttpStatus.InternalServerError).send();
}
