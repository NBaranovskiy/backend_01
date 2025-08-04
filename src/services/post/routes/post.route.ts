import {Router} from "express";
import {
    paginationAndSortingValidation
} from "../../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {inputValidationResultMiddleware} from "../../../core/middlewares/validation/input-validtion-result.middleware";
import {idValidation} from "../../../core/middlewares/validation/params-id.validation-middleware";
import {superAdminGuardMiddleware} from "../../../auth/middlewares/super-admin.guard-middleware";
import {PostSortField} from "./input/post-sort-field";
import {getPostHandler} from "./handlers/get-post.handler";
import {getPostListHandler} from "./handlers/get-post-list.handler";
import {createPostHandler} from "./handlers/create-post.handler";
import {updatePostHandler} from "./handlers/update-post.handler";
import {postCreateInputValidation, postUpdateInputValidation} from "./post.input-dto.validation-middlewares";
import {deletePostHandler} from "./handlers/delete-post.handler";

export const postRoute = Router({});

postRoute.use(superAdminGuardMiddleware);

postRoute
    .get(
        '',
        paginationAndSortingValidation(PostSortField),
        inputValidationResultMiddleware,
        getPostListHandler,
    )
    .get('/:id', idValidation, inputValidationResultMiddleware, getPostHandler)

  .post(
    '',
    postCreateInputValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )

  .put(
    '/:id',
    idValidation,
    postUpdateInputValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    '/:id',
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );