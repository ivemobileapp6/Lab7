import * as db from '../helpers/database';

export const getAll = async () => {
  let query = 'select * from articles;';
  let data = await db.run_query(query, null);
  return data;
}

export const getID = async (id: any) => {
  let query = 'select * from articles where ID = ?';
  let value = [id]
  let data = await db.run_query(query, value);
  return data;
}

export const add = async (article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let parm = '';
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let sql = `Insert INTO articles (${keys}) VALUES (${parm})`;
  try {
    await db.run_insert(sql, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const update = async (id: any, article: any) => {
  let query = 'select * from articles where ID = ?';
  let value = [id]
  let data = await db.run_query(query, value);
  let keys = Object.keys(article);
  let values = Object.values(article);
  let key = keys.join(',');
  let parm = '';
  for (let i: number = 0; i < values.length; i++) { parm += '?,' }
  parm = parm.slice(0, -1);
  let sql = `Insert INTO articles (${keys}) VALUES (${parm})`;
  try {
    await db.run_insert(sql, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}