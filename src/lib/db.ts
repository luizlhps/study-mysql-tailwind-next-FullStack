import mysql, { PoolOptions } from 'mysql2/promise';

const access: PoolOptions = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'usuario',
  password: 'senha',
  database: 'base_de_dados',
};
const pool = mysql.createPool(access);

export default pool;
