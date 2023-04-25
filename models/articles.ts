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
    console.log(`Executing SQL query: ${sql} with values: ${values}`);
    await db.run_add(sql, values);
    console.log(`Insertion successful`);
    return { status: 201 };
  } catch (err: any) {
    console.error(`Error inserting article: ${err}`);
    return err;
  }
}

export const update = async (id: number, article: any) => {
  let keys = Object.keys(article);
  let values = Object.values(article);
  // let key = keys.join(',');
  // let parm = '';
  let updates = '';
  for (let i: number = 0; i < values.length; i++) { updates+= `${keys[i]}= 
 ?,`}
  updates = updates.slice(0, -1);
  let sql = `UPDATE articles SET ${updates} WHERE id = ${id}`;
  console.log(sql);
  try {
    await db.run_update(sql, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
}

export const deleteById = async (id: any) => {
  let query = 'DELETE FROM articles WHERE id = ?';
  let value = [id];
  let data = await db.run_query(query, value);
  return data;
}