import { Sequelize, QueryTypes} from 'sequelize';
import {config} from '../config';

export const run_query = async (query, values) => {
  try{
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = sequelize.query(query, {
      replacements: values,
      type: QueryTypes.SELECT
    });
    await sequelize.close();
    return data
  }catch(err:any){
    console.error(err, query, values);
    throw 'Database query error'
    
  }
}
export const run_insert = async (sql, values) => {
  try{
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.INSERT
    });
    await sequelize.close();
    return data
  }catch(err:any){
    console.error(err, sql, values);
    throw 'Insert Data Error'
    
  }
}