const { SQL_USER, SQL_PASSWORD, SQL_DATABASE, SQL_SERVER } = process.env;

import sql from "mssql"

const config: sql.config  = {
  server: SQL_SERVER! ,
  database: SQL_DATABASE,
  user: SQL_USER ,
  password: SQL_PASSWORD,
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  }
};

export default config;
