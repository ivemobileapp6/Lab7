import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/articles";
import {basicAuth} from "../controllers/auth"
import {validateArticle} from '../controllers/validation';

const articles = [
  { title: 'hello article', fullText: 'some text here to fill the body' },
  { title: 'another article', fullText: 'again here is some text here to fill the body' },
  { title: 'coventry university', fullText: 'some news about conventry university' },
  { title: 'smart campus', fullText: 'smart campus is coming to IVE' }
];

const router = new Router({ prefix: '/api/v1/articles' });
const getAll = async (ctx: RouterContext, next: any) => {
  // ctx.body = articles;
  let articles = await model.getAll();
  if (articles.length) {
    ctx.body = articles;
  } else {
    ctx.status = 404
  }
  await next();
};
const getById = async (ctx: RouterContext, next: any) => {
  // let id = +ctx.params.id // +variables change to number only need to add + 
  // if ((id < articles.length + 1) && (id > 0)) { //index start from 0, length start from 1
  //   ctx.body = articles[id - 1];
  // } else {
  //   ctx.status = 404;
  // }
  let id = ctx.params.id
  let article = await model.getID(id);
  if (article.length) {
    ctx.body = article[0]; //object or array? expect object as we already choose to select 1 by ID, so it should add [0]
  } else {
    ctx.status = 404
  }
  await next();
};
const createArticle = async (ctx: RouterContext, next: any) => {
  // let { title, fullText } = ctx.request.body;
  // let newArticle = { title: title, fullText: fullText };
  // articles.push(newArticle);
  // ctx.status = 201;
  // ctx.body = newArticle;
  const body = ctx.request.body;
  let result = await model.add(body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" }
  }
  await next();
};

const updateArticle = async (ctx: RouterContext, next: any) => {
  // let { title, fullText } = ctx.request.body;
  // let newArticle2 = { title: title, fullText: fullText };
  // let id = +ctx.params.id // +variables change to number only need to add + 
  // if ((id < articles.length + 1) && (id > 0)) { //index start from 0, length start from 1
  //   articles[id - 1].title = title;
  //   articles[id - 1].fullText = fullText;
  //   ctx.body = newArticle2;
  //   ctx.status = 200;
  //   ctx.body = articles;
  // } else {
  //   ctx.status = 404;
  // }
  let id = ctx.params.id
  const body = ctx.request.body;
  let result = await model.update(id, body);
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" }
  }
  await next();
};
const deleteArticle = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id // +variables change to number only need to add + 
  if ((id < articles.length + 1) && (id > 0)) { //index start from 0, length start from 1
    articles.splice(id - 1, 1);
    ctx.body = articles;
    ctx.status = 200;
  } else {
    ctx.status = 404;
  }
  await next();
};

router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateArticle, createArticle);
router.get('/:id([0-9]{1,})', getById); //regular expression needs to be in a ()
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.del('/:id([0-9]{1,})', basicAuth, bodyParser(), deleteArticle);

export { router };