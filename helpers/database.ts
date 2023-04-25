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
export const run_update = async (sql, values) => {
  try{
    const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
    await sequelize.authenticate();
    let data = sequelize.query(sql, {
      replacements: values,
      type: QueryTypes.UPDATE
    });
    await sequelize.close();
    return data
  }catch(err:any){
    console.error(err, sql, values);
    throw 'Update Data Error'
  }
}