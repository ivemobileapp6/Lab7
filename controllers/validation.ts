import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from 'koa-router';
import { article } from '../schemas/articles.schema'; 

const v = new Validator()

export const validateArticle = async (ctx: RouterContext, next: any) => {
  const validationOptions = { 
    throwError: true,
    allowUnknownAttributes: false
  };
  const body = ctx.request.body;
  try {
    await v.validate(body, article, validationOptions);
    await next();
  } catch (error) {
    if (error instanceof ValidationError) {
      ctx.status = 400;
      ctx.body = {
        error: 'Invalid request body',
        details: error.details
      };
    } else {
      throw error;
    }
  }
};