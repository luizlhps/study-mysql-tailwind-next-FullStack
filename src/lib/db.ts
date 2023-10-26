import mysql from 'mysql2';

const connection = mysql.createPool({
  connectionLimit: 10,
  host: 'seu-host',
  user: 'seu-usuario',
  password: 'sua-senha',
  database: 'seu-banco-de-dados',
});

export const promisePool = connection.promise();
