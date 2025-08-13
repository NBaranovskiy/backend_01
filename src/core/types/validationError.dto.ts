
// Этот тип описывает одну ошибку, как её ожидает авто-тест.
export type ValidationErrorOutput = {
  message: string;
  field: string;
};

// Этот тип описывает весь объект ответа с ошибками.
export type ValidationErrorListOutput = {
    errorsMessages: ValidationErrorOutput[];
};