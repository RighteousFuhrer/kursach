import sql from "mssql";
import cnfg from "./config"

const dbConnect = async (config: sql.config = {...cnfg}) => {
  let pool: sql.ConnectionPool | null;

  const closePool = async () => {
    try {
      await pool?.close();
      pool = null;
    } catch (error) {
      pool = null;
      console.log(error);
    }
  };

  const getConnection = async () => {
    try {
      if (pool) {
        return pool;
      }
      pool = await sql.connect(config);
      pool.on("error", async (err: any) => {
        console.log(err);
        await closePool();
      });
      return pool;
    } catch (error) {
      console.log(error);
      pool = null;
    }
  };

  return getConnection();
};

export default dbConnect;
