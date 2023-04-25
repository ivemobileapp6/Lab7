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

export const run_add = async (sql: string, values: any[]) => {
  const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);
  try {
    await sequelize.authenticate();
    const result = await sequelize.transaction(async (t) => {
      const [insertResult] = await sequelize.query(
        sql,
        {
          replacements: values,
          type: QueryTypes.INSERT,
          transaction: t,
        }
      );
      return { id: insertResult.id };
    });
    await sequelize.close();
    return { status: 201, id: result.id };
  } catch (error) {
    console.error(error);
    await sequelize.close();
    throw 'Insert Data Error';
  }
};