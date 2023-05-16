import sql from "mssql";
import { loadSqlQueries } from "./utils";

interface getUserProps {
  dbConnection: sql.ConnectionPool;
  userId: number;
}

export const getUser = async ({ dbConnection, userId }: getUserProps) => {
  const sqlQueries = await loadSqlQueries("Users/");

  const request = await dbConnection.request();
  request?.input("userId", sql.Int, userId);
  return request?.query(sqlQueries.getUser);
};
