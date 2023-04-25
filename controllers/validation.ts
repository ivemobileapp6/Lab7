import { Validator, ValidationError } from 'jsonschema';
import { RouterContext } from 'koa-router';
import { article } from '../schemas/articles.schema'; 

const v = new Validator()

export const validateArticle = async (ctx: RouterContext, next: any) => {
 const validationOptions = { 
 throwError: true, //if throw error = false is useless because it will still run
 allowUnknownAttributes: false // does not allow admin: "xxx"
 }
 const body = ctx.request.body;
 try {
   v.validate(body, article, validationOptions)
 await next()
 } catch (error) {
 if (error instanceof ValidationError) {
    ctx.body = error;
    ctx.status = 400;
    } else {
    throw error;
    }
  }
}