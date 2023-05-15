import { getUser } from "@controllers/Users";
import dbConnect from "@/utils/dbConnect";
import User from "@models/User";

export async function GET(request: any) {
  const dbConnection = await dbConnect();

  if (dbConnection) {
    const res = await getUser({ dbConnection, userId: 1000 });
    const user: User = res.recordset[0];
    return new Response(JSON.stringify(user));
  }
}
