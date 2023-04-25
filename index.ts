import Koa from "koa";
import Router, {RouterContext} from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import passport from 'koa-passport';
import cors from '@koa/cors'
import {router as articles} from "./routes/articles";
import {router as users} from "./routes/special"

import serve from 'koa-static-folder';

const app: Koa= new Koa();
// const router: Router = new Router();

// const welcomeAPI = async(ctx: RouterContext, next:any)=> {
//   ctx.body = { message: "Welcome to the blog API!"};
//   await next(); 
// }
  
// router.get('/api/v1', welcomeAPI); // version 1,2,3 if keep updating, should keep all older 

// advantage is if I found a bug in a certain endpoint, i can change it in a certain function, so no need to find from a whole page
app.use(cors());
app.use(logger());
app.use(serve('./docs'));
app.use(json());
app.use(passport.initialize());
app.use(articles.routes()); //where does routes come from, all router.xxx yyy will be called
app.use(users.routes());

// app.use(async(ctx: RouterContext, next: any) => {
//   try{
//     await next();
//     if(ctx.status === 404){
//       ctx.status = 404;
//       ctx.body = {err: "Resource not found"};
//     } 
//   }catch(err:any){
//     ctx.body = {err:err}
//   }
// });
// app.use(router.routes());
app.listen(10888);
